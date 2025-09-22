/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-22 15:31:49
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-22 15:44:22
 * @FilePath: \vf-studio\packages\vf-core\src\nodes\GGroup.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { GNode } from "./GNode";
import { GNodeType } from "../types/nodes";

// Group allows only one-level children (handled by base GNode)
class GGroup extends GNode<Record<string, never>> {
    protected children: GNode[] = [];

    constructor() {
        super(GNodeType.Group, {});
    }

    add(child: GNode): void {
        if (this.children.includes(child)) return;
        this.children.push(child);
    }

    remove(child: GNode): void {
        const idx = this.children.indexOf(child);
        if (idx !== -1) this.children.splice(idx, 1);
    }
}

export { GGroup }


