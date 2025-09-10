/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:11:24
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-11 00:58:54
 * @FilePath: /vf-studio/packages/vf-engine/src/controller/TrackBallController.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { OrthographicCamera, PerspectiveCamera } from "../index";
import { IController } from "../types"

class TrackballController implements IController {
  enabled: boolean;
  constructor(camera: OrthographicCamera | PerspectiveCamera) {
    this.enabled = true;
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

export { TrackballController }
