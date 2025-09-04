/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-03 17:34:05
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-03 17:34:31
 * @FilePath: \vf-studio\packages\vf-core\src\types\document.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { ElementClass, IElement } from ".";
import { ElementManager } from "../element"

interface IDocument {
    create<T extends IElement>(elementClass: ElementClass<T>): T;
}

export { IDocument }