/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-11
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-13 14:36:49
 * @FilePath: \vf-studio\packages\vf-math\src\geometry\surface\SurfaceMesh.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Vector2, Vector3 } from "../../base";
import { Surface } from "./Surface";

/**
 * 曲面网格数据
 */
export interface SurfaceMeshData {
    positions: number[];    // 顶点位置 [x, y, z, x, y, z, ...]
    normals: number[];      // 法向量 [nx, ny, nz, nx, ny, nz, ...]
    uvs: number[];          // UV坐标 [u, v, u, v, ...]
    indices: number[];      // 索引 [i0, i1, i2, i0, i1, i2, ...]
}

/**
 * 将曲面细分成网格
 * @param surface 曲面对象
 * @param uSegments U方向的细分数
 * @param vSegments V方向的细分数
 * @returns 网格数据
 */
export function subdivideSurface(
    surface: Surface,
    uSegments: number,
    vSegments: number
): SurfaceMeshData {
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
    for (let j = 0; j <= vSegments; j++) {
        const v = vMin + (vMax - vMin) * (j / vSegments);
        
        for (let i = 0; i <= uSegments; i++) {
            const u = uMin + (uMax - uMin) * (i / uSegments);
            const uv = new Vector2(u, v);
            
            // 获取点坐标
            const point = surface.getPointAt(uv);
            positions.push(point.x, point.y, point.z);
            
            // 获取法向量
            const normal = surface.getNormalAt(uv);
            normals.push(normal.x, normal.y, normal.z);
            
            // UV坐标（归一化到 0-1）
            const normalizedU = i / uSegments;
            const normalizedV = j / vSegments;
            uvs.push(normalizedU, normalizedV);
        }
    }

    // 生成索引（三角形）
    for (let j = 0; j < vSegments; j++) {
        for (let i = 0; i < uSegments; i++) {
            const a = i + j * (uSegments + 1);
            const b = i + (j + 1) * (uSegments + 1);
            const c = (i + 1) + (j + 1) * (uSegments + 1);
            const d = (i + 1) + j * (uSegments + 1);

            // 每个四边形分成两个三角形
            // 反转绕序以配合 V 方向反转后的顶点顺序
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

