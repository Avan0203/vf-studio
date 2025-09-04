/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-03 17:30:25
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-04 17:28:39
 * @FilePath: \vf-studio\packages\vf-core\src\types\elements.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Document } from "../document/Document";
import { ElementID } from "../element";


interface IElement {
    name: string
    id: ElementID
    _parent: ElementID,
    _children: ElementID[],
    getParent(): IElement | null,
    setParent(parent: IElement | null): void,
    getChildren(): Array<IElement>
    isGraphical(): boolean,
    add(child: IElement): void,
    remove(child: IElement): void,
    getAllChildren(): IElement[]
}

type ElementClass<T extends IElement> = {
    new(document: Document): T
};

export { IElement, ElementClass, ElementID }