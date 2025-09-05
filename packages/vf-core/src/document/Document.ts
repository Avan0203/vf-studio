/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:12:56
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-05 14:54:12
 * @FilePath: \vf-studio\packages\vf-core\src\Document\document.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { ElementManager } from "../element";
import { ElementClass, ElementID, IDocument, IElement } from "../types";

class Document implements IDocument {

    private elementManager = new ElementManager();
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

    public deleteElementById(id: ElementID): void {
        this.elementManager.deleteElementById(id);
    }

    public getElementById(id: ElementID): IElement | null {
        return this.elementManager.getElementById(id);
    }

    public getElementsByIds(ids: ElementID[]): Array<IElement> {
        return this.elementManager.getElementsByIds(ids);
    }

    public getAllElements(id: ElementID): IElement[] {
        return this.elementManager.getAllElements(id);
    }

    public getElementsByClass<T extends IElement>(cls: ElementClass<T>): T[] {
        return this.elementManager.getElementsByClass(cls);
    }
}

export { Document }
