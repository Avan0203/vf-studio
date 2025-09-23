/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-09 15:26:15
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 15:46:03
 * @FilePath: \vf-studio\packages\vf-core\src\base\Base.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { IBase } from "../types";
import { ObjectID } from "./ObjectID";

abstract class Base implements IBase {
    id = ObjectID.generate();
    name = '';
    readonly type: string;
    constructor() {
        this.type = (new.target as { new(...args: any[]): any; name: string }).name;
    }

    copy(source: this): this {
        return this
    }
    
    clone(): IBase {
        return new (this.constructor as { new(...args: any[]):any })().copy(this);
    }
}

export { Base }
