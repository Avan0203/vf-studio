/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-09 15:53:13
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-22 16:12:37
 * @FilePath: \vf-studio\packages\vf-core\src\types\base.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { ObjectID } from "../base";
import type { Euler, Matrix4, Quaternion, Vector3 } from "@vf/math";

interface IBase {
    readonly id: ObjectID;
    name: string;
    readonly type: string;
    copy(source: this): this;
    clone(): IBase;
}

interface IBase3D extends IBase {
    position: Vector3;
    scale: Vector3;
    rotation: Euler;
    quaternion: Quaternion;
    readonly baseType:string

    matrix: Matrix4;
    up: Vector3;
    getDirection(target: Vector3): Vector3;
    lookAt(target: Vector3): void;
    updateMatrix(): void;
}

export { IBase, ObjectID, IBase3D }