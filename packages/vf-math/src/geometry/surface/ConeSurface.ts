/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-13 17:21:43
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-14 17:49:57
 * @FilePath: \vf-studio\packages\vf-math\src\geometry\surface\ConeSurface.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Vector3, Vector2, PeriodInterval, Interval } from "../../base";
import { CoordinateSurface } from "./CoordinateSurface";

/**
 * 圆锥面类
 * 参数化方式：
 * - u: 角度参数，范围 [0, 2π]
 * - v: 沿母线的参数，范围 [0, 1]，0 表示顶点，1 表示底面
 * 
 * 注意：当 v = 1 时，表示底面圆周上的点
 * 闭合功能由细分器处理，不在曲面类中实现
 */
class ConeSurface extends CoordinateSurface {
    private _apex: Vector3;      // 圆锥顶点
    private _radius: number;     // 底面半径
    private _height: number;     // 圆锥高度

    // 圆锥面的自然参数域：角度 [0, 2π]，高度参数 [0, 1]
    protected static override DefaultU = PeriodInterval.FULL_CIRCLE();
    protected static override DefaultV = new Interval(0, 1);

    /**
     * 构造圆锥面
     * @param apex 圆锥顶点
     * @param radius 底面半径
     * @param height 圆锥高度（沿 z 轴正方向）
     */
    constructor(apex: Vector3, axis: Vector3, radius: number, height: number) {
        super();
        this._apex = new Vector3().copy(apex);
        this._radius = radius;
        this._height = height;

        // 设置圆锥的坐标系
        // apex 是圆锥顶点，axis 是从底面指向顶点的方向
        // 坐标系的原点在底面中心，z 轴沿 axis 方向
        const normalizedAxis = axis.clone().normalize();
        const bottomCenter = apex.clone().sub(normalizedAxis.clone().multiplyScalar(height));
        this._coordinate.set(bottomCenter, axis);
    }

    getApex(): Vector3 {
        return this._apex.clone();
    }

    getRadius(): number {
        return this._radius;
    }

    getHeight(): number {
        return this._height;
    }

    setApex(apex: Vector3): this {
        this._apex.copy(apex);
        // 保持原有的坐标系方向，只更新原点
        this._coordinate.set(apex, this._coordinate.dx, this._coordinate.dy);
        return this;
    }

    setRadius(radius: number): this {
        this._radius = radius;
        return this;
    }

    setHeight(height: number): this {
        this._height = height;
        return this;
    }

    getPointAt(uv: Vector2): Vector3 {
        // 圆锥参数化：u 是角度 (0 到 2π)，v 是沿母线的参数 (0 到 1)
        const u = uv.x; // 角度
        const v = uv.y; // 沿母线的参数，0 = 底面，1 = 顶点

        // 圆锥参数方程
        // 在局部坐标系中，底面在原点，圆锥沿 z 轴正方向延伸到顶点
        const r = this._radius * (1 - v); // 当前高度处的半径，v=0时r=radius，v=1时r=0
        const x = r * Math.cos(u);
        const y = r * Math.sin(u);
        const z = this._height * v; // v=0时z=0（底面），v=1时z=height（顶点）

        // 将局部坐标转换为世界坐标
        const localPoint = new Vector3(x, y, z);
        return this._coordinate.localToWorld(localPoint);
    }

    getNormalAt(uv: Vector2): Vector3 {
        // 圆锥面的法向量计算
        const u = uv.x;
        const v = uv.y;

        // 如果在顶点（v=1），返回轴方向的法向量
        if (v > 1 - 1e-6) {
            const normal = new Vector3(0, 0, 1); // 指向轴方向（顶点）
            return this._coordinate.localVectorToWorld(normal);
        }

        // 计算圆锥面的法向量
        // 使用参数化的偏导数来计算法向量
        // P(u, v) = (r*(1-v)*cos(u), r*(1-v)*sin(u), h*v)
        // ∂P/∂u = (-r*(1-v)*sin(u), r*(1-v)*cos(u), 0)
        // ∂P/∂v = (-r*cos(u), -r*sin(u), h)
        // 法向量 = ∂P/∂u × ∂P/∂v
        
        const cosU = Math.cos(u);
        const sinU = Math.sin(u);
        const r = this._radius;
        const h = this._height;
        
        // ∂P/∂u
        const dPdu = new Vector3(-r * (1 - v) * sinU, r * (1 - v) * cosU, 0);
        
        // ∂P/∂v
        const dPdv = new Vector3(-r * cosU, -r * sinU, h);
        
        // 法向量 = ∂P/∂u × ∂P/∂v
        const localNormal = dPdu.cross(dPdv).normalize();
        
        return this._coordinate.localVectorToWorld(localNormal);
    }

    getUVAt(point: Vector3): Vector2 {
        // 将世界坐标转换为局部坐标
        const localPoint = this._coordinate.worldToLocal(point);

        // 计算 v 参数（沿轴向的位置）
        // v = 0 对应底面，v = 1 对应顶点
        const v = localPoint.z / this._height;

        // 计算 u 参数（角度）
        let u = Math.atan2(localPoint.y, localPoint.x);
        if (u < 0) {
            u += 2 * Math.PI;
        }

        return new Vector2(u, v);
    }

    reverse(): this {
        super.reverse();
        // 圆锥面反转可以通过改变法向量方向实现
        this._coordinate.dy = this._coordinate.dy.negate();
        return this;
    }

    copy(cone: ConeSurface): this {
        super.copy(cone);
        this._apex.copy(cone.getApex());
        this._radius = cone.getRadius();
        this._height = cone.getHeight();
        return this;
    }

    clone(): ConeSurface {
        return new ConeSurface(this._apex, this._coordinate.getNormal(), this._radius, this._height);
    }

    containsPoint(point: Vector3, eps = 1e-6): boolean {
        const localPoint = this._coordinate.worldToLocal(point);

        // 检查是否在高度范围内
        if (localPoint.z < -eps || localPoint.z > this._height + eps) {
            return false;
        }

        // 计算该高度处的理论半径
        // v = 0 对应底面（r = radius），v = 1 对应顶点（r = 0）
        const v = localPoint.z / this._height;
        const expectedRadius = this._radius * (1 - v);

        // 计算点到轴的距离
        const actualRadius = Math.sqrt(localPoint.x * localPoint.x + localPoint.y * localPoint.y);

        return Math.abs(actualRadius - expectedRadius) <= eps;
    }

    distanceToPoint(point: Vector3): number {
        const localPoint = this._coordinate.worldToLocal(point);

        // 计算点到圆锥面的距离
        const v = Math.max(0, Math.min(1, localPoint.z / this._height));
        const expectedRadius = this._radius * (1 - v);
        const actualRadius = Math.sqrt(localPoint.x * localPoint.x + localPoint.y * localPoint.y);

        // 使用勾股定理计算到圆锥母线的距离
        const slant = Math.sqrt(this._radius * this._radius + this._height * this._height);
        const radiusDiff = actualRadius - expectedRadius;
        const heightDiff = localPoint.z - v * this._height;

        const distance = Math.abs(radiusDiff * this._height / slant + heightDiff * this._radius / slant);

        return distance;
    }
}

export { ConeSurface };