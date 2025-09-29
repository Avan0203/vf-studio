/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-28 09:42:20
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-29 11:07:09
 * @FilePath: \vf-studio\packages\vf-math\src\base\Coordinate.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject } from "./AbstractMathObject";
import { VectorLike } from "./Vector";

/**
 * 坐标系接口 - 定义坐标系的数据结构
 */
interface CoordinateLike<T> {
    origin: T;
    dx: T;
    dy: T;
}

/**
 * 抽象坐标系基类 - 使用泛型约束确保类型安全
 */
abstract class Coordinate<T extends VectorLike, TLike extends CoordinateLike<T>> extends AbstractMathObject<TLike> {
    protected _origin: T;
    protected _dx: T;
    protected _dy: T;

    constructor(origin: T, dx: T, dy: T) {
        super();
        this._origin = origin;
        this._dx = dx;
        this._dy = dy;
    }

    set(origin: T, dx: T, dy: T): this {
        this._origin.copy(origin);
        this._dx.copy(dx);
        this._dy.copy(dy);
        return this;
    }

    /**
     * 获取原点
     */
    get origin(): T {
        return this._origin.clone();
    }

    /**
     * 获取X轴方向向量
     */
    get dx(): T {
        return this._dx.clone();
    }

    /**
     * 获取Y轴方向向量
     */
    get dy(): T {
        return this._dy.clone();
    }

    /**
     * 设置原点
     */
    set origin(origin: T) {
        this._origin.copy(origin);
        this.orthogonalize();
    }

    /**
     * 设置X轴方向向量
     */
    set dx(dx: T) {
        this._dx.copy(dx);
        this.orthogonalize();
    }

    /**
     * 设置Y轴方向向量
     */
    set dy(dy: T) {
        this._dy.copy(dy);
        this.orthogonalize();
    }


    copy(source: TLike): this {
        this._origin.copy(source.origin);
        this._dx.copy(source.dx);
        this._dy.copy(source.dy);
        this.orthogonalize();
        return this;
    }

    translate(vector: T): this { 
        this._origin.add(vector);
        return this;
    }

    /**
     * 克隆坐标系
     */
    abstract clone(): Coordinate<T, TLike>;

    /**
     * 正交化坐标系
     */
    abstract orthogonalize(): this;

    /**
     * 检查是否为左手系
     */
    abstract isLeftHanded(eps?: number): boolean;

    /**
     * 世界坐标转本地坐标
     */
    abstract worldToLocal(worldPoint: T): T;

    /**
     * 本地坐标转世界坐标
     */
    abstract localToWorld(localPoint: T): T;

    /**
     * 世界向量转本地向量
     */
    abstract worldVectorToLocal(worldVector: T): T;

    /**
     * 本地向量转世界向量
     */
    abstract localVectorToWorld(localVector: T): T;

    /**
     * 比较两个坐标系是否相等
     */
    abstract equals(coordinate: TLike, eps?: number): boolean;
}

export { Coordinate, CoordinateLike };