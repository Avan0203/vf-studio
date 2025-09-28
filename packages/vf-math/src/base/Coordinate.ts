/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-28 09:42:20
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-28 14:14:43
 * @FilePath: \vf-studio\packages\vf-math\src\base\Coordinate.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { AbstractMathObject } from "./AbstractMathObject";
import { Vector, VectorLike } from "./Vector";

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

    /**
     * 获取原点
     */
    getOrigin(): T {
        return this._origin.clone();
    }

    /**
     * 获取X轴方向向量
     */
    getDx(): T {
        return this._dx.clone();
    }

    /**
     * 获取Y轴方向向量
     */
    getDy(): T {
        return this._dy.clone();
    }

    /**
     * 设置原点
     */
    setOrigin(origin: T): this {
        this._origin.copy(origin);
        this.update();
        return this;
    }
    
    /**
     * 设置X轴方向向量
     */
    setDx(dx: T): this {
        this._dx.copy(dx);
        this.update();
        return this;
    }
    
    /**
     * 设置Y轴方向向量
     */
    setDy(dy: T): this {
        this._dy.copy(dy);
        this.update();
        return this;
    }

    /**
     * 复制坐标系
     */
    copy(source: TLike): this {
        this._origin.copy(source.origin);
        this._dx.copy(source.dx);
        this._dy.copy(source.dy);
        this.update();
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
     * 平移坐标系
     */
    abstract translate(translation: T): this;

    /**
     * 比较两个坐标系是否相等
     */
    abstract equals(coordinate: TLike, eps?: number): boolean;

    /**
     * 更新坐标系（子类实现）
     */
    protected abstract update(): void;
}

export { Coordinate, CoordinateLike };