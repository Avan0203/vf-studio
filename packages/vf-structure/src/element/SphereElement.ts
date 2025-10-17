/*
import { VIRTUAL_GEOMETRY_FACTORY } from "../virtual"; * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-16 10:59:31
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-16 11:28:36
 * @FilePath: \vf-studio\packages\vf-structure\src\element\SphereElement.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { GraphicElement } from "@vf/core";
import { SphereParams, VirtualSphere } from "../virtual";

class SphereElement extends GraphicElement {
    private virtual = new VirtualSphere();
    setParameters(params: Partial<SphereParams>): void {
        this.virtual.setParameters(params);
        
    }

    toRenderNode() { 
        
    }
}

export { SphereElement };