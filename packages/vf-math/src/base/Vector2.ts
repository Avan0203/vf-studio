/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-08-20 17:14:03
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-08-28 11:31:01
 * @FilePath: \vf-studio\packages\vf-math\src\base\Vector2.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject, type DumpResult } from "./AbstractMathObject";
import { MathUtils, Tolerance } from "../utils";
import type { Matrix3 } from "./Matrix3";

export type Vector2Like = {
    x: number;
    y: number;
}

export class Vector2 extends AbstractMathObject<Vector2Like> {
    x: number;
    y: number;

    static ZERO() {
        return new Vector2(0, 0);
    }

    static X() {
        return new Vector2(1, 0);
    }

    static Y() {
        return new Vector2(0, 1);
    }

    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }

    copy(v: Vector2Like): this {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    add(v: Vector2Like): this {
        return this.addVectors(this, v);
    }

    sub(v: Vector2Like): this {
        return this.subVectors(this, v);
    }

    dot(v: Vector2Like): number {
        return this.x * v.x + this.y * v.y;
    }

    cross(v: Vector2Like): number {
        return this.x * v.y - this.y * v.x;
    }

    addVectors(v1: Vector2Like, v2: Vector2Like): this {
        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;
        return this;
    }

    subVectors(v1: Vector2Like, v2: Vector2Like): this {
        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;
        return this;
    }

    equals(v: Vector2Like, esp = Tolerance.LENGTH_EPS): boolean {
        return MathUtils.equals(this.x, v.x, esp) && MathUtils.equals(this.y, v.y, esp);
    }

    multiply(v: Vector2Like): this {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    divide(v: Vector2Like): this {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    multiplyScalar(v: number): this {
        this.x *= v;
        this.y *= v;
        return this;
    }

    set(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    getSquareLength(): number {
        return this.x * this.x + this.y * this.y;
    }

    getLength(): number {
        return Math.sqrt(this.getSquareLength());
    }

    normalize(): this {
        return this.multiplyScalar((1 / this.getLength()) || 1);
    }

    isParallel(v: Vector2Like, esp = Tolerance.CALCULATION_EPS): boolean {
        return MathUtils.equals(this.dot(v), 0, esp);
    }

    negate(): this {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    distanceTo(v: Vector2Like): number {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }

    random(min = 0, max = 1): this {
        return this.set(MathUtils.randomFloat(min, max), MathUtils.randomFloat(min, max));
    }

    angle(): number {
        return Math.atan2(this.y, this.x);
    }

    max(v: Vector2Like): this {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }

    min(v: Vector2Like): this {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }

    clamp(min: Vector2Like, max: Vector2Like): this {
        this.x = MathUtils.clamp(this.x, min.x, max.x);
        this.y = MathUtils.clamp(this.y, min.y, max.y);
        return this;
    }

    angleTo(v: Vector2Like): number {
        const dot = this.dot(v);
        const len = this.getLength() * Math.sqrt(v.x * v.x + v.y * v.y);
        return Math.acos(MathUtils.clamp(dot / len, -1, 1));
    }

    lerp(v: Vector2Like, t: number): this {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        return this;
    }

    lerpVectors(v1: Vector2Like, v2: Vector2Like, t: number): this {
        return this.copy(v1).lerp(v2, t);
    }

    toArray(target = [], offset = 0): number[] {
        target[offset] = this.x;
        target[offset + 1] = this.y;
        return target;
    }

    fromArray(array: number[], offset = 0): this {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }

    applyMatrix3(matrix: Matrix3): this {
        const x = this.x;
        const y = this.y;
        const e = matrix.elements;
        this.x = e[0] * x + e[3] * y + e[6];
        this.y = e[1] * x + e[4] * y + e[7];
        return this;
    }

    load(data: Vector2Like): this {
        return this.copy(data);
    }

    dump(): DumpResult<Vector2Like> {
        return { type: this.type, value: { x: this.x, y: this.y } }
    }
}