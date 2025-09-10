/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-03 17:30:25
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-09 16:01:49
 * @FilePath: \vf-studio\packages\vf-core\src\types\elements.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Document } from "../document/Document";
import { IDocument } from "./document";
import { IBase } from "./base";


interface IElement  extends IBase {
    getParent(): IElement | null,
    setParent(parent: IElement | null): void,
    getChildren(): Array<IElement>
    isGraphical(): boolean,
    add(child: IElement): void,
    remove(child: IElement): void,
    getAllChildren(): IElement[],
    getDocument(): IDocument
}

type ElementClass<T extends IElement> = {
    new(document: Document): T
};

export { IElement, ElementClass }