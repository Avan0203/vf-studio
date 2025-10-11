/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-22 15:31:19
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-11 16:06:20
 * @FilePath: \vf-studio\packages\vf-core\src\nodes\GMesh.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { GNode } from "./GNode";
import { GMeshOptions, GNodeType } from "../types";

class GMesh extends GNode<GMeshOptions> {
    constructor(options: GMeshOptions = { vertices: [] }) {
        super(GNodeType.Mesh, options);
    }
}

export { GMesh }


