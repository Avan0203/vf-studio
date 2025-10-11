/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-23 16:04:08
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-11 15:51:30
 * @FilePath: \vf-studio\packages\vf-structure\src\virtual\VirtualPlane.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { VirtualGeometry } from "./VirtualGeometry";

// 圆柱体参数接口
export interface PlaneParams {
    width: number;
    height: number;
}

const defaultParams: PlaneParams = {
    width: 1,
    height: 1
}

class VirtualPlane extends VirtualGeometry<PlaneParams> {    
    constructor(params: Partial<PlaneParams> = defaultParams) {
        super(params);
    }

    public get width(): number {
        return this.params.width;
    }
    public get height(): number {
        return this.params.height;
    }
    public set width(width: number) {
        this.params.width = width;
    }
    public set height(height: number) {
        this.params.height = height;
    }
}

export { VirtualPlane };