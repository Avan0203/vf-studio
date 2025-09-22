/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-22 15:31:16
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-22 17:08:30
 * @FilePath: \vf-studio\packages\vf-core\src\nodes\GNode.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { defu } from "defu"
import { Base3D } from "../base/Base3D";
import { GNodeType } from "../types";

abstract class GNode<TOptions extends object = object> extends Base3D {
    protected options: TOptions;
    protected style: {} = {};
    parent?: GNode | null = null;
    constructor(type: GNodeType, options: TOptions = {} as TOptions) {
        super();
        this.baseType = type;
        this.options = options;
    }

    setStyle(style: {}): void {
        this.style = defu(this.style, style);
    }

    getStyle(): Readonly<{}> {
        return defu(this.parent ? this.parent.getStyle() : {}, this.style);
    }

    getOptions(): Readonly<TOptions> {
        return this.options;
    }

    setOptions(partial: Partial<TOptions>): void {
        this.options = Object.assign({}, this.options, partial);
    }
}

export { GNode }


