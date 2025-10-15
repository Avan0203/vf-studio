/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-14 16:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-15 17:08:08
 * @FilePath: \vf-studio\packages\vf-structure\src\tessellation\strategies\SphereTessellationStrategy.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Surface, SphereSurface, Vector3, Vector2 } from '@vf/math';
import { TessellationParams, SurfaceMeshData } from '../../types';
import { DefaultTessellationStrategy, TessellationStrategy } from './DefaultTessellationStrategy';

/**
 * 球面细分策略
 * 支持闭合功能，可以生成上表面和下表面
 */
export class SphereTessellationStrategy implements TessellationStrategy {
    private defaultStrategy = new DefaultTessellationStrategy();

    supports(surface: Surface): boolean {
        return surface instanceof SphereSurface;
    }

    tessellate(surface: Surface, params: TessellationParams): SurfaceMeshData {
        if (!(surface instanceof SphereSurface)) {
            throw new Error('SphereTessellationStrategy only supports SphereSurface');
        }

        // 首先生成球面网格
        const sphereMesh = this.defaultStrategy.tessellate(surface, params);

        if (!params.isClosed) {
            // 如果不闭合，直接返回球面网格
            return sphereMesh;
        }

        // 生成闭合表面
        return this.generateClosedSphere(surface, params, sphereMesh);
    }

    private generateClosedSphere(
        sphere: SphereSurface,
        params: TessellationParams,
        sphereMesh: SurfaceMeshData
    ): SurfaceMeshData {
        const positions = [...sphereMesh.positions];
        const normals = [...sphereMesh.normals];
        const uvs = [...sphereMesh.uvs];
        const indices = [...sphereMesh.indices];

        const bounds = sphere.getUVBounds();
        const vMin = bounds.v.min;
        const vMax = bounds.v.max;

        // 检查是否需要生成下表面（南极点）
        if (vMax >= Math.PI) {
            console.log('生成下表面');
            this.generateBottomCap(sphere, params, positions, normals, uvs, indices);
        }

        // 检查是否需要生成上表面（北极点）
        if (vMin <= 0) {
            console.log('生成上表面');
            this.generateTopCap(sphere, params, positions, normals, uvs, indices);
        }

        return { positions, normals, uvs, indices };
    }

    private generateBottomCap(
        sphere: SphereSurface,
        params: TessellationParams,
        positions: number[],
        normals: number[],
        uvs: number[],
        indices: number[]
    ): void {
        const center = sphere.getCenter();
        const radius = sphere.getRadius();

        // 南极点
        const southPole = center.clone().add(new Vector3(0, 0, -radius));
        const southNormal = new Vector3(0, 0, -1);

        // 添加南极点
        positions.push(southPole.x, southPole.y, southPole.z);
        normals.push(southNormal.x, southNormal.y, southNormal.z);
        uvs.push(0.5, 1);

        const poleIndex = positions.length / 3 - 1;

        // 生成南极圆周上的点
        const capIndices: number[] = [];
        for (let i = 0; i <= params.uSegments; i++) {
            const u = (i / params.uSegments) * 2 * Math.PI;
            const v = Math.PI; // 南极点
            const uv = new Vector2(u, v);
            const point = sphere.getPointAt(uv);

            positions.push(point.x, point.y, point.z);
            normals.push(southNormal.x, southNormal.y, southNormal.z);

            // UV 坐标
            const normalizedU = i / params.uSegments;
            uvs.push(normalizedU, 1);

            capIndices.push(positions.length / 3 - 1);
        }

        // 生成南极三角形
        for (let i = 0; i < params.uSegments; i++) {
            const current = capIndices[i];
            const next = capIndices[i + 1];

            // 南极三角形
            indices.push(poleIndex, next, current);
        }
    }

    private generateTopCap(
        sphere: SphereSurface,
        params: TessellationParams,
        positions: number[],
        normals: number[],
        uvs: number[],
        indices: number[]
    ): void {
        const center = sphere.getCenter();
        const radius = sphere.getRadius();

        // 北极点
        const northPole = center.clone().add(new Vector3(0, 0, radius));
        const northNormal = new Vector3(0, 0, 1);

        // 添加北极点
        positions.push(northPole.x, northPole.y, northPole.z);
        normals.push(northNormal.x, northNormal.y, northNormal.z);
        uvs.push(0.5, 0);

        const poleIndex = positions.length / 3 - 1;

        // 生成北极圆周上的点
        const capIndices: number[] = [];
        for (let i = 0; i <= params.uSegments; i++) {
            const u = (i / params.uSegments) * 2 * Math.PI;
            const v = 0; // 北极点
            const uv = new Vector2(u, v);
            const point = sphere.getPointAt(uv);

            positions.push(point.x, point.y, point.z);
            normals.push(northNormal.x, northNormal.y, northNormal.z);

            // UV 坐标
            const normalizedU = i / params.uSegments;
            uvs.push(normalizedU, 0);

            capIndices.push(positions.length / 3 - 1);
        }

        // 生成北极三角形
        for (let i = 0; i < params.uSegments; i++) {
            const current = capIndices[i];
            const next = capIndices[i + 1];

            // 北极三角形
            indices.push(poleIndex, current, next);
        }
    }
}
