/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-02 17:12:56
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-16 15:10:19
 * @FilePath: \vf-studio\packages\vf-core\src\document\Document.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { ElementManager, GraphicElement } from "../element";
import { ElementClass, ObjectID, IDocument, IElement, CacheType } from "../types";
import { ChangeCache } from "./ChangeCache";

class Document implements IDocument {
    private elementManager = new ElementManager();
    protected changeCache = new ChangeCache();
    private rootElement: GraphicElement;
    constructor() {
        this.rootElement = new GraphicElement(this);
    }

    public getRoot(): GraphicElement {
        return this.rootElement;
    }

    public setChangeCache(type: CacheType, element: IElement[]) {
        this.changeCache.addCache(type, element);
    }

    public getChangeCache() {
        return this.changeCache.getCache();
    }

    public clearChangeCache() {
        this.changeCache.clear();
    }

    public create<T extends IElement>(elementClass: ElementClass<T>): T {
        const element = new elementClass(this);
        this.elementManager.addElement(element);
        element.setParent(null);
        this.setChangeCache(CacheType.ADD, [element]);
        return element;
    }

    public delete(element: IElement): void {
        this.deleteElementById([element.id]);
    }

    public deleteElementById(ids: ObjectID[]): void {
        for (const id of ids) {
            const root = this.rootElement;
            const elem = this.elementManager.getElementById(id);
            if (!elem) continue;

            // 1) 计算需要删除的整棵子树（含自身）
            const subtree = [elem, ...this.getAllChildren(id)];

            // 2) 先记录变更缓存（在真正删除前保留可用的引用与 id）
            this.setChangeCache(CacheType.REMOVE, subtree);

            // 3) 从父节点解绑（或从根解绑）
            for (const node of subtree) {
                const parent = node.getParent();
                if (parent) {
                    const list = (parent as any).children as ObjectID[];
                    const idx = list.indexOf(node.id);
                    if (idx !== -1) list.splice(idx, 1);
                } else {
                    const rootChildren = (root as any).children as ObjectID[];
                    const idx = rootChildren.indexOf(node.id);
                    if (idx !== -1) rootChildren.splice(idx, 1);
                }
            }

            // 4) 真正从管理器中删除
            for (const node of subtree) {
                this.elementManager.deleteElementById(node.id);
            }
        }
    }

    public getGraphicElements(): IElement[] {
        const elements: IElement[] = [];
        const root = this.rootElement;

        this.elementManager.traverse(this.rootElement.id, (element) => {
            if (element.isGraphical()) {
                elements.push(element)
            }
        })
        return elements;
    }

    public getElementById(id: ObjectID): IElement | null {
        return this.elementManager.getElementById(id);
    }

    public getElementsByIds(ids: ObjectID[]): Array<IElement> {
        return this.elementManager.getElementsByIds(ids);
    }

    public getAllChildren(id: ObjectID): IElement[] {
        return this.elementManager.getAllChildren(id);
    }

    public getElementsByClass<T extends IElement>(cls: ElementClass<T>): T[] {
        return this.elementManager.getElementsByClass(cls);
    }
}

export { Document }
