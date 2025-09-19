/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-08 09:17:29
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-19 16:13:13
 * @FilePath: \vf-studio\packages\vf-core\src\view\BrowserViewPort.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { EventType, IInputObserver, ViewPortEvents } from "../types";
import { BrowserInputDispatch } from "../input/BrowserInputDispatch";
import { ViewPort } from "./ViewPort";

type BrowserViewPortEvents = ViewPortEvents & {
  contextlost: null;
  contextrestored: null;
};

class BrowserViewPort extends ViewPort<BrowserViewPortEvents> {
  private canvas: HTMLCanvasElement;
  constructor(container: HTMLElement) {
    super();
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('role', 'view-port');
    container.appendChild(this.canvas);
    this.inputDispatch = new BrowserInputDispatch(this);

    this.canvas.addEventListener('contextlost', this._onContextLost.bind(this));
    this.canvas.addEventListener('contextrestored', this._onContextRestored.bind(this));

    this.setSize(container.clientWidth, container.clientHeight);
  }

  getSize(): { width: number; height: number } {
    return { width: this.canvas.width, height: this.canvas.height };
  }

  setSize(width: number, height: number): this {
    this.canvas.width = width;
    this.canvas.height = height;
    this.inputDispatch.getListener().emit(EventType.Resize, { width, height });
    return this;
  }

  resize(width: number, height: number): this {
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }


  private _onContextLost() {
    this.emit('contextlost', null);
  }

  private _onContextRestored() {
    this.emit('contextrestored', null);
  }

  html(): HTMLCanvasElement {
    return this.canvas;
  }

  dispose() {
    this.canvas.removeEventListener('contextlost', this._onContextLost.bind(this));
    this.canvas.removeEventListener('contextrestored', this._onContextRestored.bind(this));
    super.dispose();
  }
}

export { BrowserViewPort }
