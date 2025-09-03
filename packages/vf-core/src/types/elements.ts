/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-03 17:30:25
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-03 17:37:17
 * @FilePath: \vf-studio\packages\vf-core\src\types\elements.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Document } from "../document/Document";

interface IElement {
    name: string
    id: number
    getDocument(): Document
    isGraphical(): boolean
}

type ElementClass<T extends IElement> = {
    new(document: Document): T
};

export { IElement, ElementClass }