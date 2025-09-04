/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:12:56
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-04 17:17:34
 * @FilePath: \vf-studio\packages\vf-core\src\Document\document.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { ElementManager } from "../element";
import { ElementClass, ElementID, IDocument, IElement } from "../types";

class Document implements IDocument {

    elementManager: ElementManager;
    constructor() {
        this.elementManager = new ElementManager();
    }


    public create<T extends IElement>(elementClass: ElementClass<T>): T {
        return new elementClass(this);
    }

    public getElementById(id: ElementID): IElement | null {
        return this.elementManager.getElementById(id);
    }
}

export { Document }
