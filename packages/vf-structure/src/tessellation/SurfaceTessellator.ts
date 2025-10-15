/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-14 16:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-14 16:00:00
 * @FilePath: \vf-studio\packages\vf-structure\src\tessellation\SurfaceTessellator.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Surface } from '@vf/math';
import { TessellationStrategy } from './strategies/DefaultTessellationStrategy';
import { DefaultTessellationStrategy } from './strategies/DefaultTessellationStrategy';
import { ConeTessellationStrategy } from './strategies/ConeTessellationStrategy';
import { SphereTessellationStrategy } from './strategies/SphereTessellationStrategy';
import { TessellationParams, SurfaceMeshData } from '../types';

/**
 * 曲面细分器
 * 采用策略模式，根据不同的曲面类型调用相应的细分策略
 */
export class SurfaceTessellator {
    private strategies: Map<string, TessellationStrategy> = new Map();
    private defaultStrategy: TessellationStrategy;

    constructor() {
        // 初始化默认策略
        this.defaultStrategy = new DefaultTessellationStrategy();
        
        // 注册专门的策略
        this.registerStrategy('ConeSurface', new ConeTessellationStrategy());
        this.registerStrategy('SphereSurface', new SphereTessellationStrategy());
    }

    /**
     * 注册细分策略
     * @param surfaceType 曲面类型名称
     * @param strategy 细分策略
     */
    registerStrategy(surfaceType: string, strategy: TessellationStrategy): this {
        this.strategies.set(surfaceType, strategy);
        return this;
    }

    /**
     * 获取曲面类型名称
     * @param surface 曲面对象
     * @returns 曲面类型名称
     */
    private getSurfaceType(surface: Surface): string {
        return surface.constructor.name;
    }

    /**
     * 获取适合的细分策略
     * @param surface 曲面对象
     * @returns 细分策略
     */
    private getStrategy(surface: Surface): TessellationStrategy {
        const surfaceType = this.getSurfaceType(surface);
        const strategy = this.strategies.get(surfaceType);
        
        if (strategy && strategy.supports(surface)) {
            return strategy;
        }
        
        return this.defaultStrategy;
    }

    /**
     * 细分曲面
     * @param surface 曲面对象
     * @param params 细分参数
     * @returns 网格数据
     */
    tessellate(surface: Surface, params: TessellationParams): SurfaceMeshData {
        const strategy = this.getStrategy(surface);
        return strategy.tessellate(surface, params);
    }

    /**
     * 便捷方法：细分圆锥面（支持闭合）
     * @param surface 圆锥面对象
     * @param uSegments U方向细分数
     * @param vSegments V方向细分数
     * @param isClosed 是否闭合
     * @returns 网格数据
     */
    tessellateCone(surface: Surface, uSegments: number, vSegments: number, isClosed: boolean = false): SurfaceMeshData {
        return this.tessellate(surface, {
            uSegments,
            vSegments,
            isClosed
        });
    }

    /**
     * 便捷方法：细分球面（支持闭合）
     * @param surface 球面对象
     * @param uSegments U方向细分数
     * @param vSegments V方向细分数
     * @param isClosed 是否闭合
     * @returns 网格数据
     */
    tessellateSphere(surface: Surface, uSegments: number, vSegments: number, isClosed: boolean = false): SurfaceMeshData {
        return this.tessellate(surface, {
            uSegments,
            vSegments,
            isClosed
        });
    }

    /**
     * 获取所有已注册的策略类型
     * @returns 策略类型列表
     */
    getRegisteredStrategies(): string[] {
        return Array.from(this.strategies.keys());
    }

    /**
     * 检查是否支持指定曲面类型
     * @param surface 曲面对象
     * @returns 是否支持
     */
    supports(surface: Surface): boolean {
        const strategy = this.getStrategy(surface);
        return strategy.supports(surface);
    }
}
