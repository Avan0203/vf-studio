/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-03 17:24:23
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-22 14:36:31
 * @FilePath: \vf-studio\packages\vf-core\src\element\GraphicElement.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Element } from './Element';
import { GNode } from '../nodes/GNode';
class GraphicElement extends Element {
    protected visible = true;
    private gnode: GNode | null = null;
    setVisible(visible: boolean) {
        this.visible = visible;
    }
    isVisible(): boolean {
        return this.visible;
    }
    isGraphical(): boolean {
        return true;
    }

    setGNode(node: GNode | null) {
        this.gnode = node;
        this.needsUpdate = true;
    }

    getGNode(): GNode | null {
        return this.gnode;
    }
}

export { GraphicElement }