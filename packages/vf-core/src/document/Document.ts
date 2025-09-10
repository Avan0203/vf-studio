/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-02 17:12:56
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-09 11:39:20
 * @FilePath: \vf-studio\packages\vf-core\src\Document\document.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { ElementManager } from "../element";
import { ElementClass, ObjectID, IDocument, IElement } from "../types";

class Document implements IDocument {
    private elementManager = new ElementManager();
    root:ObjectID[] = []
    constructor() {

    }

    public create<T extends IElement>(elementClass: ElementClass<T>): T {
        const element = new elementClass(this);
        this.elementManager.addElement(element);
        return element;
    }

    public delete(element: IElement): void {
        this.deleteElementById(element.id);
    }

    public deleteElementById(id: ObjectID): void {
        this.elementManager.deleteElementById(id);
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
