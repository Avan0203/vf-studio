/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-08 10:15:25
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-08 11:25:09
 * @FilePath: \vf-studio\packages\vf-core\src\event\EventEmitter.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
// 通用事件系统
export class EventEmitter<E extends Record<string, any>> {
  private listeners: { [K in keyof E]?: Set<(payload: E[K]) => void> } = {};

  on<K extends keyof E>(event: K, handler: (payload: E[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    this.listeners[event]!.add(handler);
  }

  off<K extends keyof E>(event: K, handler: (payload: E[K]) => void): void {
    this.listeners[event]?.delete(handler);
  }

  emit<K extends keyof E>(event: K, payload: E[K]): void {
    this.listeners[event]?.forEach((h) => h(payload));
  }

  clear<K extends keyof E>(event?: K): void {
    if (event) {
      this.listeners[event]?.clear();
    } else {
      (Object.keys(this.listeners) as (keyof E)[]).forEach((k) =>
        this.listeners[k]?.clear()
      );
    }
  }
}