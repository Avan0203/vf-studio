/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-23 13:48:51
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-23 16:38:45
 * @FilePath: \vf-studio\packages\vf-structure\src\virtual\VirtualGeometry.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import defu from "defu";
import { Base } from "@vf/core";

abstract class VirtualGeometry<T extends object = object> extends Base {
    protected params: T;
    protected dirty = false;
    constructor(params: Partial<T> = {}) {
        super();
        this.params = defu({} as T, params as T);
    }

    setParameters(params: Partial<T>): this {
        this.params = defu(this.params, params as T);
        this.markDirty();
        return this;
    }

    getParameters(): Readonly<T> {
        return { ...this.params } as Readonly<T>;
    }

    markDirty(): void {
        this.dirty = true;
    }

    isDirty(): boolean {
        return this.dirty;
    }

    clearDirty(): void {
        this.dirty = false;
    }

    serialize(): { type: string, value: T } {
        return {
            type: this.type,
            value: { ...this.params }
        }
    }

    deserialize(data: Partial<T>): this {
        this.params = defu(this.params, data as T);
        return this;
    }

    hashCode(): string {
        let hash = this.type;
        for (const key in this.params) {
            hash += key + `-${key}:${this.params[key]}`;
        }
        return hash;
    }
}

export { VirtualGeometry }
