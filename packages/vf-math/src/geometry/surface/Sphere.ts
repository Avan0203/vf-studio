import { Vector3, Vector2, PeriodInterval, Interval } from "../../base";
import { CoordinateSurface } from "./CoordinateSurface";

class SphereSurface extends CoordinateSurface { 
    private _center: Vector3;
    private _radius: number;

    constructor(center: Vector3, radius: number) {
        super();
        this._center = center.clone();
        this._radius = radius;
        
        // 设置球面的坐标系，以球心为原点
        this._coordinate.set(center, this._coordinate.dx, this._coordinate.dy);
    }

    getCenter(): Vector3 {
        return this._center.clone();
    }

    getRadius(): number {
        return this._radius;
    }

    setCenter(center: Vector3): this {
        this._center.copy(center);
        this._coordinate.set(center, this._coordinate.dx, this._coordinate.dy);
        return this;
    }

    setRadius(radius: number): this {
        this._radius = radius;
        return this;
    }

    getPointAt(uv: Vector2): Vector3 {
        // 球面参数化：u 是经度 (0 到 2π)，v 是纬度 (0 到 π)
        const u = uv.x; // 经度
        const v = uv.y; // 纬度
        
        // 球面参数方程
        const x = this._radius * Math.sin(v) * Math.cos(u);
        const y = this._radius * Math.sin(v) * Math.sin(u);
        const z = this._radius * Math.cos(v);
        
        // 将局部坐标转换为世界坐标
        const localPoint = new Vector3(x, y, z);
        return this._coordinate.localToWorld(localPoint);
    }

    getNormalAt(uv: Vector2): Vector3 {
        // 球面上任意点的法向量都是从球心指向该点的单位向量
        const point = this.getPointAt(uv);
        const normal = point.clone().sub(this._center).normalize();
        return normal;
    }

    getUVAt(point: Vector3): Vector2 {
        // 将世界坐标转换为局部坐标
        const localPoint = this._coordinate.worldToLocal(point);
        
        // 计算球面坐标
        const r = localPoint.getLength();
        if (r === 0) {
            // 如果点在球心，返回默认 UV
            return new Vector2(0, 0);
        }
        
        // 计算纬度 v (0 到 π)
        const v = Math.acos(localPoint.z / r);
        
        // 计算经度 u (0 到 2π)
        let u = Math.atan2(localPoint.y, localPoint.x);
        if (u < 0) {
            u += 2 * Math.PI;
        }
        
        return new Vector2(u, v);
    }

    getSurfaceBounds(): { u: PeriodInterval, v: Interval } {
        return {
            u: PeriodInterval.FULL_CIRCLE(), // 经度：0 到 2π
            v: new Interval(0, Math.PI)      // 纬度：0 到 π
        };
    }

    getUVBounds(): { u: PeriodInterval, v: Interval } {
        return this.getSurfaceBounds();
    }

    reverse(): this {
        super.reverse();
        // 球面反转可以通过改变法向量方向实现
        // 这里我们通过改变坐标系来实现
        this._coordinate.dy = this._coordinate.dy.negate();
        return this;
    }

    copy(sphere: SphereSurface): this {
        super.copy(sphere);
        this._center.copy(sphere.getCenter());
        this._radius = sphere.getRadius();
        return this;
    }

    clone(): SphereSurface {
        return new SphereSurface(this._center, this._radius);
    }

    containsPoint(point: Vector3, eps = 1e-6): boolean {
        const distance = point.distanceTo(this._center);
        return Math.abs(distance - this._radius) <= eps;
    }

    distanceToPoint(point: Vector3): number {
        const distance = point.distanceTo(this._center);
        return Math.abs(distance - this._radius);
    }
}

export { SphereSurface };