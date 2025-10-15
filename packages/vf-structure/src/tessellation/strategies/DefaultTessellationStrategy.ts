/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-14 16:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-14 16:36:46
 * @FilePath: \vf-studio\packages\vf-structure\src\tessellation\strategies\DefaultTessellationStrategy.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Surface, Vector2 } from '@vf/math';
import { TessellationParams, SurfaceMeshData } from '../../types';

/**
 * 曲面细分策略接口
 */
export interface TessellationStrategy {
    /**
     * 细分曲面
     * @param surface 曲面对象
     * @param params 细分参数
     * @returns 网格数据
     */
    tessellate(surface: Surface, params: TessellationParams): SurfaceMeshData;
    
    /**
     * 检查是否支持该曲面类型
     * @param surface 曲面对象
     * @returns 是否支持
     */
    supports(surface: Surface): boolean;
}

/**
 * 默认曲面细分策略
 * 适用于大部分标准曲面
 */
export class DefaultTessellationStrategy implements TessellationStrategy {
    supports(surface: Surface): boolean {
        // 默认策略支持所有曲面
        return true;
    }

    tessellate(surface: Surface, params: TessellationParams): SurfaceMeshData {
        const positions: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];

        const bounds = surface.getUVBounds();
        const uMin = bounds.u.min;
        const uMax = bounds.u.max;
        const vMin = bounds.v.min;
        const vMax = bounds.v.max;

        // 生成顶点、法向量和UV坐标
        for (let j = 0; j <= params.vSegments; j++) {
            const v = vMin + (vMax - vMin) * (j / params.vSegments);
            
            for (let i = 0; i <= params.uSegments; i++) {
                const u = uMin + (uMax - uMin) * (i / params.uSegments);
                const uv = new Vector2(u, v);
                
                // 获取点坐标
                const point = surface.getPointAt(uv);
                positions.push(point.x, point.y, point.z);
                
                // 获取法向量
                const normal = surface.getNormalAt(uv);
                normals.push(normal.x, normal.y, normal.z);
                
                // UV坐标（归一化到 0-1）
                const normalizedU = i / params.uSegments;
                const normalizedV = j / params.vSegments;
                uvs.push(normalizedU, normalizedV);
            }
        }

        // 生成索引（三角形）
        for (let j = 0; j < params.vSegments; j++) {
            for (let i = 0; i < params.uSegments; i++) {
                const a = i + j * (params.uSegments + 1);
                const b = i + (j + 1) * (params.uSegments + 1);
                const c = (i + 1) + (j + 1) * (params.uSegments + 1);
                const d = (i + 1) + j * (params.uSegments + 1);

                // 每个四边形分成两个三角形
                indices.push(a, d, b);
                indices.push(b, d, c);
            }
        }

        return {
            positions,
            normals,
            uvs,
            indices
        };
    }
}
