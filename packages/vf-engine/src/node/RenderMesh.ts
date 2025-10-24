/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-24 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 11:00:00
 * @FilePath: \vf-studio\packages\vf-engine\src\node\RenderMesh.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { RenderNode, RenderNodeType } from './RenderNode';

class RenderMesh extends RenderNode {
    geometry: {
        vertices: Float32Array;
        indices: Uint32Array;
        normals: Float32Array;
        uvs: Float32Array;
    };
    style: any; // 暂时使用 any，避免循环依赖
    
    constructor(elementId: number) {
        super(elementId);
        this.style = {}; // 暂时使用空对象
        
        // 初始化空的几何数据
        this.geometry = {
            vertices: new Float32Array(0),
            indices: new Uint32Array(0),
            normals: new Float32Array(0),
            uvs: new Float32Array(0)
        };
    }
    
    getType(): RenderNodeType {
        return RenderNodeType.MESH;
    }
}

export { RenderMesh };
