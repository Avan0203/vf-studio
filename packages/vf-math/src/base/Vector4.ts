/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-28 10:22:44
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 11:10:12
 * @FilePath: \vf-studio\packages\vf-math\src\base\Vector4.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { MathUtils, Tolerance } from "../utils";
import { DumpResult } from "./AbstractMathObject";
import { Matrix4 } from "./Matrix4";
import { QuaternionLike } from "./Quaternion";
import { Vector } from "./Vector";
import { Vector3Like } from "./Vector3";

const { clamp } = MathUtils;

type Vector4Like = {
    x: number;
    y: number;
    z: number;
    w: number;
} | Vector4;

class Vector4 extends Vector<Vector4Like> {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 1;

    constructor(x = 0, y = 0, z = 0, w = 1) {
        super();
        this.set(x, y, z, w);
    }

    set(x: number, y: number, z: number, w: number): this {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }


    setScalar(scalar: number): this {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        this.w = scalar;
        return this;
    }

    setComponents(values: number[]): this {
        this.x = values[0];
        this.y = values[1];
        this.z = values[2];
        this.w = values[3];
        return this;
    }

    getComponents(): number[] {
        return [this.x, this.y, this.z, this.w];
    }

    protected getComponentsFromLike(v: Vector4Like): number[] {
        return [v.x, v.y, v.z, v.w];
    }


    clone(): this {
        return new Vector4(this.x, this.y, this.z, this.w) as this;
    }


    copy(v: Vector4Like | Vector3Like): this {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = (v as Vector4Like).w ?? 1;
        return this;
    }


    add(v: Vector4Like): this {
        _v.copy(v);
        return this.addVectors(this, _v);
    }

    addScaledVector(v: Vector4Like, s: number): this {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        this.w += v.w * s;
        return this;
    }


    sub(v: Vector4Like): this {
        _v.copy(v);
        return this.subVectors(this, _v);
    }

    applyMatrix4(m:Matrix4): this {
        const x = this.x, y = this.y, z = this.z, w = this.w;
        const e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
        this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
        return this;
    }

    setAxisAngleFromQuaternion(q: QuaternionLike): this {
        this.w = 2 * Math.acos(q.w);
        const s = Math.sqrt(1 - q.w * q.w);

        if (s < 0.0001) {
            this.x = 1;
            this.y = 0;
            this.z = 0;
        } else {
            this.x = q.x / s;
            this.y = q.y / s;
            this.z = q.z / s;
        }

        return this;
    }


    setAxisAngleFromRotationMatrix(m: Matrix4): this {

        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

        let angle, x, y, z; // variables for result
        const epsilon = 0.01,		// margin to allow for rounding errors
            epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

            te = m.elements,

            m11 = te[0], m12 = te[4], m13 = te[8],
            m21 = te[1], m22 = te[5], m23 = te[9],
            m31 = te[2], m32 = te[6], m33 = te[10];

        if ((Math.abs(m12 - m21) < epsilon) &&
            (Math.abs(m13 - m31) < epsilon) &&
            (Math.abs(m23 - m32) < epsilon)) {

            // singularity found
            // first check for identity matrix which must have +1 for all terms
            // in leading diagonal and zero in other terms

            if ((Math.abs(m12 + m21) < epsilon2) &&
                (Math.abs(m13 + m31) < epsilon2) &&
                (Math.abs(m23 + m32) < epsilon2) &&
                (Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {

                // this singularity is identity matrix so angle = 0

                this.set(1, 0, 0, 0);

                return this; // zero angle, arbitrary axis

            }

            // otherwise this singularity is angle = 180

            angle = Math.PI;

            const xx = (m11 + 1) / 2;
            const yy = (m22 + 1) / 2;
            const zz = (m33 + 1) / 2;
            const xy = (m12 + m21) / 4;
            const xz = (m13 + m31) / 4;
            const yz = (m23 + m32) / 4;

            if ((xx > yy) && (xx > zz)) {

                // m11 is the largest diagonal term

                if (xx < epsilon) {

                    x = 0;
                    y = 0.707106781;
                    z = 0.707106781;

                } else {

                    x = Math.sqrt(xx);
                    y = xy / x;
                    z = xz / x;

                }

            } else if (yy > zz) {

                // m22 is the largest diagonal term

                if (yy < epsilon) {

                    x = 0.707106781;
                    y = 0;
                    z = 0.707106781;

                } else {

                    y = Math.sqrt(yy);
                    x = xy / y;
                    z = yz / y;

                }

            } else {

                // m33 is the largest diagonal term so base result on this

                if (zz < epsilon) {

                    x = 0.707106781;
                    y = 0.707106781;
                    z = 0;

                } else {

                    z = Math.sqrt(zz);
                    x = xz / z;
                    y = yz / z;

                }

            }

            this.set(x, y, z, angle);

            return this; // return 180 deg rotation

        }

        // as we have reached here there are no singularities so we can handle normally

        let s = Math.sqrt((m32 - m23) * (m32 - m23) +
            (m13 - m31) * (m13 - m31) +
            (m21 - m12) * (m21 - m12)); // used to normalize

        if (Math.abs(s) < 0.001) s = 1;

        // prevent divide by zero, should not happen if matrix is orthogonal and should be
        // caught by singularity test above, but I've left it in just in case

        this.x = (m32 - m23) / s;
        this.y = (m13 - m31) / s;
        this.z = (m21 - m12) / s;
        this.w = Math.acos((m11 + m22 + m33 - 1) / 2);

        return this;

    }

    setFromMatrixPosition(m: Matrix4): this {
        const e = m.elements;
        this.x = e[12];
        this.y = e[13];
        this.z = e[14];
        this.w = e[15];
        return this;
    }

    equals(v: Vector4Like, eps = Tolerance.LENGTH_EPS): boolean {
        _v.copy(v);
        return this.equals(_v, eps);
    }

    distanceTo(v: Vector4Like): number {
        _v.copy(v);
        return Math.sqrt(this.distanceToSquared(_v));
    }


    clamp(min: Vector4Like, max: Vector4Like): this {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        this.z = clamp(this.z, min.z, max.z);
        this.w = clamp(this.w, min.w, max.w);

        return this;
    }


    clampScalar(minVal: number, maxVal: number): this {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
        this.z = clamp(this.z, minVal, maxVal);
        this.w = clamp(this.w, minVal, maxVal);
        return this;
    }

    dot(v: Vector4Like): number {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }


    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }

    lerp(v: Vector4Like, alpha: number): this {
        return this.lerpVectors(this, v, alpha);
    }


    lerpVectors(v1: Vector4Like, v2: Vector4Like, alpha: number): this {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        this.w = v1.w + (v2.w - v1.w) * alpha;
        return this;
    }

    angleTo(v: Vector4Like): number {
        _v.copy(v);
        return Math.acos(this.dot(_v) / (this.getLength() * _v.getLength()));
    }


    fromArray(array: number[], offset = 0): this {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }


    toArray(array: any[] = [], offset = 0): any[] {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }

    load(data: Vector4Like): this {
        return this.copy(data);
    }

    dump(): DumpResult<Vector4Like> {
        return { type: this.type, value: { x: this.x, y: this.y, z: this.z, w: this.w } }
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}   
    
const _v = new Vector4();

export { Vector4 };
