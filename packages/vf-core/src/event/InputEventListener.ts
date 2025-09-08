/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-08 14:36:57
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-08 16:21:23
 * @FilePath: \vf-studio\packages\vf-core\src\event\InputEventListener.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserEvents, BrowserEventType } from '../types';
import { isMobile } from '../utils';
import { BrowserViewPort } from '../view';
import { EventEmitter } from './EventEmitter';
import { MouseEventListener } from "./MouseEventListener";
import { TouchEventListener } from "./TouchEventListener ";

const events = [
    BrowserEventType.PointerDown,
    BrowserEventType.PointerUp,
    BrowserEventType.PointerMove,
    BrowserEventType.Wheel,
    BrowserEventType.Click,
    BrowserEventType.DblClick,
    BrowserEventType.ContextMenu,
];

class InputEventListener extends EventEmitter<BrowserEvents> {
  private impl: MouseEventListener | TouchEventListener;

  constructor(private canvas: HTMLCanvasElement, private viewPort: BrowserViewPort) {
    super();
    // 简单判断移动端
    this.impl = isMobile() ? new TouchEventListener(canvas) : new MouseEventListener(canvas);

    // 代理事件
    events.forEach(event => {
      this.impl.on(event, (payload) => viewPort.emit(event, payload ));
    });
  }

  public attach() {
    this.impl.attach();
  }

  public detach() {
    this.impl.detach();
  }

  dispose() {
    this.impl.dispose();
    this.clear();
  }
}
export { InputEventListener }