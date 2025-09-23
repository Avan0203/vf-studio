/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 16:02:28
 * @FilePath: \vf-studio\packages\vf-engine\src\geometry\VirtualCylinder.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import defu from "defu";
import { VirtualGeometry } from "./VirtualGeometry";

// 圆柱体参数接口
export interface CylinderParams {
    radius: number;
    height: number;
    radialSegments: number;
}

const defaultParams: CylinderParams = {
    radius: 0.5,
    height: 1.0,
    radialSegments: 8
}

// 虚拟圆柱体几何体
export class VirtualCylinder extends VirtualGeometry<CylinderParams> {    
    constructor(params: Partial<CylinderParams> = {}) {
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
    public set radius(radius: number) {
        this.params.radius = radius;
    }
    public set height(height: number) {
        this.params.height = height;
    }
    public set radialSegments(radialSegments: number) {
        this.params.radialSegments = radialSegments;
    }

    public deserialize(data: Partial<CylinderParams>): this {
        this.params = defu(defaultParams, data);
        return this;
    }
}
