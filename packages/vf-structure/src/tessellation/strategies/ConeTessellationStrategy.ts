/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-14 16:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-14 16:39:08
 * @FilePath: \vf-studio\packages\vf-structure\src\tessellation\strategies\ConeTessellationStrategy.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Surface, ConeSurface, Vector3, Vector2 } from '@vf/math';
import { TessellationParams, SurfaceMeshData } from '../types/TessellationParams';
import { TessellationStrategy } from './TessellationStrategy';
import { DefaultTessellationStrategy } from './DefaultTessellationStrategy';

/**
 * 圆锥面细分策略
 * 支持闭合功能，可以生成上表面和下表面
 */
export class ConeTessellationStrategy implements TessellationStrategy {
    private defaultStrategy = new DefaultTessellationStrategy();

    supports(surface: Surface): boolean {
        return surface instanceof ConeSurface;
    }

    tessellate(surface: Surface, params: TessellationParams): SurfaceMeshData {
        if (!(surface instanceof ConeSurface)) {
            throw new Error('ConeTessellationStrategy only supports ConeSurface');
        }

        // 首先生成侧面网格
        const sideMesh = this.defaultStrategy.tessellate(surface, params);

        if (!params.isClosed) {
            // 如果不闭合，直接返回侧面网格
            return sideMesh;
        }

        // 生成闭合表面
        return this.generateClosedCone(surface, params, sideMesh);
    }

    private generateClosedCone(
        cone: ConeSurface,
        params: TessellationParams,
        sideMesh: SurfaceMeshData
    ): SurfaceMeshData {
        const positions = [...sideMesh.positions];
        const normals = [...sideMesh.normals];
        const uvs = [...sideMesh.uvs];
        const indices = [...sideMesh.indices];

        const bounds = cone.getUVBounds();
        const uMin = bounds.u.min;
        const uMax = bounds.u.max;
        const vMin = bounds.v.min;
        const vMax = bounds.v.max;

        // 检查是否需要生成底面（v=0）
        if (vMin <= 0) {
            this.generateBottomSurface(cone, params, uMin, uMax, positions, normals, uvs, indices);
        }

        // 检查是否需要生成顶面（在 vMax 高度处的圆面，用于圆台）
        if (vMax < 1 - 1e-6) {
            // 如果没有到达顶点，生成在 vMax 高度处的圆面（圆台）
            this.generateTopSurfaceAt(cone, params, uMin, uMax, vMax, positions, normals, uvs, indices);
        }
        // 如果 vMax >= 1，则圆锥延伸到顶点，不需要生成额外的圆面

        return { positions, normals, uvs, indices };
    }

    private generateBottomSurface(
        cone: ConeSurface,
        params: TessellationParams,
        uMin: number,
        uMax: number,
        positions: number[],
        normals: number[],
        uvs: number[],
        indices: number[]
    ): void {
        const radius = cone.getRadius();
        
        // 获取圆锥的坐标系，用于计算底面中心点和法向量
        const coordinate = cone.getCoordinate();
        const axis = coordinate.getNormal(); // 圆锥轴方向（z轴）
        
        // 底面中心点：坐标系的原点
        const bottomCenter = coordinate.origin.clone();
        
        // 底面法向量：与轴方向相反（向下）
        const bottomNormal = axis.clone().negate();
        
        // 添加底面中心点
        positions.push(bottomCenter.x, bottomCenter.y, bottomCenter.z);
        normals.push(bottomNormal.x, bottomNormal.y, bottomNormal.z);
        uvs.push(0.5, 0.5);
        
        const centerIndex = positions.length / 3 - 1;
        
        // 生成底面圆周上的点
        const bottomIndices: number[] = [];
        for (let i = 0; i <= params.uSegments; i++) {
            const u = uMin + (uMax - uMin) * (i / params.uSegments);
            const v = 0; // 底面处（新参数化：v=0对应底面，v=1对应顶点）
            const uv = new Vector2(u, v);
            const point = cone.getPointAt(uv);
            
            positions.push(point.x, point.y, point.z);
            normals.push(bottomNormal.x, bottomNormal.y, bottomNormal.z);
            
            // UV 坐标：从中心向外辐射
            const normalizedU = 0.5 + 0.5 * Math.cos(u);
            const normalizedV = 0.5 + 0.5 * Math.sin(u);
            uvs.push(normalizedU, normalizedV);
            
            bottomIndices.push(positions.length / 3 - 1);
        }
        
        // 生成底面三角形
        for (let i = 0; i < params.uSegments; i++) {
            const current = bottomIndices[i];
            const next = bottomIndices[i + 1];
            
            // 底面三角形（注意绕序，确保法向量向外）
            indices.push(centerIndex, next, current);
        }
    }

    private generateTopSurfaceAt(
        cone: ConeSurface,
        params: TessellationParams,
        uMin: number,
        uMax: number,
        vMax: number,
        positions: number[],
        normals: number[],
        uvs: number[],
        indices: number[]
    ): void {
        // 获取圆锥的坐标系，用于计算顶面法向量
        const coordinate = cone.getCoordinate();
        const axis = coordinate.getNormal(); // 圆锥轴方向
        
        // 顶面法向量：与轴方向相同（向上）
        const topNormal = axis.clone();
        
        // 计算顶面中心点（在 vMax 高度处）
        const topCenter = cone.getPointAt(new Vector2(0, vMax));
        
        // 添加顶面中心点
        positions.push(topCenter.x, topCenter.y, topCenter.z);
        normals.push(topNormal.x, topNormal.y, topNormal.z);
        uvs.push(0.5, 0.5);
        
        const centerIndex = positions.length / 3 - 1;
        
        // 生成顶面圆周上的点（在 vMax 高度处）
        const topIndices: number[] = [];
        for (let i = 0; i <= params.uSegments; i++) {
            const u = uMin + (uMax - uMin) * (i / params.uSegments);
            const v = vMax;
            const uv = new Vector2(u, v);
            const point = cone.getPointAt(uv);
            
            positions.push(point.x, point.y, point.z);
            normals.push(topNormal.x, topNormal.y, topNormal.z);
            
            // UV 坐标：从中心向外辐射
            const normalizedU = 0.5 + 0.5 * Math.cos(u);
            const normalizedV = 0.5 + 0.5 * Math.sin(u);
            uvs.push(normalizedU, normalizedV);
            
            topIndices.push(positions.length / 3 - 1);
        }
        
        // 生成顶面三角形
        for (let i = 0; i < params.uSegments; i++) {
            const current = topIndices[i];
            const next = topIndices[i + 1];
            
            // 顶面三角形（注意绕序，确保法向量向外）
            indices.push(centerIndex, next, current);
        }
    }
}
