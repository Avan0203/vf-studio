/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 15:59:18
 * @FilePath: \vf-studio\packages\vf-engine\src\geometry\VirtualCone.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import defu from "defu";
import { VirtualGeometry } from "./VirtualGeometry";

// 圆锥参数接口
export interface ConeParams {
    radius: number;
    height: number;
    radialSegments: number;
    openEnded: boolean;
}

const defaultParams: ConeParams = {
    radius: 0.5,
    height: 1.0,
    radialSegments: 8,
    openEnded: false
}

// 虚拟圆锥几何体
export class VirtualCone extends VirtualGeometry<ConeParams> {

    constructor(params: Partial<ConeParams> = defaultParams) {
        super(params);
    }
    public get radius(): number {
        return this.params.radius;
    }
    public get height(): number {
        return this.params.height;
    }
    public get radialSegments(): number {
        return this.params.radialSegments;
    }
    public get openEnded(): boolean {
        return this.params.openEnded;
    }
    public set radius(radius: number) {
        this.params.radius = radius;
    }
    public set height(height: number) {
        this.params.height = height;
    }
    public set radialSegments(radialSegments: number) {
        this.params.radialSegments = radialSegments;
    }
    public set openEnded(openEnded: boolean) {
        this.params.openEnded = openEnded;
    }


    public deserialize(data: Partial<ConeParams>): this {
        this.params = defu(defaultParams, data);
        return this;
    }
}
