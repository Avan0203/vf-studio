/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 15:55:44
 * @FilePath: \vf-studio\packages\vf-engine\src\geometry\VirtualBox.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { VirtualGeometry } from "./VirtualGeometry";

// 立方体参数接口
export interface BoxParams {
    width: number;
    height: number;
    depth: number;
}

const defaultParams: BoxParams = {
    width: 1.0,
    height: 1.0,
    depth: 1.0
}

// 虚拟立方体几何体
export class VirtualBox extends VirtualGeometry<BoxParams> {    
    constructor(params: Partial<BoxParams> = defaultParams) {
        super(params);
    }

    public get width(): number {
        return this.params.width;
    }
    public get height(): number {
        return this.params.height;
    }
    public get depth(): number {
        return this.params.depth;
    }

    public set width(width: number) {
        this.params.width = width;
    }
    public set height(height: number) {
        this.params.height = height;
    }
    public set depth(depth: number) {
        this.params.depth = depth;
    }
}


