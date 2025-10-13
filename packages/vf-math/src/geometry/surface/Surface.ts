/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-29 10:07:12
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-13 15:06:36
 * @FilePath: \vf-studio\packages\vf-math\src\geometry\surface\Surface.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject, Interval, PeriodInterval, Vector2, Vector3 } from "../../base";
import { MathUtils, Tolerance } from "../../utils";

const { equals } = MathUtils

abstract class Surface extends AbstractMathObject {
    protected u: Interval;
    protected v: Interval;

    protected static DefaultU: Interval = Interval.INFINITE();
    protected static DefaultV: Interval = Interval.INFINITE();

    constructor() {
        super();
        // 使用 this.constructor 动态获取子类的静态属性
        const ctor = this.constructor as typeof Surface;
        this.u = ctor.DefaultU.clone();
        this.v = ctor.DefaultV.clone();
    }

    isUPeriodic(): boolean {
        return this.getDomainU() instanceof PeriodInterval
    }
    
    isVPeriodic(): boolean {
        return this.getDomainV() instanceof PeriodInterval
    }

    /**
     * 获取U方向的参数域（当前使用的参数范围）
     */
    getDomainU(): Interval {
        return this.u.clone();
    }

    /**
     * 获取V方向的参数域（当前使用的参数范围）
     */
    getDomainV(): Interval {
        return this.v.clone();
    }

    /**
     * 获取曲面的UV边界
     * 如果设置了自定义UV范围（通过setUVBounds），则返回自定义范围
     * 否则返回曲面的自然边界（通过getSurfaceBounds）
     */
    getUVBounds(): { u: Interval, v: Interval } {
        return {
            u: this.getDomainU(),
            v: this.getDomainV()
        };
    }


    /**
     * 设置U方向的参数域
     * 用于限制曲面在U方向的可见范围
     * 如果设置的范围超出自然边界，会自动钳制到有效范围内
     * 
     * @param domain U方向的参数区间
     * @returns this 用于链式调用
     */
    setDomainU(domain: Interval): this {
        const ctor = this.constructor as typeof Surface;
        this.u.copy(domain).clamp(ctor.DefaultU);
        return this;
    }

    /**
     * 设置V方向的参数域
     * 用于限制曲面在V方向的可见范围
     * 如果设置的范围超出自然边界，会自动钳制到有效范围内
     * 
     * @param domain V方向的参数区间
     * @returns this 用于链式调用
     */
    setDomainV(domain: Interval): this {
        const ctor = this.constructor as typeof Surface;
        this.v.copy(domain).clamp(ctor.DefaultV);
        return this;
    }

    /**
     * 同时设置U和V方向的参数域
     * 用于限制曲面的可见部分，例如绘制半球、四分之一球等
     * 如果设置的范围超出自然边界，会自动钳制到有效范围内
     *
     * @param bounds UV参数域，包含u和v的区间
     * @returns this 用于链式调用
     */
    setUVBounds(bounds: { u?: Interval, v?: Interval }): this {
        if (bounds.u) {
            this.setDomainU(bounds.u);
        }
        if (bounds.v) {
            this.setDomainV(bounds.v);
        }
        return this;
    }

    /**
     * 重置参数域到曲面的完整自然边界
     * @returns this 用于链式调用
     * 
     * @example
     * sphere.setDomainV(new Interval(0, Math.PI / 2)); // 半球
     * sphere.resetUVBounds(); // 恢复完整球面
     */
    resetUVBounds(): this {
        const ctor = this.constructor as typeof Surface;
        this.u.copy(ctor.DefaultU);
        this.v.copy(ctor.DefaultV);
        return this;
    }

    distanceToPoint(point: Vector3): number {
        return this.getPointAt(this.getUVAt(point)).distanceTo(point);
    }

    containsPoint(point: Vector3, eps = Tolerance.LENGTH_EPS): boolean {
        return equals(this.distanceToPoint(point), 0, eps);
    }

    signDistanceToPoint(point: Vector3): number {
        const uv = this.getUVAt(point);
        const p = this.getPointAt(uv);
        const distance = p.distanceTo(point);
        return p.sub(point).dot(this.getNormalAt(uv)) > 0 ? distance : -distance;
    }

    getProjection(point: Vector3): Vector3 { 
        return this.getPointAt(this.getUVAt(point));
    }

    getNormalAtPoint(point: Vector3): Vector3 {
        return this.getNormalAt(this.getUVAt(point));
    }

    abstract getNormalAt(uv: Vector2): Vector3
    abstract getPointAt(uv: Vector2): Vector3
    abstract getUVAt(point: Vector3): Vector2
    abstract reverse(): this
}

export { Surface }