/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-01-27 10:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 16:10:23
 * @FilePath: \vf-studio\packages\vf-engine\src\geometry\VirtualSphere.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { defu } from "defu";
import { VirtualGeometry } from "./VirtualGeometry";

// 球体参数接口
export interface SphereParams {
    radius: number;
}

const defaultParams: SphereParams = {
    radius: 0.5
}

// 虚拟球体几何体
export class VirtualSphere extends VirtualGeometry<SphereParams> {
    constructor(params: Partial<SphereParams> = defaultParams) {
        super(params);
    }

    public get radius(): number {
        return this.params.radius;
    }

    public set radius(radius: number) {
        this.params.radius = radius;
    }
    

    public deserialize(data: Partial<SphereParams>): this {
        this.params = defu(defaultParams, data);
        return this;
    }
}
