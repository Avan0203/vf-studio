/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-03 17:24:23
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-18 16:43:49
 * @FilePath: \vf-studio\packages\vf-core\src\element\GraphicElement.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
class GraphicElement extends Element {
    protected visible = true;
    setVisible(visible: boolean) {
        this.visible = visible;
    }
    isVisible(): boolean { 
        return this.visible;
    }
    isGraphical(): boolean {
        return true;
    }
}

export { GraphicElement }