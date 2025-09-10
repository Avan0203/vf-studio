/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-08 09:17:29
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-08 15:58:37
 * @FilePath: \vf-studio\packages\vf-core\src\view\BrowserViewPort.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserEvents, BrowserEventType, IViewPort } from "../types";
import { EventEmitter } from "../event";
import { InputEventListener } from "../event/InputEventListener";

export class BrowserViewPort<T extends Record<string, any> = BrowserEvents> extends EventEmitter<T> implements IViewPort {
  private canvas: HTMLCanvasElement;
  private inputEventListener: InputEventListener;
  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.inputEventListener = new InputEventListener(canvas,this);

    this.canvas.addEventListener('contextlost', this._onContextLost.bind(this));
    this.canvas.addEventListener('contextrestored', this._onContextRestored.bind(this));
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  attach() {
    this.inputEventListener.attach();
  }

  detach() {
    this.inputEventListener.detach();
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  update() {
    // 浏览器里交给 WebGLRenderer 实现
  }

  private _onContextLost() {
    this.emit('contextlost', {} as T['contextlost']);
  }

  private _onContextRestored() {
    this.emit('contextrestored', {} as T['contextrestored']);
  }

  dispose() {
    this.canvas.removeEventListener('contextlost', this._onContextLost.bind(this));
    this.canvas.removeEventListener('contextrestored', this._onContextRestored.bind(this));
    this.detach();
  }
}
