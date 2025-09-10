/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-09 16:22:55
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-10 13:51:32
 * @FilePath: \vf-studio\packages\vf-engine\src\base\Base3D.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Base } from "@vf/core";
import { Euler, Matrix4, Quaternion, Vector3 } from "@vf/math";
import { IBase3D } from "../types";

const _v = /*@__PURE__*/ new Vector3();
const _pos =  /*@__PURE__*/ new Vector3();
const _mat4 = /*@__PURE__*/ new Matrix4();


class Base3D extends Base implements IBase3D {
    position = new Vector3(0, 0, 0);
    scale = new Vector3(1, 1, 1);
    rotation = new Euler(0, 0, 0);
    quaternion = new Quaternion(0, 0, 0, 1);
    up = new Vector3(0, 1, 0);
    baseType = '';

    matrix = new Matrix4();
    constructor() {
        super();

        this.rotation.onChange(() => {
            this.quaternion.setFromEuler(this.rotation, false);
        });

        this.quaternion.onChange(() => {
            this.rotation.setFromQuaternion(this.quaternion, this.rotation.order, false);
        });
    }

    getDirection(target: Vector3): Vector3 {
        return target
    }

    updateMatrix(): void {
        this.matrix.compose(this.position, this.quaternion, this.scale);
    }

    applyMatrix4(m: Matrix4): void {
        this.matrix.premultiply(m);
        this.matrix.decompose(this.position, this.quaternion, this.scale);
    }


    lookAt(target: Vector3): void {
        _v.copy(target);
        _pos.setFromMatrixPosition(this.matrix);

        if (this.baseType === 'Camera' || this.baseType === 'Light') {
            _mat4.lookAt(_pos, _v, this.up);
        } else {
            _mat4.lookAt(_v, _pos, this.up);
        }

        this.quaternion.setFromRotationMatrix(_mat4);
    }

    copy(source: this): this {
        super.copy(source);
        this.position.copy(source.position);
        this.scale.copy(source.scale);
        this.rotation.copy(source.rotation);
        this.quaternion.copy(source.quaternion);
        this.up.copy(source.up);
        this.matrix.copy(source.matrix);
        return this;
    }
}

export { Base3D }