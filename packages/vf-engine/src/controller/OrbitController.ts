/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:59:14
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-11 01:11:31
 * @FilePath: /vf-studio/packages/vf-engine/src/controller/OrbitController.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Vector3 } from "@vf/math";
import { OrthographicCamera, PerspectiveCamera } from "../camera";
import { IController } from "../types";


class OrbitController implements IController {
    enabled: boolean;
    private _eye: Vector3;
    noRotate: boolean;
    noZoom: boolean;
    constructor(private camera: OrthographicCamera | PerspectiveCamera) {
        this._eye = new Vector3();
        this.enabled = true;
        this.noRotate = false;
        this.noZoom = false;
        this.noRotate = false;
        console.log('Controls')
    }

    update(): void {
        this._eye.subVectors(this.camera.position, this.camera.target);

    }

    handlePan(dx: number, dy: number): void {

    }

    handleZoom(delta: number, dx: number, dy: number): void {

    }

    handleRotate(dx: number, dy: number): void {

    }
}
export { OrbitController }