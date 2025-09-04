/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:15:03
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-04 17:45:52
 * @FilePath: \vf-studio\packages\vf-core\src\element\Element.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Document } from "../document/Document";
import { ElementID, IElement } from "../types";

class Element implements IElement {
    name = ''
    id = ElementID.INVALID
    _parent = ElementID.INVALID
    _children: ElementID[] = []
    constructor(private document: Document) {
        this.id = ElementID.generate();
    }

    isGraphical(): boolean {
        return false;
    }

    getParent(): IElement | null {
        return this.document.elementManager.getElementParent(this.id);
    }

    setParent(parent: IElement | null): void {
        const oldParent = this.getParent();
        if (oldParent) {
            oldParent.remove(this);
        }
        if (parent) {
            this._parent = parent.id;
        }else{
            this._parent = ElementID.INVALID;
        }
    }

    getChildren(): IElement[] {
        return this.document.elementManager.getElementChildren(this.id);
    }

    add(child: IElement) {
        this._children.push(child.id);
        child.setParent(this);
    }

    remove(child: IElement) {
        const index = this._children.indexOf(child.id);
        if (index !== -1) {
            this._children.splice(index, 1);
        }
    }

    getAllChildren(): IElement[] {
        return this.document.elementManager.getAllElements(this.id);
    }
}

export { Element }