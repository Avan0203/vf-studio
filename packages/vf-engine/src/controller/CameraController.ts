/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:11:24
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-12 17:36:06
 * @FilePath: \vf-studio\packages\vf-engine\src\controller\CameraController.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Vector3 } from "@vf/math";
import { InputObserver, PointEventPayload, registerInputObserver } from "@vf/core";
import { OrthographicCamera, PerspectiveCamera } from "../index";
import { ControllerMode, IViewController } from "../types"

class CameraController extends InputObserver implements IViewController {
  mode: ControllerMode;
  state: {
    enabled: boolean;
    enabledInPan: boolean;
    enabledInZoom: boolean;
    enabledInRotate: boolean;
  };
  target: Vector3;
  private eye = new Vector3();
  constructor(camera: OrthographicCamera | PerspectiveCamera) {
    super();
    this.mode = ControllerMode.NONE;
    this.state = {
      enabled: true,
      enabledInPan: true,
      enabledInZoom: true,
      enabledInRotate: true,
    };
    this.target = new Vector3();
    console.log('Controls')
  }

  public async onClick({ x, y }:PointEventPayload) {
    console.log('event: ', x, y);
    return true;
  }

  update(): void {

  }

  handlePan(dx: number, dy: number): void {

  }

  handleZoom(delta: number, dx: number, dy: number): void {

  }

  handleRotate(dx: number, dy: number): void {

  }
}

export { CameraController }
