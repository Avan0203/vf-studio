/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 17:39:30
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-19 13:22:19
 * @FilePath: \vf-studio\packages\vf-core\src\view\NodeViewPort.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { IViewPort } from "../types";
import { EventEmitter } from "../base/EventEmitter";
import { ViewPort } from "./ViewPort";

class NodeViewPort extends ViewPort<{}> {
    constructor() {
        super();
    }

    attach() { }

    update() {

    }

    setSize(width: number, height: number): this {
        this.width = width;
        this.height = height;
        return this;
    }

    resize(width: number, height: number): this {
        return this;
    }

    getSize(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }
}

export { NodeViewPort }