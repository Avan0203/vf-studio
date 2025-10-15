/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-14 16:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-14 16:00:00
 * @FilePath: \vf-studio\packages\vf-structure\src\tessellation\types\TessellationParams.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

/**
 * 曲面细分参数
 */
export interface TessellationParams {
    /** U 方向细分数 */
    uSegments: number;
    /** V 方向细分数 */
    vSegments: number;
    /** 是否闭合曲面（生成上表面和下表面） */
    isClosed: boolean;
    /** 细分质量 */
    quality?: TessellationQuality;
    /** 最大偏差（用于自适应细分） */
    maxDeviation?: number;
}

/**
 * 细分质量枚举
 */
export enum TessellationQuality {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    ULTRA = 'ultra'
}

/**
 * 曲面网格数据
 */
export interface SurfaceMeshData {
    /** 顶点位置 [x, y, z, x, y, z, ...] */
    positions: number[];
    /** 法向量 [nx, ny, nz, nx, ny, nz, ...] */
    normals: number[];
    /** UV坐标 [u, v, u, v, ...] */
    uvs: number[];
    /** 索引 [i0, i1, i2, i0, i1, i2, ...] */
    indices: number[];
}
