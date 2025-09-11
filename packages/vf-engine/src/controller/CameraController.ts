/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:11:24
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-11 10:43:35
 * @FilePath: \vf-studio\packages\vf-engine\src\controller\CameraController.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Vector3 } from "@vf/math";
import { OrthographicCamera, PerspectiveCamera } from "../index";
import { ControllerMode, IViewController } from "../types"

class CameraController implements IViewController {
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
