/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:15:03
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-05 13:24:45
 * @FilePath: \vf-studio\packages\vf-core\src\element\Element.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Document } from "../document/Document";
import { ElementID, IElement } from "../types";

class Element implements IElement {
    name = ''
    id = ElementID.INVALID
    private parent = ElementID.INVALID
    private children: ElementID[] = []
    constructor(private document: Document) {
        this.id = ElementID.generate();
    }

    isGraphical(): boolean {
        return false;
    }

    getParent(): IElement | null {
        return this.document.getElementById(this.parent);
    }

    setParent(parent: IElement | null): void {
        const oldParent = this.getParent();
        if (oldParent) {
            oldParent.remove(this);
        }
        if (parent) {
            this.parent = parent.id;
        }else{
            this.parent = ElementID.INVALID;
        }
    }

    getChildren(): IElement[] {
        return this.document.getElementsByIds(this.children);
    }

    add(child: IElement) {
        this.children.push(child.id);
        child.setParent(this);
    }

    remove(child: IElement) {
        const index = this.children.indexOf(child.id);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    getAllChildren(): IElement[] {
        return this.document.getAllElements(this.id);
    }
}

export { Element }