/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-08-20 17:14:03
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-08-21 17:41:47
 * @FilePath: \vf-studio\packages\vf-math\src\base\Vector2.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject } from "./AbstractMathObject";
import { MathUtils, Tolerance } from "../utils";

export type Vector2Like = {
    x: number;
    y: number;
}

export class Vector2 extends AbstractMathObject {
    readonly type = 'Vector2';
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

    copy(v: Vector2Like) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    add(v: Vector2Like) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v: Vector2Like) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    distance(v: Vector2Like) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }

    dot(v: Vector2Like) {
        return this.x * v.x + this.y * v.y;
    }

    cross(v: Vector2Like) {
        return this.x * v.y - this.y * v.x;
    }

    addVector(v1: Vector2Like, v2: Vector2Like) {
        this.x += v1.x + v2.x;
        this.y += v1.y + v2.y;
        return this;
    }

    subVector(v1: Vector2Like, v2: Vector2Like) {
        this.x -= v1.x + v2.x;
        this.y -= v1.y + v2.y;
        return this;
    }

    equals(v: Vector2Like, esp = Tolerance.CALCULATION_EPS) {
        return MathUtils.equals(this.x, v.x, esp) && MathUtils.equals(this.y, v.y, esp);
    }

    multiply(v: Vector2Like) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    divide(v: Vector2Like) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }


    multiplyScalar(v: number) {
        this.x *= v;
        this.y *= v;
        return this;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    getSquareLength() {
        return this.x * this.x + this.y * this.y;
    }

    getLength() {
        return Math.sqrt(this.getSquareLength());
    }

    normalize() {
        return this.multiplyScalar((1 / this.getLength()) || 1);
    }

    isParallel(v: Vector2Like, esp = Tolerance.CALCULATION_EPS) {
        return MathUtils.equals(this.dot(v), 0, esp);
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    distanceTo(v: Vector2Like) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }

    random(min = 0, max = 1) {
        return this.set(MathUtils.randomFloat(min, max), MathUtils.randomFloat(min, max));
    }
}