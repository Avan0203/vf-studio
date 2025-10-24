/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-24 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 11:00:00
 * @FilePath: \vf-studio\packages\vf-engine\src\node\RenderNode.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Matrix4 } from '@vf/math';

enum RenderNodeType {
    MESH = 'mesh',
    POINT = 'point',
    LINE = 'line',
    SPRITE = 'sprite'
}

abstract class RenderNode {
    elementId: number;
    transform: Matrix4;
    visible: boolean = true;
    
    constructor(elementId: number) {
        this.elementId = elementId;
        this.transform = new Matrix4();
    }
    
    abstract getType(): RenderNodeType;
}

export { RenderNode, RenderNodeType };