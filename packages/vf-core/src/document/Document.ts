/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-02 17:12:56
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-03 17:42:44
 * @FilePath: \vf-studio\packages\vf-core\src\Document\document.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { ElementClass, IDocument, IElement } from "../types";

class Document implements IDocument {
    constructor() { }

    public create<T extends IElement>(elementClass: ElementClass<T>): T {
        return new elementClass(this);
    }
}

export { Document }
