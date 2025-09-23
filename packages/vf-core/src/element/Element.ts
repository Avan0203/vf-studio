/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-02 17:15:03
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-22 14:40:19
 * @FilePath: \vf-studio\packages\vf-core\src\element\Element.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Base, ObjectID } from "../base";
import { Document } from "../document/Document";
import { CacheType, IDocument, IElement } from "../types";

class Element extends Base implements IElement  {
    protected parent = ObjectID.INVALID
    protected children: ObjectID[] = [];
    private _needUpdate = true;

    set needsUpdate(value: boolean) {
        this._needUpdate = value;
        if (value) {
            this.document.setChangeCache(CacheType.UPDATE, [this]);
        }
    }

    get needsUpdate(): boolean {
        return this._needUpdate;
    }

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
        // 1) 从旧父节点解绑（避免调用对方的公共 API 造成递归）
        if (oldParent) {
            const list = (oldParent as Element).children;
            const idx = list.indexOf(this.id);
            if (idx !== -1) list.splice(idx, 1);
        }

        // 2) 绑定到新父节点或根
        if (parent) {
            this.parent = parent.id;
            const parentChildren = (parent as Element).children;
            if (!parentChildren.includes(this.id)) parentChildren.push(this.id);
        } else {
            this.parent = ObjectID.INVALID;
            const rootChildren = (this.document.rootElement as Element).children;
            if (!rootChildren.includes(this.id)) rootChildren.push(this.id);
        }
    }

    getChildren(): IElement[] {
        return this.document.getElementsByIds(this.children);
    }

    add(child: IElement) {
        if (child.getParent() === this) return;
        child.setParent(this);
    }

    remove(child: IElement) {
        if (child.getParent() !== this) return;
        child.setParent(null);
    }

    getAllChildren(): IElement[] {
        return this.document.getAllChildren(this.id);
    }

    getDocument(): IDocument {
        return this.document;
    }

    serialize(): { type: string, value: any } {
        return { type: this.type, value: {} };
    }

    deserialize(data: any): this {
        return this;
    }
}

export { Element }