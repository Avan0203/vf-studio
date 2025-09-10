/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-09 16:25:20
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-10 13:47:06
 * @FilePath: \vf-studio\packages\vf-engine\src\types\base.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { IBase } from "@vf/core";
import type { Euler, Matrix4, Quaternion, Vector3 } from "@vf/math";

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

export { IBase3D }