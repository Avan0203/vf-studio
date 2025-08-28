/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-08-20 17:07:54
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-08-28 11:13:23
 * @FilePath: \vf-studio\packages\vf-math\src\base\AbstractMathObject.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
export interface DumpResult<T = any> {
    type: string;
    value: T;
}

export abstract class AbstractMathObject<T = any> {
    readonly type: string;
    constructor() {
        this.type = (new.target as { new(...args: any[]): any; name: string }).name;
    }
    set(..._: any[]) {
        return this;
    }
    clone() {
        return this.constructor();
    }

    copy(..._: any[]) {
        return this;
    }

    equals(..._: any[]) {
        return false;
    }

    load(..._: any[]) {
        return this;
    }

    dump(): DumpResult<T> {
        return { type: this.type, value: {} as T }
    }
}