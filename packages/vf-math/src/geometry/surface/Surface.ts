/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-29 10:07:12
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 10:43:01
 * @FilePath: \vf-studio\packages\vf-math\src\geometry\surface\Surface.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject, Interval, PeriodInterval, Vector2, Vector3 } from "../../base";
import { MathUtils, Tolerance } from "../../utils";

const { equals } = MathUtils

abstract class Surface extends AbstractMathObject {
    constructor() {
        super();
    }

    isUPeriodic(): boolean {
        return this.getDomainU() instanceof PeriodInterval
    }
    
    isVPeriodic(): boolean {
        return this.getDomainV() instanceof PeriodInterval
    }

    getDomainU(): Interval {
        return this.getUVBounds().u;
    }

    getDomainV(): Interval {
        return this.getUVBounds().v;
    }

    getUVBounds(): { u: Interval, v: Interval } {
        return { u: Interval.INFINITE(), v: Interval.INFINITE() };
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
    abstract getSurfaceBounds(): { u: Interval, v: Interval }
    abstract reverse(): this
}

export { Surface }