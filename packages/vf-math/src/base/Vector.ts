/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-15 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 09:24:08
 * @FilePath: \vf-studio\packages\vf-math\src\base\Vector.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject, DumpResult } from "./AbstractMathObject";
import { MathUtils, Tolerance } from "../utils";

const { equals, randomFloat } = MathUtils;

// 向量类型定义
interface VectorLike {
    clone(): any;
    copy(other: any): any;
    normalize(): any;
    add(other: any): any;
    sub(other: any): any;
    multiplyScalar(scalar: number): any;
    equals(other: any, eps?: number): boolean;
    set(...args: number[]): any;
    getLength(): number;
    getSquareLength(): number;
    distanceTo(v: any): number;
    distanceToSquared(v: any): number;
    max(v: any): any;
    min(v: any): any;
    multiply(v: any): any;
}

abstract class Vector<T> extends AbstractMathObject<T> {
    // 抽象方法，由子类实现
    abstract getComponents(): number[];
    abstract setComponents(values: number[]): this;
    abstract set(...args: number[]): this;
    abstract copy(v: T): this;
    abstract clone(): this;
    abstract add(v: T): this;
    abstract sub(v: T): this;
    abstract dot(v: T): number;
    abstract distanceTo(v: T): number;
    abstract clamp(min: T, max: T): this;
    abstract angleTo(v: T): number;
    abstract lerp(v: T, t: number): this;
    abstract lerpVectors(v1: T, v2: T, t: number): this;
    abstract toArray(target?: any[], offset?: number): any[];
    abstract fromArray(array: number[], offset?: number): this;
    abstract load(data: T): this;
    abstract dump(): DumpResult<T>;
    protected abstract getComponentsFromLike(v: T): number[]

    // 公共方法实现
    addVectors(v1: T, v2: T): this {
        const comp1 = this.getComponentsFromLike(v1);
        const comp2 = this.getComponentsFromLike(v2);
        return this.setComponents(comp1.map((val, index) => val + comp2[index]));
    }

    subVectors(v1: T, v2: T): this {
        const comp1 = this.getComponentsFromLike(v1);
        const comp2 = this.getComponentsFromLike(v2);
        return this.setComponents(comp1.map((val, index) => val - comp2[index]));
    }

    setLength(length: number): this {
        return this.normalize().multiplyScalar(length);
    }

    distanceToSquared(v: T): number {
        const comp1 = this.getComponents();
        const comp2 = this.getComponentsFromLike(v);
        return comp1.reduce((sum, val, index) => sum + Math.pow(val - comp2[index], 2), 0);
    }

    addScalar(scalar: number): this {
        const comp = this.getComponents();
        const result = comp.map(val => val + scalar);
        return this.setComponents(result);
    }

    normalize(): this {
        return this.multiplyScalar((1 / this.getLength()) || 1);
    }

    getSquareLength(): number {
        return this.getComponents().reduce((sum, val) => sum + val * val, 0);
    }

    getLength(): number {
        return Math.sqrt(this.getSquareLength());
    }

    max(v: T): this {
        const comp1 = this.getComponents();
        const comp2 = this.getComponentsFromLike(v);
        return this.setComponents(comp1.map((val, index) => Math.max(val, comp2[index])));
    }

    min(v: T): this {
        const comp1 = this.getComponents();
        const comp2 = this.getComponentsFromLike(v);
        return this.setComponents(comp1.map((val, index) => Math.min(val, comp2[index])));
    }

    multiply(v: T): this {
        const comp1 = this.getComponents();
        const comp2 = this.getComponentsFromLike(v);
        return this.setComponents(comp1.map((val, index) => val * comp2[index]));
    }

    multiplyScalar(scalar: number): this {
        const comp = this.getComponents();
        return this.setComponents(comp.map(val => val * scalar));
    }

    divide(v: T): this {
        const comp1 = this.getComponents();
        const comp2 = this.getComponentsFromLike(v);
        return this.setComponents(comp1.map((val, index) => val / comp2[index]));
    }

    random(min = 0, max = 1): this {
        const comp = this.getComponents();
        return this.setComponents(comp.map(() => randomFloat(min, max)));
    }

    negate(): this {
        const comp = this.getComponents();
        return this.setComponents(comp.map(val => -val));
    }

    equals(v: T, eps = Tolerance.LENGTH_EPS): boolean {
        return Vector.equals(this.getComponents(), this.getComponentsFromLike(v), eps);
    }

    // 静态方法
    static getSquareLength<T extends VectorLike>(v: Vector<T>): number {
        return Object.values(v).reduce((sum, val) => sum + val * val, 0);
    }

    static getLength<T extends VectorLike>(v: Vector<T>): number {
        return Math.sqrt(Vector.getSquareLength(v));
    }

    private static equals(comp1: number[], comp2: number[], eps = Tolerance.LENGTH_EPS): boolean {
        return comp1.every((val, index) => equals(val, comp2[index], eps));
    }

    static distanceTo<T extends VectorLike>(v1: Vector<T>, v2: Vector<T>): number {
        return Math.sqrt(Vector.distanceToSquared(v1, v2));
    }

    static distanceToSquared<T extends VectorLike>(v1: Vector<T>, v2: Vector<T>): number {
        const comp1 = v1.getComponents();
        const comp2 = v2.getComponents();
        return comp1.reduce((sum, val, index) => sum + Math.pow(val - comp2[index], 2), 0);
    }
}

export { Vector, VectorLike };
