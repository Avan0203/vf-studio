import { AbstractMathObject, DumpResult } from "./AbstractMathObject";
import { MathUtils, Tolerance } from "../utils";
import type { Matrix4 } from "./Matrix4";
import { Matrix3 } from "./Matrix3";

type Vector3Like = {
    x: number;
    y: number;
    z: number;
}

class Vector3 extends AbstractMathObject<Vector3Like> {
    x: number;
    y: number;
    z: number;

    static ZERO() {
        return new Vector3(0, 0, 0);
    }

    static X() {
        return new Vector3(1, 0, 0);
    }

    static Y() {
        return new Vector3(0, 1, 0);
    }

    static Z() {
        return new Vector3(0, 0, 1);
    }

    static getSquareLength(v: Vector3Like) {
        return v.x * v.x + v.y * v.y + v.z * v.z;
    }

    constructor(x = 0, y = 0, z = 0) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy(v: Vector3Like): this {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }

    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    add(v: Vector3Like): this {
        return this.addVectors(this, v);
    }

    sub(v: Vector3Like): this {
        return this.subVectors(this, v);
    }

    dot(v: Vector3Like): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v: Vector3Like): this {
        return this.crossVectors(this, v);
    }

    crossVectors(v1: Vector3Like, v2: Vector3Like): this {
        this.x = v1.y * v2.z - v1.z * v2.y;
        this.y = v1.z * v2.x - v1.x * v2.z;
        this.z = v1.x * v2.y - v1.y * v2.x;
        return this;
    }

    addVectors(v1: Vector3Like, v2: Vector3Like): this {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        this.z = v1.z + v2.z;
        return this;
    }

    subVectors(v1: Vector3Like, v2: Vector3Like): this {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        this.z = v1.z - v2.z;
        return this;
    }

    equals(v: Vector3Like, esp = Tolerance.LENGTH_EPS): boolean {
        return MathUtils.equals(this.x, v.x, esp) && MathUtils.equals(this.y, v.y, esp) && MathUtils.equals(this.z, v.z, esp);
    }

    multiply(v: Vector3Like): this {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }

    divide(v: Vector3Like): this {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
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

    getSquareLength(): number {
        return Vector3.getSquareLength(this);
    }

    getLength(): number {
        return Math.sqrt(this.getSquareLength());
    }

    normalize(): this {
        return this.multiplyScalar((1 / this.getLength()) || 1);
    }

    isPerpendicular(v: Vector3Like, esp = Tolerance.CALCULATION_EPS): boolean {
        return MathUtils.equals(this.dot(v), 0, esp);
    }

    negate(): this {
        return this.multiplyScalar(-1);
    }

    distanceTo(v: Vector3Like): number {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2) + Math.pow(this.z - v.z, 2));
    }

    random(min = 0, max = 1): this {
        return this.set(MathUtils.randomFloat(min, max), MathUtils.randomFloat(min, max), MathUtils.randomFloat(min, max));
    }

    max(v: Vector3Like): this {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }

    min(v: Vector3Like): this {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }

    clamp(min: number, max: number): this {
        this.x = MathUtils.clamp(this.x, min, max);
        this.y = MathUtils.clamp(this.y, min, max);
        this.z = MathUtils.clamp(this.z, min, max);
        return this;
    }

    angleTo(v: Vector3Like): number {
        const denominator = Math.sqrt(this.getSquareLength() * Vector3.getSquareLength(v));
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
        const denominator = Vector3.getSquareLength(v);
        if (denominator === 0) return this.set(0, 0, 0);
        const scalar = this.dot(v) / denominator;
        return this.copy(v).multiplyScalar(scalar);
    }

    reflect(v: Vector3Like): this {
        const dot = this.dot(v);
        return this.sub(new Vector3().copy(v).multiplyScalar(2 * dot));
    }

    toArray(target = [], offset = 0): number[] {
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

    load(data: Vector3Like): this {
        return this.copy(data);
    }

    dump(): DumpResult<Vector3Like> {
        return { type: this.type, value: { x: this.x, y: this.y, z: this.z } }
    }
}

const _v = /*@__PURE__*/ new Vector3();

export { Vector3, Vector3Like }