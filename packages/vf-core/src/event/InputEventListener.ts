/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-08 14:36:57
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-12 17:27:09
 * @FilePath: \vf-studio\packages\vf-core\src\event\InputEventListener.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserEvents, BrowserEventType, PointEventPayload, ResizeEventPayload, WheelEventPayload } from '../types';
import { isMobile } from '../utils';
import { BrowserViewPort } from '../view';
import { EventEmitter } from './EventEmitter';
import { getObserverClasses } from './InputObserver';
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

const eventMap = {
  [BrowserEventType.PointerDown]: 'onPointerDown',
  [BrowserEventType.PointerUp]: 'onPointerUp',
  [BrowserEventType.PointerMove]: 'onPointerMove',
  [BrowserEventType.Wheel]: 'onWheel',
  [BrowserEventType.Click]: 'onClick',
  [BrowserEventType.DblClick]: 'onDblClick',
  [BrowserEventType.ContextMenu]: 'onContextMenu',
}


class InputEventListener extends EventEmitter<BrowserEvents> {
  private impl: MouseEventListener | TouchEventListener;

  constructor(private canvas: HTMLCanvasElement, private viewPort: BrowserViewPort) {
    super();
    // 简单判断移动端
    this.impl = isMobile() ? new TouchEventListener(canvas) : new MouseEventListener(canvas);
    this.unlock();
  }

  public lock() {
    this.impl.detach();
    this.stopListening();
  }

  public unlock() {
    this.impl.attach();
    this.startListening();
  }

  private async processEvent(payload: ResizeEventPayload | PointEventPayload | WheelEventPayload, event: BrowserEventType): Promise<void> {
    const observers = getObserverClasses();
    console.log('observers: ', observers);
    for (const observer of observers) {
      const result = await (observer as any)[(eventMap as any)[event]](payload);
      if (result) {
        break;
      }
    }
  }

  private startListening() {
    events.forEach(event => {
      this.impl.on(event, this.processEvent);
    });
  }

  private stopListening() {
    events.forEach(event => {
      this.impl.off(event, this.processEvent as (payload?: ResizeEventPayload | PointEventPayload | WheelEventPayload | undefined, event?: BrowserEventType | undefined) => void);
    });
  }

  dispose() {
    this.impl.dispose();
    this.clear();
  }
}
export { InputEventListener }