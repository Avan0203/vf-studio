/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-03 17:24:23
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 11:10:04
 * @FilePath: \vf-studio\packages\vf-core\src\element\GraphicElement.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Element } from './Element';
import { GGroup } from '../nodes';
class GraphicElement extends Element {
    protected visible = true;
    private gnode: GGroup = new GGroup();
    setVisible(visible: boolean) {
        this.visible = visible;
    }
    
    isVisible(): boolean {
        return this.visible;
    }

    isGraphical(): boolean {
        return true;
    }

    getGNode(): GGroup {
        return this.gnode;
    }
}

export { GraphicElement }