/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-11 15:51:51
 * @FilePath: \vf-studio\packages\vf-structure\src\virtual\VirtualTorus.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { VirtualGeometry } from "./VirtualGeometry";

// 圆环参数接口
export interface TorusParams {
    radius: number;
    tube: number;
    radialSegments: number;
    tubularSegments: number;
}

const defaultParams: TorusParams = {
    radius: 1.0,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6
}

// 虚拟圆环几何体
export class VirtualTorus extends VirtualGeometry<TorusParams> {
    
    constructor(params: Partial<TorusParams> = defaultParams) {
        super(params);
    }
    
    public get radius(): number {
        return this.params.radius;
    }
    public get tube(): number {
        return this.params.tube;
    }
    public get radialSegments(): number {
        return this.params.radialSegments;
    }
    public get tubularSegments(): number {
        return this.params.tubularSegments;
    }
    public set radius(radius: number) {
        this.params.radius = radius;
    }
    public set tube(tube: number) {
        this.params.tube = tube;
    }
    public set radialSegments(radialSegments: number) {
        this.params.radialSegments = radialSegments;
    }
    public set tubularSegments(tubularSegments: number) {
        this.params.tubularSegments = tubularSegments;
    }
}
