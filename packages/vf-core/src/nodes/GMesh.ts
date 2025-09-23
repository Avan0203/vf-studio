/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-22 15:31:19
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 13:44:01
 * @FilePath: \vf-studio\packages\vf-core\src\nodes\GMesh.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { GNode } from "./GNode";
import { GNodeType } from "../types";

class GMesh<T extends object = any> extends GNode<T> {
    constructor(options: T = {} as T) {
        super(GNodeType.Mesh, options);
    }
}

export { GMesh }


