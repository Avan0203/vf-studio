/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 10:16:37
 * @FilePath: \vf-studio\packages\vf-math\src\base\Interval.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject, DumpResult } from "./AbstractMathObject";
import { MathUtils, Tolerance } from "../utils";

type IntervalLike = {
    min: number;
    max: number;
    autoReset?: boolean;
}

class Interval extends AbstractMathObject<IntervalLike> {
    min: number;
    max: number;
    autoReset: boolean;

    static INFINITE() {
        return new Interval(-Infinity, Infinity);
    }

    static EMPTY() {
        return new Interval(0, 0);
    }

    static fromArray(array: number[]): Interval {
        if (array.length < 2) {
            throw new Error("Array must have at least 2 elements");
        }
        return new Interval(array[0], array[1]);
    }

    constructor(min = -Infinity, max = Infinity, autoReset = false) {
        super();
        this.autoReset = autoReset;
        
        if (autoReset && min > max) {
            this.min = max;
            this.max = min;
        } else {
            this.min = min;
            this.max = max;
        }
    }

    copy(interval: IntervalLike): this {
        this.min = interval.min;
        this.max = interval.max;
        this.autoReset = interval.autoReset ?? true;
        return this;
    }

    clone(): Interval {
        return new Interval(this.min, this.max, this.autoReset);
    }

    set(min: number, max: number): this {
        if (this.autoReset && min > max) {
            this.min = max;
            this.max = min;
        } else {
            this.min = min;
            this.max = max;
        }
        return this;
    }

    equals(interval: IntervalLike, esp = Tolerance.LENGTH_EPS): boolean {
        return MathUtils.equals(this.min, interval.min, esp) && 
               MathUtils.equals(this.max, interval.max, esp);
    }

    // 判断值是否在区间内
    contains(value: number, inclusive = true): boolean {
        if (inclusive) {
            return value >= this.min && value <= this.max;
        } else {
            return value > this.min && value < this.max;
        }
    }

    // 判断区间是否包含另一个区间
    containsInterval(interval: IntervalLike): boolean {
        return this.min <= interval.min && this.max >= interval.max;
    }

    // 判断区间是否与另一个区间重叠
    overlaps(interval: IntervalLike): boolean {
        return this.min <= interval.max && this.max >= interval.min;
    }

    // 判断区间是否与另一个区间相交
    intersects(interval: IntervalLike): boolean {
        return this.overlaps(interval);
    }

    // 合并区间
    union(interval: IntervalLike): this {
        this.min = Math.min(this.min, interval.min);
        this.max = Math.max(this.max, interval.max);
        return this;
    }

    // 求交集
    intersection(interval: IntervalLike): this {
        const newMin = Math.max(this.min, interval.min);
        const newMax = Math.min(this.max, interval.max);
        
        if (newMin > newMax) {
            // 没有交集，返回空区间
            this.min = 0;
            this.max = 0;
        } else {
            this.min = newMin;
            this.max = newMax;
        }
        return this;
    }

    // 分割区间
    split(value: number): [Interval, Interval] {
        if (!this.contains(value)) {
            throw new Error("Split value must be within the interval");
        }
        
        const left = new Interval(this.min, value, this.autoReset);
        const right = new Interval(value, this.max, this.autoReset);
        return [left, right];
    }

    // 按比例分割区间
    splitByRatio(ratio: number): [Interval, Interval] {
        if (ratio < 0 || ratio > 1) {
            throw new Error("Ratio must be between 0 and 1");
        }
        
        const splitValue = this.min + (this.max - this.min) * ratio;
        return this.split(splitValue);
    }

    // 获取区间长度
    getLength(): number {
        return this.max - this.min;
    }

    // 获取区间中心点
    getCenter(): number {
        return (this.min + this.max) / 2;
    }

    // 判断区间是否为空
    isEmpty(): boolean {
        return this.min >= this.max;
    }

    // 判断区间是否为无限区间
    isInfinite(): boolean {
        return this.min === -Infinity || this.max === Infinity;
    }

    // 判断区间是否有效
    isValid(): boolean {
        return this.min <= this.max;
    }

    // 扩展区间
    expand(amount: number): this {
        this.min -= amount;
        this.max += amount;
        return this;
    }

    // 收缩区间
    contract(amount: number): this {
        this.min += amount;
        this.max -= amount;
        return this;
    }

    // 平移区间
    translate(offset: number): this {
        this.min += offset;
        this.max += offset;
        return this;
    }

    // 缩放区间
    scale(factor: number, center?: number): this {
        const centerPoint = center ?? this.getCenter();
        this.min = centerPoint + (this.min - centerPoint) * factor;
        this.max = centerPoint + (this.max - centerPoint) * factor;
        return this;
    }

    // 将值限制在区间内
    clamp(value: number): number {
        return MathUtils.clamp(value, this.min, this.max);
    }

    // 获取区间内的随机值
    random(): number {
        return MathUtils.randomFloat(this.min, this.max);
    }

    // 线性插值
    lerp(t: number): number {
        return this.min + (this.max - this.min) * t;
    }

    // 获取值在区间中的相对位置 (0-1)
    getRelativePosition(value: number): number {
        if (this.getLength() === 0) return 0;
        return (value - this.min) / (this.max - this.min);
    }

    // 获取区间边界
    getBounds(): [number, number] {
        return [this.min, this.max];
    }

    // 转换为数组
    toArray(): [number, number] {
        return [this.min, this.max];
    }

    // 从数组加载
    fromArray(array: number[]): this {
        if (array.length < 2) {
            throw new Error("Array must have at least 2 elements");
        }
        return this.set(array[0], array[1]);
    }

    load(data: IntervalLike): this {
        return this.copy(data);
    }

    dump(): DumpResult<IntervalLike> {
        return { 
            type: this.type, 
            value: { 
                min: this.min, 
                max: this.max, 
                autoReset: this.autoReset 
            } 
        };
    }
}

export { Interval, IntervalLike };
