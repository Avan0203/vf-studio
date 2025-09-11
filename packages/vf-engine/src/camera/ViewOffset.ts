/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-10 14:33:28
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-11 10:11:32
 * @FilePath: \vf-studio\packages\vf-engine\src\camera\ViewOffset.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { IViewOffset } from "../types";

class ViewOffset implements IViewOffset {
    enabled = false;
    width = 0
    height = 0;
    offsetX = 0;
    offsetY = 0;
    fullWidth = 0;
    fullHeight = 0;
    
    constructor(width = 1, height = 1, offsetX = 0, offsetY = 0, fullWidth = 1, fullHeight = 1) {
        this.set(width, height, offsetX, offsetY, fullWidth, fullHeight);
    }

    set(width: number, height: number, offsetX: number, offsetY: number, fullWidth: number, fullHeight: number): this {
        this.enabled = true;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.fullWidth = fullWidth;
        this.fullHeight = fullHeight;
        return this;
    }

    copy(source: this): this {
        this.enabled = source.enabled;
        this.width = source.width;
        this.height = source.height;
        this.offsetX = source.offsetX;
        this.offsetY = source.offsetY;
        this.fullWidth = source.fullWidth;
        this.fullHeight = source.fullHeight;
        return this;
    }

    clone(): ViewOffset {
        return new (this.constructor as { new(...args: any[]):any })().copy(this);
    }
}

export { ViewOffset }