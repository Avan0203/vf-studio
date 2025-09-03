/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:15:03
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-03 17:33:06
 * @FilePath: \vf-studio\packages\vf-core\src\element\Element.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { IDTool } from "../utils";
import { Document } from "../document/Document";
import { IElement } from "../types";

class Element implements IElement {
    name: string
    id: number
    constructor(private document: Document) {
        this.name = ''
        this.id = IDTool.get();
    }
    
    getDocument(): Document {
        return this.document;
    }
    isGraphical(): boolean {
        return false;
    }
}

export { Element }