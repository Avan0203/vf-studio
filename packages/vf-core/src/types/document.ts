/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-03 17:34:05
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-05 11:24:08
 * @FilePath: \vf-studio\packages\vf-core\src\types\document.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { ElementClass, IElement, ObjectID } from ".";

interface IDocument {
    create<T extends IElement>(elementClass: ElementClass<T>): T;
    delete(element: IElement): void;
    deleteElementById(id:ObjectID ): void;
    getElementById(id: ObjectID): IElement | null;
    getElementsByIds(ids: ObjectID[]): Array<IElement>;
    getAllChildren(id: ObjectID): IElement[];
    getElementsByClass<T extends IElement>(cls: ElementClass<T>): T[];
}

export { IDocument }
