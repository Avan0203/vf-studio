/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:15:03
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-09 15:58:47
 * @FilePath: \vf-studio\packages\vf-core\src\element\Element.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Base, ObjectID } from "../base";
import { Document } from "../document/Document";
import { IDocument, IElement } from "../types";

class Element extends Base implements IElement  {
    protected parent = ObjectID.INVALID
    protected children: ObjectID[] = []
    constructor(private document: Document) {
        super();
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
            const index = this.document.root.findIndex((item) => item === this.id);
            if (index !== -1) {
                this.document.root.splice(index, 1);
            }
        }else{
            this.parent = ObjectID.INVALID;
            this.document.root.push(this.id);
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
        return this.document.getAllChildren(this.id);
    }

    getDocument(): IDocument {
        return this.document;
    }
}

export { Element }