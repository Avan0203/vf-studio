/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:11:24
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-15 17:45:07
 * @FilePath: \vf-studio\packages\vf-engine\src\controller\CameraController.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Vector2, Vector3 } from "@vf/math";
import { InputObserver, MouseButton, PointEventPayload, WheelEventPayload } from "@vf/core";
import { OrthographicCamera, PerspectiveCamera } from "../index";
import { ControllerMode, IViewController } from "../types"

const moveDir = new Vector3();
const eyeDir = new Vector3();
const cameraUpDir = new Vector3();
const cameraSidewaysDir = new Vector3();

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
  private eye = new Vector3();
  private moveCurr = new Vector2();
  private movePrev = new Vector2();
  private zoomStart = new Vector2();
  private zoomEnd = new Vector2();
  private panStart = new Vector2();
  private panEnd = new Vector2();

  private lastPos = new Vector3();
  private lastZoom = 1;
  private lastRotate = 0;
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
    if (!this.state.enabled) return false;
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
      default:
        break;
    }
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

    if (this.camera.type === 'PerspectiveCamera') {
      this.checkDistance();
      this.camera.lookAt(this.target);
    } else {
      this.camera.lookAt(this.target);
      this.lastZoom = this.camera.zoom;
    }
    this.lastPos.copy(this.camera.position);
  }

  handlePan(): void {

  }

  handleZoom(): void {

  }

  handleRotate(): void {
    moveDir.set(this.moveCurr.x - this.movePrev.x, this.moveCurr.y - this.movePrev.y, 0);
    let angle = moveDir.getLength();

    if(angle){
      this.eye.copy(this.camera.position).sub(this.target);
      eyeDir.copy(this.eye).normalize();
      cameraUpDir.copy(this.camera.up).normalize();
      cameraSidewaysDir.crossVectors(cameraUpDir, eyeDir).normalize();

      cameraUpDir.setLength(this.moveCurr.y - this.movePrev.y);
      cameraSidewaysDir.setLength(this.moveCurr.x - this.movePrev.x);
      

    }

    

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
