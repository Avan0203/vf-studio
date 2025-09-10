/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-09 14:53:12
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-10 14:16:08
 * @FilePath: \vf-studio\packages\vf-engine\src\camera\Camera.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Matrix4, Vector3 } from "@vf/math";
import { Base3D } from "../index";

class Camera extends Base3D {
    readonly baseType = 'Camera';
    target: Vector3;
    projectionMatrix: Matrix4;
    viewMatrix: Matrix4;
    projectionMatrixInverse: Matrix4;
    viewMatrixInverse: Matrix4;

    constructor() {
        super();
        this.target = new Vector3();
        this.projectionMatrix = new Matrix4();
        this.projectionMatrixInverse = new Matrix4();
        this.viewMatrix = new Matrix4();
        this.viewMatrixInverse = new Matrix4();
    }
    
    copy(source: this): this {
        super.copy(source);
        this.target.copy(source.target);
        this.projectionMatrix.copy(source.projectionMatrix);
        this.viewMatrix.copy(source.viewMatrix);
        return this;
    }

    getDirection(target: Vector3): Vector3 {
        return super.getDirection(target).negate();
    }
}

export { Camera }