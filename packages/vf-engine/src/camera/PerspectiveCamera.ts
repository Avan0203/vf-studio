/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-09 14:58:23
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-11 10:13:00
 * @FilePath: \vf-studio\packages\vf-engine\src\camera\PerspectiveCamera.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { DEG2RAD, RAD2DEG, Vector2, Vector3 } from "@vf/math";
import { Camera, ViewOffset } from "./index";

const _v = /*@__PURE__*/ new Vector3();
const _minTarget = /*@__PURE__*/ new Vector2();
const _maxTarget = /*@__PURE__*/ new Vector2();

class PerspectiveCamera extends Camera {
    fov: number;
    aspect: number;
    near: number;
    far: number;
    focus: number;
    filmGauge: number;
    filmOffset: number;

    zoom: number;
    view = new ViewOffset();

    constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
        super();
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;

        this.focus = 10;
        this.filmGauge = 35;
        this.filmOffset = 0;
        this.zoom = 1;
    }

    setFocalLength(focalLength: number): this {
        const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
        this.fov = RAD2DEG * 2 * Math.atan(vExtentSlope);
        this.updateProjectionMatrix();
        return this;
    }

    getFocalLength(): number {
        return 0.5 * this.getFilmHeight() / Math.tan(DEG2RAD * 0.5 * this.fov);
    }

    getEffectiveFOV(): number {
        return RAD2DEG * 2 * Math.atan(
            Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom);
    }

    getFilmWidth(): number {
        return this.filmGauge * Math.min(this.aspect, 1);
    }

    getFilmHeight(): number {
        return this.filmGauge / Math.max(this.aspect, 1);
    }

    getViewBounds(distance: number, minTarget: Vector2, maxTarget: Vector2): this {
        _v.set(- 1, - 1, 0.5).applyMatrix4(this.projectionMatrixInverse);
        minTarget.set(_v.x, _v.y).multiplyScalar(- distance / _v.z);
        _v.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse);
        maxTarget.set(_v.x, _v.y).multiplyScalar(- distance / _v.z);
        return this;
    }

    getViewSize(distance: number, target = new Vector2()): Vector2 {
        this.getViewBounds(distance, _minTarget, _maxTarget);
        return target.subVectors(_maxTarget, _minTarget);
    }


    setViewOffset(width: number, height: number, offsetX: number, offsetY: number, fullWidth: number, fullHeight: number): this {
        this.aspect = fullWidth / fullHeight;

        this.view = new ViewOffset(width, height, offsetX, offsetY, fullWidth, fullHeight);
        this.updateProjectionMatrix();
        return this;
    }


    clearViewOffset(): this {
        this.view.enabled = false;
        this.updateProjectionMatrix();
        return this;
    }


    updateProjectionMatrix(): this {
        const near = this.near;
        let top = near * Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom;
        let height = 2 * top;
        let width = this.aspect * height;
        let left = - 0.5 * width;
        const view = this.view;

        if (this.view.enabled) {

            const fullWidth = view.fullWidth,
                fullHeight = view.fullHeight;

            left += view.offsetX * width / fullWidth;
            top -= view.offsetY * height / fullHeight;
            width *= view.width / fullWidth;
            height *= view.height / fullHeight;

        }

        const skew = this.filmOffset;
        if (skew !== 0) left += near * skew / this.getFilmWidth();

        // TODO WEBGPU
        this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far, true,);

        this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
        return this;
    }

    copy(source: this): this {
        super.copy(source);
        this.fov = source.fov;
        this.aspect = source.aspect;
        this.near = source.near;
        this.far = source.far;
        this.focus = source.focus;
        this.filmGauge = source.filmGauge;
        this.filmOffset = source.filmOffset;
        this.zoom = source.zoom;
        this.view.copy(source.view);
        return this;
    }
}

export { PerspectiveCamera };