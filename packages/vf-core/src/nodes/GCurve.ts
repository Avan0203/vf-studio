/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-22 15:31:23
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-22 15:37:17
 * @FilePath: \vf-studio\packages\vf-core\src\graphicNode\GCurve.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { GNode } from "./GNode";
import { GCurveOptions, GNodeType } from "../types/nodes";

class GCurve extends GNode<GCurveOptions> {
    constructor(options: GCurveOptions = {}) {
        super(GNodeType.Curve, options);
    }
}

export { GCurve }


