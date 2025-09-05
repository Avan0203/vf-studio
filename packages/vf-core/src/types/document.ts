/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-03 17:34:05
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-05 11:24:08
 * @FilePath: \vf-studio\packages\vf-core\src\types\document.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { ElementClass, ElementID, IElement } from ".";

interface IDocument {
    create<T extends IElement>(elementClass: ElementClass<T>): T;
    delete(element:IElement): void;
    deleteElementById(id: ElementID): void;
    getElementById(id: ElementID): IElement | null;
    getElementsByIds(ids: ElementID[]): Array<IElement>;
    getAllElements(id: ElementID): IElement[];
    getElementsByClass<T extends IElement>(cls: ElementClass<T>): T[];
}

export { IDocument }
