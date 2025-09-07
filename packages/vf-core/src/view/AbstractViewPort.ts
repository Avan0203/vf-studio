/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-05 16:31:52
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-05 17:15:19
 * @FilePath: \vf-studio\packages\vf-core\src\view\AbstractViewPort.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { IViewPort, IDocument, ViewPortEvent } from "../types";

abstract class AbstractViewPort implements IViewPort {

    protected eventMap = new Map<string, Set<(e: ViewPortEvent) => void>>();

    constructor() {
    }

    update(): void {
        throw new Error("Method not implemented.");
    }

    dispose(): void {
   
    }

    on(event: string, handler: (e: ViewPortEvent) => void): void {
        const handlers = this.eventMap.get(event);
        if (handlers) {
            handlers.add(handler);
        } else {
            this.eventMap.set(event, new Set([handler]));
        }
    }

    off(event: string, handler: (e: ViewPortEvent) => void): void {
        const handlers = this.eventMap.get(event);
        if (handlers) {
            handlers.delete(handler);
        }
        if (handlers?.size === 0) {
            this.eventMap.delete(event);
        }
    }

    resize(width: number, height: number): void {
        throw new Error("Method not implemented.");
    }

}

export { AbstractViewPort }