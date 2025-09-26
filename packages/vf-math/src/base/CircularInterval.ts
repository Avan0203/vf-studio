/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:30:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 10:25:32
 * @FilePath: \vf-studio\packages\vf-math\src\base\CircularInterval.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Interval, IntervalLike } from "./Interval";
import { DEG2RAD, DOUBLE_PI, MathUtils, RAD2DEG, Tolerance } from "../utils";

type CircularIntervalLike = IntervalLike & {
    period?: number;
}

class CircularInterval extends Interval {
    period: number;

    static FULL_CIRCLE(period = DOUBLE_PI) {
        return new CircularInterval(0, period, period);
    }

    static HALF_CIRCLE(period = DOUBLE_PI) {
        return new CircularInterval(0, period / 2, period);
    }

    static QUARTER_CIRCLE(period = DOUBLE_PI) {
        return new CircularInterval(0, period / 4, period);
    }

    constructor(min = 0, max = DOUBLE_PI, period = DOUBLE_PI) {
        super(min, max);
        this.period = period;
    }

    copy(interval: CircularIntervalLike): this {
        super.copy(interval);
        this.period = interval.period ?? DOUBLE_PI;
        return this;
    }

    clone(): CircularInterval {
        return new CircularInterval(this.min, this.max, this.period);
    }

    set(min: number, max: number): this {
        super.set(min, max);
        return this;
    }

    equals(interval: CircularIntervalLike, esp = Tolerance.LENGTH_EPS): boolean {
        return super.equals(interval, esp) && 
               MathUtils.equals(this.period, interval.period ?? DOUBLE_PI, esp);
    }

    // 设置周期
    setPeriod(period: number): this {
        this.period = period;
        return this;
    }

    // 将角度归一化到 [0, period) 范围内
    normalizeAngle(angle: number): number {
        return MathUtils.normalizeAngle(angle, this.period);
    }

    // 将角度归一化到当前区间内
    normalizeToInterval(angle: number): number {
        const normalized = this.normalizeAngle(angle);
        
        // 如果归一化后的角度在当前区间内，直接返回
        if (this.contains(normalized)) {
            return normalized;
        }

        // 如果区间跨越了 0 点（如 [3π/2, π/2]），需要特殊处理
        if (this.min > this.max) {
            // 区间跨越 0 点
            if (normalized >= this.min || normalized <= this.max) {
                return normalized;
            }
            // 选择最近的角度
            const dist1 = Math.min(normalized - this.min, this.min - normalized + this.period);
            const dist2 = Math.min(this.max - normalized, normalized - this.max + this.period);
            return dist1 < dist2 ? this.min : this.max;
        }

        // 选择最近的角度
        const distToMin = Math.min(Math.abs(normalized - this.min), 
                                 Math.abs(normalized - this.min + this.period),
                                 Math.abs(normalized - this.min - this.period));
        const distToMax = Math.min(Math.abs(normalized - this.max),
                                 Math.abs(normalized - this.max + this.period),
                                 Math.abs(normalized - this.max - this.period));
        
        return distToMin < distToMax ? this.min : this.max;
    }

    // 判断角度是否在圆周周期内
    containsAngle(angle: number, inclusive = true): boolean {
        const normalized = this.normalizeAngle(angle);
        
        if (this.min > this.max) {
            // 区间跨越 0 点，如 [3π/2, π/2]
            return inclusive ? 
                (normalized >= this.min || normalized <= this.max) :
                (normalized > this.min || normalized < this.max);
        } else {
            // 普通区间
            return inclusive ? 
                (normalized >= this.min && normalized <= this.max) :
                (normalized > this.min && normalized < this.max);
        }
    }

    // 判断角度是否在圆周周期内（考虑周期重复）
    containsAngleWithPeriod(angle: number, inclusive = true): boolean {
        // 检查所有可能的周期重复
        const normalized = this.normalizeAngle(angle);
        const periods = Math.floor(angle / this.period);
        
        for (let i = -1; i <= 1; i++) {
            const testAngle = normalized + i * this.period;
            if (this.containsAngle(testAngle, inclusive)) {
                return true;
            }
        }
        return false;
    }

    // 获取区间的角度范围
    getAngleRange(): number {
        if (this.min > this.max) {
            return this.period - this.min + this.max;
        } else {
            return this.max - this.min;
        }
    }

    // 判断区间是否跨越 0 点
    crossesZero(): boolean {
        return this.min > this.max;
    }

    // 获取区间的中心角度
    getCenterAngle(): number {
        if (this.min > this.max) {
            // 跨越 0 点的区间
            const center = (this.min + this.max + this.period) / 2;
            return this.normalizeAngle(center);
        } else {
            return (this.min + this.max) / 2;
        }
    }

    // 扩展角度区间
    expandAngle(amount: number): this {
        if (this.min > this.max) {
            // 跨越 0 点的区间
            this.min = this.normalizeAngle(this.min - amount);
            this.max = this.normalizeAngle(this.max + amount);
        } else {
            this.min = this.normalizeAngle(this.min - amount);
            this.max = this.normalizeAngle(this.max + amount);
        }
        return this;
    }

    // 收缩角度区间
    contractAngle(amount: number): this {
        if (this.min > this.max) {
            // 跨越 0 点的区间
            this.min = this.normalizeAngle(this.min + amount);
            this.max = this.normalizeAngle(this.max - amount);
        } else {
            this.min = this.normalizeAngle(this.min + amount);
            this.max = this.normalizeAngle(this.max - amount);
        }
        return this;
    }

    // 旋转角度区间
    rotateAngle(offset: number): this {
        this.min = this.normalizeAngle(this.min + offset);
        this.max = this.normalizeAngle(this.max + offset);
        return this;
    }

    // 获取角度区间的边界（考虑周期）
    getAngleBounds(): [number, number] {
        return [this.min, this.max];
    }

    // 转换为弧度
    toRadians(): CircularInterval {
        return new CircularInterval(
            this.min * DEG2RAD,
            this.max * DEG2RAD,
            this.period * DEG2RAD
        );
    }

    // 转换为角度
    toDegrees(): CircularInterval {
        return new CircularInterval(
            this.min * RAD2DEG,
            this.max * RAD2DEG,
            this.period * RAD2DEG
        );
    }

    // 获取区间内的随机角度
    randomAngle(): number {
        if (this.min > this.max) {
            // 跨越 0 点的区间
            const range = this.period - this.min + this.max;
            const random = Math.random() * range;
            if (random < this.period - this.min) {
                return this.normalizeAngle(this.min + random);
            } else {
                return this.normalizeAngle(random - (this.period - this.min));
            }
        } else {
            return this.min + Math.random() * (this.max - this.min);
        }
    }

    // 判断两个角度区间是否重叠（考虑周期）
    overlapsAngle(interval: CircularIntervalLike): boolean {
        const other = new CircularInterval(interval.min, interval.max, interval.period ?? DOUBLE_PI);
        
        // 检查所有可能的周期重复
        for (let i = -1; i <= 1; i++) {
            const offset = i * this.period;
            const testMin = this.normalizeAngle(other.min + offset);
            const testMax = this.normalizeAngle(other.max + offset);
            
            if (this.overlaps({ min: testMin, max: testMax })) {
                return true;
            }
        }
        return false;
    }

    // 合并角度区间
    unionAngle(interval: CircularIntervalLike): this {
        const other = new CircularInterval(interval.min, interval.max, interval.period ?? DOUBLE_PI);
        
        // 找到所有可能的边界点
        const points = [
            this.min, this.max,
            other.min, other.max,
            this.normalizeAngle(this.min + this.period),
            this.normalizeAngle(this.max + this.period),
            this.normalizeAngle(other.min + this.period),
            this.normalizeAngle(other.max + this.period)
        ];
        
        // 找到最小和最大边界
        let minBound = Math.min(...points);
        let maxBound = Math.max(...points);
        
        // 如果范围超过一个周期，可能需要调整
        if (maxBound - minBound > this.period) {
            // 选择跨越 0 点的区间
            const center = (minBound + maxBound) / 2;
            this.min = this.normalizeAngle(center + this.period / 2);
            this.max = this.normalizeAngle(center - this.period / 2);
        } else {
            this.min = minBound;
            this.max = maxBound;
        }
        
        return this;
    }

    // 重写 dump 方法
    dump() {
        return {
            type: this.type,
            value: {
                min: this.min,
                max: this.max,
                autoReset: this.autoReset,
                period: this.period
            }
        };
    }
}

export { CircularInterval, CircularIntervalLike };
