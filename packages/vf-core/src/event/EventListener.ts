/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-19 14:27:16
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-19 15:38:03
 * @FilePath: \vf-studio\packages\vf-core\src\event\EventListener.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { EventEmitter } from "../base";
import { ViewPortEvents } from "../types";

class EventListener<T = {}> extends EventEmitter<T & ViewPortEvents> {
    attach(): void {
    }
    detach(): void {
    }
    dispose(): void {
        this.detach();
        this.clear();
    }
}

export { EventListener }
