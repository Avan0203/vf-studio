/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-05 17:39:30
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-08 11:12:26
 * @FilePath: \vf-studio\packages\vf-core\src\view\NodeViewPort.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { IViewPort } from "../types";
import { EventEmitter } from "../event/EventEmitter";

class NodeViewPort extends EventEmitter<{}> implements IViewPort {
    constructor() {
        super();
    }

    attach() { }

    update() {

    }

    resize(width: number, height: number): void {

    }

    dispose(): void {

    }
}

export { NodeViewPort }