/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-04 17:47:57
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 11:09:38
 * @FilePath: \vf-studio\packages\vf-math\src\base\Vector3.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Vector } from "./Vector";
import { MathUtils, Tolerance } from "../utils";
import type { Matrix4 } from "./Matrix4";
import type { Matrix3 } from "./Matrix3";
import { Quaternion, QuaternionLike } from "./Quaternion";
import { EulerLike } from "./Euler";
import { DumpResult } from "./AbstractMathObject";

type Vector3Like = {
    x: number;
    y: number;
    z: number;
} | Vector3;

class Vector3 extends Vector<Vector3Like> {
    x: number;
    y: number;
    z: number;

    static ZERO() {
        return new Vector3(0, 0, 0);
    }

    static X(n = 1) {
        return new Vector3(n, 0, 0);
    }

    static Y(n = 1) {
        return new Vector3(0, n, 0);
    }

    static Z(n = 1) {
        return new Vector3(0, 0, n);
    }

    static ONE() {
        return new Vector3(1, 1, 1);
    }

    constructor(x = 0, y = 0, z = 0) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getComponents(): number[] {
        return [this.x, this.y, this.z];
    }

    setComponents(values: number[]): this {
        this.x = values[0] || 0;
        this.y = values[1] || 0;
        this.z = values[2] || 0;
        return this;
    }

    protected getComponentsFromLike(v: Vector3Like): number[] {
        return [v.x, v.y, v.z];
    }

    copy(v: Vector3Like): this {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }

    clone(): this {
        return new Vector3(this.x, this.y, this.z) as this;
    }

    add(v: Vector3Like | Vector3): this {
        _v.copy(v);
        return this.addVectors(this, _v);
    }

    sub(v: Vector3Like | Vector3): this {
        _v.copy(v);
        return this.subVectors(this, _v);
    }

    dot(v: Vector3Like): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v: Vector3Like): this {
        return this.crossVectors(this, v);
    }

    crossVectors(v1: Vector3Like, v2: Vector3Like): this {
        // 先保存v1的值，因为如果v1===this，修改this会影响后续计算
        const ax = v1.x, ay = v1.y, az = v1.z;
        const bx = v2.x, by = v2.y, bz = v2.z;
        
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    }


    multiplyScalar(v: number): this {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        return this;
    }

    set(x: number, y: number, z: number): this {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    isPerpendicular(v: Vector3Like, esp = Tolerance.CALCULATION_EPS): boolean {
        return MathUtils.equals(this.dot(v), 0, esp);
    }

    distanceTo(v: Vector3Like): number {
        _v.copy(v);
        return Math.sqrt(this.distanceToSquared(_v));
    }

    clamp(min: Vector3Like, max: Vector3Like): this {
        this.x = MathUtils.clamp(this.x, min.x, max.x);
        this.y = MathUtils.clamp(this.y, min.y, max.y);
        this.z = MathUtils.clamp(this.z, min.z, max.z);
        return this;
    }

    angleTo(v: Vector3Like): number {
        _v.copy(v);
        const denominator = Math.sqrt(this.getSquareLength() * _v.getSquareLength());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        return Math.acos(MathUtils.clamp(theta, - 1, 1));
    }

    lerp(v: Vector3Like, t: number): this {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        this.z += (v.z - this.z) * t;
        return this;
    }

    lerpVectors(v1: Vector3Like, v2: Vector3Like, t: number): this {
        return this.copy(v1).lerp(v2, t);
    }

    projectOnVector(v: Vector3Like): this {
        _v.copy(v);
        const denominator = _v.getSquareLength();
        if (denominator === 0) return this.set(0, 0, 0);
        const scalar = this.dot(v) / denominator;
        return this.copy(v).multiplyScalar(scalar);
    }

    reflect(v: Vector3Like): this {
        const dot = this.dot(v);
        return this.sub(new Vector3().copy(v).multiplyScalar(2 * dot));
    }

    toArray(target: any[] = [], offset = 0): number[] {
        target[offset] = this.x;
        target[offset + 1] = this.y;
        target[offset + 2] = this.z;
        return target;
    }

    fromArray(array: number[], offset = 0): this {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }

    applyQuaternion(q: QuaternionLike): this {
        const vx = this.x, vy = this.y, vz = this.z;
        const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
        // t = 2 * cross( q.xyz, v );
        const tx = 2 * (qy * vz - qz * vy);
        const ty = 2 * (qz * vx - qx * vz);
        const tz = 2 * (qx * vy - qy * vx);

        // v + q.w * t + cross( q.xyz, t );
        this.x = vx + qw * tx + qy * tz - qz * ty;
        this.y = vy + qw * ty + qz * tx - qx * tz;
        this.z = vz + qw * tz + qx * ty - qy * tx;
        return this;
    }

    applyEuler(euler: EulerLike): this {
        return this.applyQuaternion(_q.setFromEuler(euler));
    }


    applyMatrix4(matrix: Matrix4): this {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const e = matrix.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
        return this;
    }

    applyMatrix3(matrix: Matrix3): this {
        const x = this.x, y = this.y, z = this.z;
        const e = matrix.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    }

    addScaledVector(v: Vector3Like, s: number): this {
        return this.add(_v.copy(v).multiplyScalar(s));
    }

    setFromMatrixPosition(m: Matrix4): this {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        return this;
    }

    load(data: Vector3Like): this {
        return this.copy(data);
    }

    dump(): DumpResult<Vector3Like> {
        return { type: this.type, value: { x: this.x, y: this.y, z: this.z } }
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}

const _v = /*@__PURE__*/ new Vector3();
const _p = /*@__PURE__*/ new Vector3();
const _q = /*@__PURE__*/ new Quaternion();

export { Vector3, Vector3Like }