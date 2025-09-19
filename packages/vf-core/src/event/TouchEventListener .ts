/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-08 15:30:21
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-19 15:03:38
 * @FilePath: \vf-studio\packages\vf-core\src\event\TouchEventListener .ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { EventType } from "../types";
import { EventListener } from "./EventListener";

class TouchEventListener extends EventListener {

  constructor(private canvas: HTMLCanvasElement) {
    super();
  }

  public attach() {
    this.canvas.addEventListener("touchstart", this._onTouchStart);
    this.canvas.addEventListener("touchmove", this._onTouchMove);
    this.canvas.addEventListener("touchend", this._onTouchEnd);
    this.canvas.addEventListener("touchcancel", this._onTouchCancel);
  }

  public detach() {
    this.canvas.removeEventListener("touchstart", this._onTouchStart);
    this.canvas.removeEventListener("touchmove", this._onTouchMove);
    this.canvas.removeEventListener("touchend", this._onTouchEnd);
    this.canvas.removeEventListener("touchcancel", this._onTouchCancel);
  }

  private _getPos(e: TouchEvent) {
    const t = e.touches[0] || e.changedTouches[0];
    const rect = this.canvas.getBoundingClientRect();
    return { x: t.clientX - rect.left, y: t.clientY - rect.top, button: 0 };
  }

  private _onTouchStart = (e: TouchEvent) => {
    const pos = this._getPos(e);
    this.emit(EventType.PointerDown, pos);
  };
  private _onTouchMove = (e: TouchEvent) => {
    const pos = this._getPos(e);
    this.emit(EventType.PointerMove, pos);
  };
  private _onTouchEnd = (e: TouchEvent) => {
    const pos = this._getPos(e);
    this.emit(EventType.PointerUp, pos);
    this.emit(EventType.Click, pos); // touchend 默认触发 click
  };
  private _onTouchCancel = (e: TouchEvent) => {
    const pos = this._getPos(e);
    this.emit(EventType.PointerUp, pos);
  };
}

export { TouchEventListener }