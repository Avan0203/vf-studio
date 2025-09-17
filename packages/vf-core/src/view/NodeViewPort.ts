/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 17:39:30
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-17 17:56:34
 * @FilePath: \vf-studio\packages\vf-core\src\view\NodeViewPort.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { IViewPort } from "../types";
import { EventEmitter } from "../event/EventEmitter";

class NodeViewPort extends EventEmitter<{}> implements IViewPort {
    width: number;
    height: number;
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
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


    dispose(): void {

    }
}

export { NodeViewPort }