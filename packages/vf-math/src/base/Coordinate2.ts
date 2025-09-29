/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 09:51:37
 * @FilePath: \vf-studio\packages\vf-math\src\base\Coordinate2.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Coordinate, CoordinateLike } from "./Coordinate";
import { Vector2, type Vector2Like } from "./Vector2";
import { Matrix3 } from "./Matrix3";
import { Tolerance } from "../utils";
import { DumpResult } from "./AbstractMathObject";

type Coordinate2Like = CoordinateLike<Vector2>;

/**
 * 二维坐标系类
 * 表示一个二维坐标系，包含原点、Dx和Dy方向向量
 */
class Coordinate2 extends Coordinate<Vector2, Coordinate2Like> {

    /**
     * 创建标准坐标系（原点在(0,0)，Dx为(1,0)，Dy为(0,1)）
     */
    static STANDARD(): Coordinate2 {
        return new Coordinate2(
            Vector2.ZERO(),
            Vector2.X(),
            Vector2.Y()
        );
    }

    /**
     * 从变换矩阵创建坐标系
     */
    static fromMatrix(matrix: Matrix3): Coordinate2 {
        const origin = new Vector2(matrix.elements[6], matrix.elements[7]);
        const dx = new Vector2(matrix.elements[0], matrix.elements[1]).normalize();
        const dy = new Vector2(matrix.elements[3], matrix.elements[4]).normalize();
        return new Coordinate2(origin, dx, dy);
    }

    constructor(origin: Vector2Like = { x: 0, y: 0 }, dx: Vector2Like = { x: 1, y: 0 }, dy: Vector2Like = { x: 0, y: 1 }) {
        super(
            new Vector2().copy(origin),
            new Vector2().copy(dx).normalize(),
            new Vector2().copy(dy).normalize()
        );
        
        // 确保Dy与Dx垂直
        this.orthogonalize();
    }

    /**
     * 复制另一个坐标系
     */
    copy(cs: Coordinate2Like): this {
        this._origin.copy(cs.origin);
        this._dx.copy(cs.dx);
        this._dy.copy(cs.dy);
        return this;
    }

    /**
     * 克隆坐标系
     */
    clone(): Coordinate2 {
        return new Coordinate2(this._origin, this._dx, this._dy);
    }

    /**
     * 设置坐标系
     */
    set(origin: Vector2Like, dx: Vector2Like, dy: Vector2Like): this {
        this._origin.copy(origin);
        this._dx.copy(dx).normalize();
        this._dy.copy(dy).normalize();
        this.orthogonalize();
        return this;
    }

    /**
     * 使Dy与Dx垂直
     */
    orthogonalize(): this {
        // 计算Dy在Dx上的投影
        const projection = this._dy.dot(this._dx);
        // 从Dy中减去投影，得到垂直分量
        this._dy.sub(new Vector2().copy(this._dx).multiplyScalar(projection)).normalize();
        return this;
    }

    /**
     * 检查坐标系是否为左手系
     */
    isLeftHanded(eps = Tolerance.CALCULATION_EPS): boolean {
        const cross = this._dx.cross(this._dy);
        return cross < -eps;
    }

    /**
     * 将世界坐标转换为本地坐标
     */
    worldToLocal(worldPoint: Vector2Like): Vector2 {
        const localPoint = new Vector2().copy(worldPoint).sub(this._origin);
        return new Vector2(
            localPoint.dot(this._dx),
            localPoint.dot(this._dy)
        );
    }

    /**
     * 将本地坐标转换为世界坐标
     */
    localToWorld(localPoint: Vector2Like): Vector2 {
        return new Vector2()
            .copy(this._origin)
            .add(new Vector2().copy(this._dx).multiplyScalar(localPoint.x))
            .add(new Vector2().copy(this._dy).multiplyScalar(localPoint.y));
    }

    /**
     * 将向量从世界坐标系转换到本地坐标系
     */
    worldVectorToLocal(worldVector: Vector2Like): Vector2 {
        return new Vector2(
            worldVector.x * this._dx.x + worldVector.y * this._dx.y,
            worldVector.x * this._dy.x + worldVector.y * this._dy.y
        );
    }

    /**
     * 将向量从本地坐标系转换到世界坐标系
     */
    localVectorToWorld(localVector: Vector2Like): Vector2 {
        return new Vector2()
            .copy(this._dx).multiplyScalar(localVector.x)
            .add(new Vector2().copy(this._dy).multiplyScalar(localVector.y));
    }

    /**
     * 旋转坐标系
     */
    rotate(angle: number): this {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        const newDx = new Vector2(
            this._dx.x * cos - this._dx.y * sin,
            this._dx.x * sin + this._dx.y * cos
        );
        
        const newDy = new Vector2(
            this._dy.x * cos - this._dy.y * sin,
            this._dy.x * sin + this._dy.y * cos
        );
        
        this._dx.copy(newDx);
        this._dy.copy(newDy);
        return this;
    }

    /**
     * 获取变换矩阵
     */
    getMatrix(): Matrix3 {
        return new Matrix3(
            this._dx.x, this._dx.y, 0,
            this._dy.x, this._dy.y, 0,
            this._origin.x, this._origin.y, 1
        );
    }

    /**
     * 从变换矩阵设置坐标系
     */
    setFromMatrix(matrix: Matrix3): this {
        this._origin.set(matrix.elements[6], matrix.elements[7]);
        this._dx.set(matrix.elements[0], matrix.elements[1]).normalize();
        this._dy.set(matrix.elements[3], matrix.elements[4]).normalize();
        return this;
    }

    /**
     * 比较两个坐标系是否相等
     */
    equals(cs: Coordinate2Like, eps = Tolerance.LENGTH_EPS): boolean {
        return this._origin.equals(cs.origin, eps) &&
               this._dx.equals(cs.dx, eps) &&
               this._dy.equals(cs.dy, eps);
    }

    /**
     * 获取坐标系的角度（Dx与标准X轴的夹角）
     */
    getAngle(): number {
        return this._dx.angle();
    }

    /**
     * 设置坐标系的角度
     */
    setAngle(angle: number): this {
        this._dx.set(Math.cos(angle), Math.sin(angle));
        this._dy.set(-Math.sin(angle), Math.cos(angle));
        return this;
    }

    /**
     * 序列化
     */
    load(data: Coordinate2Like): this {
        return this.copy(data);
    }

    /**
     * 反序列化
     */
    dump(): DumpResult<Coordinate2Like> {
        return {
            type: this.type,
            value: {
                origin: this._origin,
                dx: this._dx,
                dy: this._dy
            }
        };
    }
}

export { Coordinate2, Coordinate2Like };

