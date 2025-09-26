/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-26 09:44:52
 * @FilePath: \vf-studio\packages\vf-math\src\base\Coordinate3.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject, DumpResult } from "./AbstractMathObject";
import { Vector3, type Vector3Like } from "./Vector3";
import { Matrix4 } from "./Matrix4";
import { Quaternion, type QuaternionLike } from "./Quaternion";
import { Tolerance } from "../utils";

type Coordinate3Like = {
    origin: Vector3Like;
    dx: Vector3Like;
    dy: Vector3Like;
}

/**
 * 三维坐标系类
 * 表示一个三维坐标系，包含原点、Dx、Dy和Dz方向向量
*/
class Coordinate3 extends AbstractMathObject<Coordinate3Like> {
    origin: Vector3;
    dx: Vector3;  // X轴方向向量
    dy: Vector3;  // Y轴方向向量
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
        super();
        this.origin = new Vector3().copy(origin);
        this.dx = new Vector3().copy(dx).normalize();
        this.dy = new Vector3().copy(dy).normalize();

        // 通过叉积计算dz轴，确保坐标系的正交性
        this.dz = this.dx.cross(this.dy).normalize();

        // 确保坐标系正交（主要处理dx和dy可能不完全正交的情况）
        this.orthogonalize();
    }

    /**
     * 复制另一个坐标系
     */
    copy(cs: Coordinate3Like): this {
        this.origin.copy(cs.origin);
        this.dx.copy(cs.dx);
        this.dy.copy(cs.dy);

        // 通过叉积重新计算dz轴
        this.dz = this.dx.cross(this.dy).normalize();

        return this;
    }

    /**
     * 克隆坐标系
     */
    clone(): Coordinate3 {
        return new Coordinate3(this.origin, this.dx, this.dy);
    }

    /**
     * 设置坐标系
     */
    set(origin: Vector3Like, dx: Vector3Like, dy: Vector3Like): this {
        this.origin.copy(origin);
        this.dx.copy(dx).normalize();
        this.dy.copy(dy).normalize();

        // 通过叉积计算dz轴
        this.dz = this.dx.cross(this.dy).normalize();

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
        const projectionY = this.dy.dot(this.dx);
        this.dy.sub(new Vector3().copy(this.dx).multiplyScalar(projectionY)).normalize();

        // 正交化Dz轴
        const projectionZX = this.dz.dot(this.dx);
        const projectionZY = this.dz.dot(this.dy);
        this.dz
            .sub(new Vector3().copy(this.dx).multiplyScalar(projectionZX))
            .sub(new Vector3().copy(this.dy).multiplyScalar(projectionZY))
            .normalize();

        return this;
    }

    /**
     * 检查坐标系是否为左手系
     */
    isLeftHanded(eps = Tolerance.CALCULATION_EPS): boolean {
        const cross = this.dx.cross(this.dy);
        return cross.dot(this.dz) < -eps;
    }

    /**
     * 将世界坐标转换为本地坐标
     */
    worldToLocal(worldPoint: Vector3Like): Vector3 {
        const localPoint = new Vector3().copy(worldPoint).sub(this.origin);
        return new Vector3(
            localPoint.dot(this.dx),
            localPoint.dot(this.dy),
            localPoint.dot(this.dz)
        );
    }

    /**
     * 将本地坐标转换为世界坐标
     */
    localToWorld(localPoint: Vector3Like): Vector3 {
        return new Vector3()
            .copy(this.origin)
            .add(new Vector3().copy(this.dx).multiplyScalar(localPoint.x))
            .add(new Vector3().copy(this.dy).multiplyScalar(localPoint.y))
            .add(new Vector3().copy(this.dz).multiplyScalar(localPoint.z));
    }

    /**
     * 将向量从世界坐标系转换到本地坐标系
     */
    worldVectorToLocal(worldVector: Vector3Like): Vector3 {
        return new Vector3(
            worldVector.x * this.dx.x + worldVector.y * this.dx.y + worldVector.z * this.dx.z,
            worldVector.x * this.dy.x + worldVector.y * this.dy.y + worldVector.z * this.dy.z,
            worldVector.x * this.dz.x + worldVector.y * this.dz.y + worldVector.z * this.dz.z
        );
    }

    /**
     * 将向量从本地坐标系转换到世界坐标系
     */
    localVectorToWorld(localVector: Vector3Like): Vector3 {
        return new Vector3()
            .copy(this.dx).multiplyScalar(localVector.x)
            .add(new Vector3().copy(this.dy).multiplyScalar(localVector.y))
            .add(new Vector3().copy(this.dz).multiplyScalar(localVector.z));
    }

    /**
     * 绕X轴旋转坐标系
     */
    rotateX(angle: number): this {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const newDy = new Vector3(
            this.dy.x,
            this.dy.y * cos - this.dy.z * sin,
            this.dy.y * sin + this.dy.z * cos
        );

        const newDz = new Vector3(
            this.dz.x,
            this.dz.y * cos - this.dz.z * sin,
            this.dz.y * sin + this.dz.z * cos
        );

        this.dy.copy(newDy);
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
            this.dx.x * cos + this.dx.z * sin,
            this.dx.y,
            -this.dx.x * sin + this.dx.z * cos
        );

        const newDz = new Vector3(
            this.dz.x * cos + this.dz.z * sin,
            this.dz.y,
            -this.dz.x * sin + this.dz.z * cos
        );

        this.dx.copy(newDx);
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
            this.dx.x * cos - this.dx.y * sin,
            this.dx.x * sin + this.dx.y * cos,
            this.dx.z
        );

        const newDy = new Vector3(
            this.dy.x * cos - this.dy.y * sin,
            this.dy.x * sin + this.dy.y * cos,
            this.dy.z
        );

        this.dx.copy(newDx);
        this.dy.copy(newDy);
        return this;
    }

    /**
     * 使用四元数旋转坐标系
     */
    rotateByQuaternion(quaternion: QuaternionLike): this {
        this.dx.applyQuaternion(quaternion);
        this.dy.applyQuaternion(quaternion);
        this.dz.applyQuaternion(quaternion);
        return this;
    }

    /**
     * 平移坐标系
     */
    translate(translation: Vector3Like): this {
        this.origin.add(translation);
        return this;
    }

    /**
     * 获取变换矩阵
     */
    getMatrix(): Matrix4 {
        return new Matrix4(
            this.dx.x, this.dx.y, this.dx.z, 0,
            this.dy.x, this.dy.y, this.dy.z, 0,
            this.dz.x, this.dz.y, this.dz.z, 0,
            this.origin.x, this.origin.y, this.origin.z, 1
        );
    }

    /**
     * 从变换矩阵设置坐标系
     */
    setFromMatrix(matrix: Matrix4): this {
        this.origin.set(matrix.elements[12], matrix.elements[13], matrix.elements[14]);
        this.dx.set(matrix.elements[0], matrix.elements[1], matrix.elements[2]).normalize();
        this.dy.set(matrix.elements[4], matrix.elements[5], matrix.elements[6]).normalize();
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
    setFromQuaternion(origin: Vector3Like, quaternion: QuaternionLike): this {
        this.origin.copy(origin);
        this.dx.set(1, 0, 0).applyQuaternion(quaternion);
        this.dy.set(0, 1, 0).applyQuaternion(quaternion);

        // 通过叉积计算dz轴
        this.dz = this.dx.cross(this.dy).normalize();

        return this;
    }

    /**
     * 比较两个坐标系是否相等
     */
    equals(cs: Coordinate3Like, eps = Tolerance.LENGTH_EPS): boolean {
        // 计算cs对应的dz轴
        const csDz = new Vector3().copy(cs.dx).cross(new Vector3().copy(cs.dy)).normalize();

        return this.origin.equals(cs.origin, eps) &&
            this.dx.equals(cs.dx, eps) &&
            this.dy.equals(cs.dy, eps) &&
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
            this.dx = Vector3.X().cross(this.dz).normalize();
        } else {
            this.dx = Vector3.Y().cross(this.dz).normalize();
        }

        this.dy = this.dz.cross(this.dx).normalize();
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
                origin: { x: this.origin.x, y: this.origin.y, z: this.origin.z },
                dx: { x: this.dx.x, y: this.dx.y, z: this.dx.z },
                dy: { x: this.dy.x, y: this.dy.y, z: this.dy.z }
            }
        };
    }
}

export { Coordinate3, Coordinate3Like };

