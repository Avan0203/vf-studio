/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 11:06:04
 * @FilePath: \vf-studio\packages\vf-math\src\base\Coordinate3.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Coordinate, CoordinateLike } from "./Coordinate";
import { Vector3, type Vector3Like } from "./Vector3";
import { Matrix4 } from "./Matrix4";
import { Quaternion, type QuaternionLike } from "./Quaternion";
import { Tolerance } from "../utils";
import { DumpResult } from "./AbstractMathObject";

type Coordinate3Like = CoordinateLike<Vector3>;

/**
 * 三维坐标系类
 * 表示一个三维坐标系，包含原点、Dx、Dy和Dz方向向量
*/
class Coordinate3 extends Coordinate<Vector3, Coordinate3Like> {
    dz: Vector3;  // Z轴方向向量

    /**
     * 创建标准坐标系（原点在(0,0,0)，Dx为(1,0,0)，Dy为(0,1,0)，Dz为(0,0,1)）
     */
    static STANDARD(): Coordinate3 {
        return new Coordinate3(
            Vector3.ZERO(),
            Vector3.X(),
            Vector3.Y()
        );
    }

    /**
     * 从变换矩阵创建坐标系
     */
    static fromMatrix(matrix: Matrix4): Coordinate3 {
        const origin = new Vector3(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
        const dx = new Vector3(matrix.elements[0], matrix.elements[1], matrix.elements[2]).normalize();
        const dy = new Vector3(matrix.elements[4], matrix.elements[5], matrix.elements[6]).normalize();
        return new Coordinate3(origin, dx, dy);
    }

    /**
     * 从四元数创建坐标系
     */
    static fromQuaternion(origin: Vector3Like, quaternion: QuaternionLike): Coordinate3 {
        const dx = new Vector3(1, 0, 0).applyQuaternion(quaternion);
        const dy = new Vector3(0, 1, 0).applyQuaternion(quaternion);
        return new Coordinate3(origin, dx, dy);
    }

    constructor(
        origin: Vector3Like = { x: 0, y: 0, z: 0 },
        dx: Vector3Like = { x: 1, y: 0, z: 0 },
        dy: Vector3Like = { x: 0, y: 1, z: 0 }
    ) {
        super(
            new Vector3().copy(origin),
            new Vector3().copy(dx).normalize(),
            new Vector3().copy(dy).normalize()
        );

        // 通过叉积计算dz轴，确保坐标系的正交性
        this.dz = this._dx.clone().cross(this._dy).normalize();

        // 确保坐标系正交（主要处理dx和dy可能不完全正交的情况）
        this.orthogonalize();
    }

    /**
     * 复制另一个坐标系
     */
    copy(cs: Coordinate3Like): this {
        this._origin.copy(cs.origin);
        this._dx.copy(cs.dx);
        this._dy.copy(cs.dy);

        // 通过叉积重新计算dz轴
        this.dz = this._dx.clone().cross(this._dy).normalize();

        this.orthogonalize();
        return this;
    }

    /**
     * 克隆坐标系
     */
    clone(): Coordinate3 {
        return new Coordinate3(this._origin, this._dx, this._dy);
    }

    /**
     * 设置坐标系
     */
    set(origin: Vector3Like, dx: Vector3Like, dy: Vector3Like): this {
        this._origin.copy(origin);
        this._dx.copy(dx).normalize();
        this._dy.copy(dy).normalize();

        // 通过叉积计算dz轴
        this.dz = this._dx.clone().cross(this._dy).normalize();

        // 确保坐标系正交
        this.orthogonalize();
        return this;
    }

    /**
     * 使坐标系正交化
     */
    orthogonalize(): this {
        // 使用Gram-Schmidt正交化过程
        // 保持Dx轴不变，正交化Dy轴
        const projectionY = this._dy.dot(this._dx);
        this._dy.sub(new Vector3().copy(this._dx).multiplyScalar(projectionY)).normalize();

        // Dz轴通过叉积重新计算，确保正交
        this.dz = this._dx.clone().cross(this._dy).normalize();

        return this;
    }

    /**
     * 检查坐标系是否为左手系
     */
    isLeftHanded(eps = Tolerance.CALCULATION_EPS): boolean {
        const cross = this._dx.clone().cross(this._dy);
        return cross.dot(this.dz) < -eps;
    }

    /**
     * 将世界坐标转换为本地坐标
     */
    worldToLocal(worldPoint: Vector3Like): Vector3 {
        const localPoint = new Vector3().copy(worldPoint).sub(this._origin);
        return new Vector3(
            localPoint.dot(this._dx),
            localPoint.dot(this._dy),
            localPoint.dot(this.dz)
        );
    }

    /**
     * 将本地坐标转换为世界坐标
     */
    localToWorld(localPoint: Vector3Like): Vector3 {
        return new Vector3()
            .copy(this._origin)
            .add(new Vector3().copy(this._dx).multiplyScalar(localPoint.x))
            .add(new Vector3().copy(this._dy).multiplyScalar(localPoint.y))
            .add(new Vector3().copy(this.dz).multiplyScalar(localPoint.z));
    }

    /**
     * 将向量从世界坐标系转换到本地坐标系
     */
    worldVectorToLocal(worldVector: Vector3Like): Vector3 {
        return new Vector3(
            worldVector.x * this._dx.x + worldVector.y * this._dx.y + worldVector.z * this._dx.z,
            worldVector.x * this._dy.x + worldVector.y * this._dy.y + worldVector.z * this._dy.z,
            worldVector.x * this.dz.x + worldVector.y * this.dz.y + worldVector.z * this.dz.z
        );
    }

    /**
     * 将向量从本地坐标系转换到世界坐标系
     */
    localVectorToWorld(localVector: Vector3Like): Vector3 {
        return new Vector3()
            .copy(this._dx).multiplyScalar(localVector.x)
            .add(new Vector3().copy(this._dy).multiplyScalar(localVector.y))
            .add(new Vector3().copy(this.dz).multiplyScalar(localVector.z));
    }

    /**
     * 绕X轴旋转坐标系
     */
    rotateX(angle: number): this {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const newDy = new Vector3(
            this._dy.x,
            this._dy.y * cos - this._dy.z * sin,
            this._dy.y * sin + this._dy.z * cos
        );

        const newDz = new Vector3(
            this.dz.x,
            this.dz.y * cos - this.dz.z * sin,
            this.dz.y * sin + this.dz.z * cos
        );

        this._dy.copy(newDy);
        this.dz.copy(newDz);
        return this;
    }

    /**
     * 绕Y轴旋转坐标系
     */
    rotateY(angle: number): this {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const newDx = new Vector3(
            this._dx.x * cos + this._dx.z * sin,
            this._dx.y,
            -this._dx.x * sin + this._dx.z * cos
        );

        const newDz = new Vector3(
            this.dz.x * cos + this.dz.z * sin,
            this.dz.y,
            -this.dz.x * sin + this.dz.z * cos
        );

        this._dx.copy(newDx);
        this.dz.copy(newDz);
        return this;
    }

    /**
     * 绕Z轴旋转坐标系
     */
    rotateZ(angle: number): this {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const newDx = new Vector3(
            this._dx.x * cos - this._dx.y * sin,
            this._dx.x * sin + this._dx.y * cos,
            this._dx.z
        );

        const newDy = new Vector3(
            this._dy.x * cos - this._dy.y * sin,
            this._dy.x * sin + this._dy.y * cos,
            this._dy.z
        );

        this._dx.copy(newDx);
        this._dy.copy(newDy);
        return this;
    }

    /**
     * 使用四元数旋转坐标系
     */
    rotateByQuaternion(quaternion: QuaternionLike): this {
        this._dx.applyQuaternion(quaternion);
        this._dy.applyQuaternion(quaternion);
        this.dz.applyQuaternion(quaternion);
        return this;
    }

    /**
     * 平移坐标系
     */
    translate(translation: Vector3Like): this {
        this._origin.add(translation);
        return this;
    }

    /**
     * 获取变换矩阵
     */
    getMatrix(): Matrix4 {
        return new Matrix4(
            this._dx.x, this._dx.y, this._dx.z, 0,
            this._dy.x, this._dy.y, this._dy.z, 0,
            this.dz.x, this.dz.y, this.dz.z, 0,
            this._origin.x, this._origin.y, this._origin.z, 1
        );
    }

    /**
     * 从变换矩阵设置坐标系
     */
    setFromMatrix(matrix: Matrix4): this {
        this._origin.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
        this._dx.set(matrix.elements[0], matrix.elements[1], matrix.elements[2]).normalize();
        this._dy.set(matrix.elements[4], matrix.elements[5], matrix.elements[6]).normalize();
        this.dz.set(matrix.elements[8], matrix.elements[9], matrix.elements[10]).normalize();
        return this;
    }

    /**
     * 获取四元数表示
     */
    getQuaternion(): Quaternion {
        const matrix = this.getMatrix();
        return new Quaternion().setFromRotationMatrix(matrix);
    }

    /**
     * 从四元数设置坐标系
     */
    setFromQuaternion(quaternion: QuaternionLike): this {
        this._dx.set(1, 0, 0).applyQuaternion(quaternion);
        this._dy.set(0, 1, 0).applyQuaternion(quaternion);

        // 通过叉积计算dz轴
        this.dz = this._dx.clone().cross(this._dy).normalize();

        return this;
    }

    /**
     * 比较两个坐标系是否相等
     */
    equals(cs: Coordinate3Like, eps = Tolerance.LENGTH_EPS): boolean {
        // 计算cs对应的dz轴
        const csDz = new Vector3().copy(cs.dx).cross(new Vector3().copy(cs.dy)).normalize();

        return this._origin.equals(cs.origin, eps) &&
            this._dx.equals(cs.dx, eps) &&
            this._dy.equals(cs.dy, eps) &&
            this.dz.equals(csDz, eps);
    }

    /**
     * 获取坐标系的法向量（Dz方向）
     */
    getNormal(): Vector3 {
        return this.dz.clone();
    }

    /**
     * 设置坐标系的法向量（Dz方向）
     */
    setNormal(normal: Vector3Like): this {
        this.dz.copy(normal).normalize();

        // 重新计算Dx轴和Dy轴以保持正交
        if (Math.abs(this.dz.dot(Vector3.X())) < 0.9) {
            this._dx = Vector3.X().clone().cross(this.dz).normalize();
        } else {
            this._dx = Vector3.Y().clone().cross(this.dz).normalize();
        }

        this._dy = this.dz.clone().cross(this._dx).normalize();
        return this;
    }

    /**
     * 序列化
     */
    load(data: Coordinate3Like): this {
        return this.copy(data);
    }

    /**
     * 反序列化
     */
    dump(): DumpResult<Coordinate3Like> {
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

export { Coordinate3, Coordinate3Like };

