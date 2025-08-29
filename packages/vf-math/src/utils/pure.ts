/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-08-29 13:40:47
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-08-29 13:59:16
 * @FilePath: \vf-studio\packages\vf-math\src\utils\pure.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Plane, Sphere, Vector3, Quaternion, Matrix4, Box2, Matrix3 } from '../base'

const _plane = /*@__PURE__*/ new Plane();
const _sphere = /*@__PURE__*/ new Sphere();
const _box2 = /*@__PURE__*/ new Box2();
const _v = /*@__PURE__*/ new Vector3();
const _vec1 = /*@__PURE__*/ new Vector3();
const _vec2 = /*@__PURE__*/ new Vector3();
const _vec3 = /*@__PURE__*/ new Vector3();
const _q = /*@__PURE__*/ new Quaternion();
const _quat1 = /*@__PURE__*/ new Quaternion();
const _quat2 = /*@__PURE__*/ new Quaternion();
const _mat3 = /*@__PURE__*/ new Matrix3();
const _mat4 = /*@__PURE__*/ new Matrix4();
const _zero = /*@__PURE__*/ new Vector3(0, 0, 0);
const _one = /*@__PURE__*/ new Vector3(1, 1, 1);

export {
    _plane,
    _sphere,
    _box2,
    _v,
    _vec1,
    _vec2,
    _vec3,
    _q,
    _quat1,
    _quat2,
    _mat3,
    _mat4,
    _zero,
    _one,
}





