/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-24 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 11:00:00
 * @FilePath: \vf-studio\packages\vf-engine\src\node\RenderLine.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { RenderNode, RenderNodeType } from './RenderNode';

class RenderLine extends RenderNode {
    constructor(elementId: number) {
        super(elementId);
    }
    
    getType(): RenderNodeType {
        return RenderNodeType.LINE;
    }
}

export { RenderLine };
