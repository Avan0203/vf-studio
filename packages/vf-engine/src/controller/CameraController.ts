/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:11:24
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-17 11:38:37
 * @FilePath: \vf-studio\packages\vf-engine\src\controller\CameraController.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Quaternion, Vector2, Vector3, MathUtils } from "@vf/math";
import { InputObserver, MouseButton, PointEventPayload, WheelEventPayload } from "@vf/core";
import { OrthographicCamera, PerspectiveCamera } from "../index";
import { ControllerMode, IViewController } from "../types"

const { clamp } = MathUtils;

const moveDir = new Vector3();
const eyeDir = new Vector3();
const cameraUpDir = new Vector3();
const cameraSidewaysDir = new Vector3();
const axis = new Vector3();
const quaternion = new Quaternion();
const mouseChange = new Vector2();
const pan = new Vector3();

class CameraController extends InputObserver implements IViewController {
  mode: ControllerMode;
  state: {
    enabled: boolean;
    enabledPan: boolean;
    enabledZoom: boolean;
    enabledRotate: boolean;
  };
  target: Vector3;

  maxZoom = Infinity;
  minZoom = 0;
  maxDistance = Infinity;
  minDistance = 0;
  rotateSpeed = 1.0;
  panSpeed = 1.0;
  zoomSpeed = 1.0;


  private eye = new Vector3();
  private moveCurr = new Vector2();
  private movePrev = new Vector2();
  private zoomStart = new Vector2();
  private zoomEnd = new Vector2();
  private panStart = new Vector2();
  private panEnd = new Vector2();

  constructor(private camera: OrthographicCamera | PerspectiveCamera) {
    super();
    this.mode = ControllerMode.NONE;
    this.state = {
      enabled: true,
      enabledPan: true,
      enabledZoom: true,
      enabledRotate: true,
    };
    this.target = new Vector3();
  }

  public async onPointerDown({ button, x, y }: PointEventPayload): Promise<boolean> {
    if (!this.state.enabled) return false;
    switch (button) {
      case MouseButton.Left:
        this.mode = ControllerMode.ROTATE;
        break;
      case MouseButton.Middle:
        this.mode = ControllerMode.ZOOM;
        break;
      case MouseButton.Right:
        this.mode = ControllerMode.PAN;
        break;
      default:
        this.mode = ControllerMode.NONE
        break;
    }

    if (this.mode === ControllerMode.ROTATE && this.state.enabledRotate) {
      this.moveCurr.copy(this.getMouse({ x, y }));
      this.movePrev.copy(this.moveCurr);
    } else if (this.mode === ControllerMode.ZOOM && this.state.enabledZoom) {
      this.zoomStart.copy(this.getMouse({ x, y }));
      this.zoomEnd.copy(this.zoomStart);
    } else if (this.mode === ControllerMode.PAN && this.state.enabledPan) {
      this.panStart.copy(this.getMouse({ x, y }));
      this.panEnd.copy(this.panStart);
    }

    return false;
  }

  public async onPointerMove({ x, y }: PointEventPayload): Promise<boolean> {
    if (!this.state.enabled || this.mode === ControllerMode.NONE) return false;
    switch (this.mode) {
      case ControllerMode.ROTATE:
        this.movePrev.copy(this.moveCurr);
        this.moveCurr.copy(this.getMouse({ x, y }));
        break;
      case ControllerMode.ZOOM:
        this.zoomEnd.copy(this.getMouse({ x, y }));
        break;
      case ControllerMode.PAN:
        this.panEnd.copy(this.getMouse({ x, y }));
        break;
    }
    console.log('move');
    this.emit('Change', null);
    return false;
  }

  public async onPointerUp(): Promise<boolean> {
    if (!this.state.enabled) return false;
    this.mode = ControllerMode.NONE;
    return false;
  }

  public async onWheel({ delta }: WheelEventPayload): Promise<boolean> {
    if (!this.state.enabled) return false;
    if (this.mode === ControllerMode.ZOOM && this.state.enabledZoom) {
      this.zoomStart.y -= delta * 0.03;
    }
    console.log('wheel');
    this.emit('Change', null);
    return false;
  }

  update(): void {
    this.eye.subVectors(this.camera.position, this.target);

    if (this.state.enabledRotate) {
      this.handleRotate();
    }

    if (this.state.enabledZoom) {
      this.handleZoom();
    }

    if (this.state.enabledPan) {
      this.handlePan();
    }

    this.camera.position.addVectors(this.target, this.eye);

    if (this.camera instanceof PerspectiveCamera) {
      this.checkDistance();
      this.camera.lookAt(this.target);
    } else {
      this.camera.lookAt(this.target);
    }
  }

  handlePan(): void {
    mouseChange.copy(this.panEnd).sub(this.panStart);
    if (mouseChange.getSquareLength()) {
      if (this.camera instanceof OrthographicCamera) {
        const scale_x = (this.camera.right - this.camera.left) / this.camera.zoom / this.size.x;
        const scale_y = (this.camera.top - this.camera.bottom) / this.camera.zoom / this.size.x;

        mouseChange.x *= scale_x;
        mouseChange.y *= scale_y;
      }

      mouseChange.multiplyScalar(this.eye.getLength() * this.panSpeed);

      pan.copy(this.eye).cross(this.camera.up).setLength(mouseChange.x);
      pan.add(cameraUpDir.copy(this.camera.up).setLength(mouseChange.y));

      this.camera.position.add(pan);
      this.target.add(pan);
      this.panStart.copy(this.panEnd);
    }
  }

  handleZoom(): void {
    let factor = 0;
    factor = 1 + (this.zoomEnd.y - this.zoomStart.y) * this.zoomSpeed;
    if (factor !== 1 && factor > 0) {
      if (this.camera instanceof OrthographicCamera) {
        this.camera.zoom = clamp(this.camera.zoom / factor, this.minZoom, this.maxZoom);
        this.camera.updateProjectionMatrix();
      } else {
        this.eye.multiplyScalar(factor);
      }
    }
    this.zoomStart.copy(this.zoomEnd);
  }

  handleRotate(): void {
    moveDir.set(this.moveCurr.x - this.movePrev.x, this.moveCurr.y - this.movePrev.y, 0);
    let angle = moveDir.getLength();

    if (angle) {
      this.eye.copy(this.camera.position).sub(this.target);
      eyeDir.copy(this.eye).normalize();
      cameraUpDir.copy(this.camera.up).normalize();
      cameraSidewaysDir.crossVectors(cameraUpDir, eyeDir).normalize();

      cameraUpDir.setLength(this.moveCurr.y - this.movePrev.y);
      cameraSidewaysDir.setLength(this.moveCurr.x - this.movePrev.x);

      moveDir.copy(cameraUpDir.add(cameraSidewaysDir));
      axis.crossVectors(moveDir, this.eye).normalize();

      angle *= this.rotateSpeed;
      quaternion.setFromAxisAngle(axis, angle);

      this.eye.applyQuaternion(quaternion);
      this.camera.up.applyQuaternion(quaternion);
    }

    this.movePrev.copy(this.moveCurr);
  }

  private checkDistance(): void {
    if (this.state.enabledZoom || this.state.enabledPan) {
      if (this.eye.getSquareLength() > this.maxDistance * this.maxDistance) {
        this.camera.position.addVectors(this.target, this.eye.setLength(this.maxDistance));
        this.zoomStart.copy(this.zoomEnd);
      }

      if (this.eye.getSquareLength() < this.minDistance * this.minDistance) {
        this.camera.position.addVectors(this.target, this.eye.setLength(this.minDistance));
        this.zoomStart.copy(this.zoomEnd);
      }
    }
  }
}



export { CameraController }
