/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-09 13:10:31
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-10 16:28:43
 * @FilePath: \vf-studio\packages\vf-engine\src\camera\OrthographicCamera.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Camera, ViewOffset } from "./index";

class OrthographicCamera extends Camera {
    zoom: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
    near: number;
    far: number;
    view: ViewOffset = new ViewOffset();

    constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2000) {
        super();
        this.zoom = 1;
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.near = near;
        this.far = far;

        this.updateProjectionMatrix();
    }

    setViewOffset(width: number, height: number, offsetX: number, offsetY: number, fullWidth: number, fullHeight: number): this {
        this.view.set(width, height, offsetX, offsetY, fullWidth, fullHeight);
        this.updateProjectionMatrix();
        return this;
    }

    clearViewOffset(): this {
        this.view.enabled = false;
        this.updateProjectionMatrix();
        return this;
    }

    updateProjectionMatrix(): this {
        const dx = (this.right - this.left) / (2 * this.zoom);
        const dy = (this.top - this.bottom) / (2 * this.zoom);
        const cx = (this.right + this.left) / 2;
        const cy = (this.top + this.bottom) / 2;

        let left = cx - dx;
        let right = cx + dx;
        let top = cy + dy;
        let bottom = cy - dy;

        if (this.view.enabled) {

            const scaleW = (this.right - this.left) / this.view.fullWidth / this.zoom;
            const scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;

            left += scaleW * this.view.offsetX;
            right = left + scaleW * this.view.width;
            top -= scaleH * this.view.offsetY;
            bottom = top - scaleH * this.view.height;

        }

        // TODO WEBGPU
        this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far, true,);

        this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
        return this;
    }

    copy(source: this): this {
        super.copy(source);
        this.zoom = source.zoom;
        this.left = source.left;
        this.right = source.right;
        this.top = source.top;
        this.bottom = source.bottom;
        this.near = source.near;
        this.far = source.far;
        this.view.copy(source.view);
        this.updateProjectionMatrix();
        return this;
    }
}

export { OrthographicCamera }
