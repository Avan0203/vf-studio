/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-08-20 17:14:03
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-28 13:55:20
 * @FilePath: \vf-studio\packages\vf-math\src\base\Vector2.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Vector } from "./Vector";
import { MathUtils, Tolerance } from "../utils";
import type { Matrix3 } from "./Matrix3";
import { DumpResult } from "./AbstractMathObject";

type Vector2Like = {
    x: number;
    y: number;
}

class Vector2 extends Vector<Vector2Like> {
    x: number;
    y: number;

    static ZERO() {
        return new Vector2(0, 0);
    }

    static X(n = 1) {
        return new Vector2(n, 0);
    }

    static Y(n = 1) {
        return new Vector2(0, n);
    }

    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }

    getComponents(): number[] {
        return [this.x, this.y];
    }

    setComponents(values: number[]): this {
        this.x = values[0] || 0;
        this.y = values[1] || 0;
        return this;
    }

    protected getComponentsFromLike(v: Vector2Like): number[] {
        return [v.x, v.y];
    }

    copy(v: Vector2Like): this {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    clone(): this {
        return new Vector2(this.x, this.y) as this;
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

    set(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    clamp(min: Vector2Like, max: Vector2Like): this {
        this.x = MathUtils.clamp(this.x, min.x, max.x);
        this.y = MathUtils.clamp(this.y, min.y, max.y);
        return this;
    }


    isParallel(v: Vector2Like, esp = Tolerance.CALCULATION_EPS): boolean {
        return MathUtils.equals(this.dot(v), 0, esp);
    }

    distanceTo(v: Vector2Like): number {
        _v.copy(v);
        return Math.sqrt(this.distanceToSquared(_v));
    }

    angle(): number {
        return Math.atan2(this.y, this.x);
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

    toArray(target:any[] = [], offset = 0): any[] {
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
        return {  type: this.type, value: { x: this.x, y: this.y } }
    }
}

const _v = new Vector2();

export {Vector2,Vector2Like} 