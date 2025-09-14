/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:11:24
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-15 01:30:09
 * @FilePath: /vf-studio/packages/vf-engine/src/controller/CameraController.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Vector3 } from "@vf/math";
import { InputObserver, MouseButton, PointEventPayload, ResizeEventPayload } from "@vf/core";
import { OrthographicCamera, PerspectiveCamera } from "../index";
import { ControllerMode, IViewController } from "../types"

class CameraController extends InputObserver implements IViewController {
  mode: ControllerMode;
  state: {
    enabled: boolean;
    enabledPan: boolean;
    enabledZoom: boolean;
    enabledRotate: boolean;
  };
  target: Vector3;
  private eye = new Vector3();
  constructor(camera: OrthographicCamera | PerspectiveCamera) {
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

  public async onPointerDown({button,x,y}: PointEventPayload): Promise<boolean> {
    console.log('onPointerDown: ', event);
    if(!this.state.enabled) return false;
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

    if(this.mode === ControllerMode.ROTATE && this.state.enabledRotate){

    }else if(this.mode === ControllerMode.ZOOM && this.state.enabledZoom){

    }else if(this.mode === ControllerMode.PAN && this.state.enabledPan){

    }

    return false;
  }

  public async onPointerUp(event: PointEventPayload): Promise<boolean> {
    console.log('onPointerUp: ', event);
    return false;
  }

  update(): void {

  }

  handlePan(dx: number, dy: number): void {

  }

  handleZoom(delta: number, dx: number, dy: number): void {

  }

  handleRotate(dx: number, dy: number): void {

  }

  public async onResize(event: ResizeEventPayload): Promise<boolean> {
    console.log('onResize: ', event);
    return false;
  }
}



export { CameraController }
