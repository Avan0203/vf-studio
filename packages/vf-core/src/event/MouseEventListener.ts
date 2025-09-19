/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-09 23:44:17
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-19 15:06:07
 * @FilePath: \vf-studio\packages\vf-core\src\event\MouseEventListener.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { EventType } from "../types";
import { EventListener } from "./EventListener";

class MouseEventListener extends EventListener{

  constructor(private canvas: HTMLCanvasElement) {
    super();
  }

  public attach() {
    this.canvas.addEventListener("mousedown", this._onMouseDown);
    this.canvas.addEventListener("mousemove", this._onMouseMove);
    this.canvas.addEventListener("mouseup", this._onMouseUp);
    this.canvas.addEventListener("click", this._onClick);
    this.canvas.addEventListener("dblclick", this._onDblClick);
    this.canvas.addEventListener("contextmenu", this._onContextMenu);
    this.canvas.addEventListener("wheel", this._onWheel);
  }

  public detach() {
    this.canvas.removeEventListener("mousedown", this._onMouseDown);
    this.canvas.removeEventListener("mousemove", this._onMouseMove);
    this.canvas.removeEventListener("mouseup", this._onMouseUp);
    this.canvas.removeEventListener("click", this._onClick);
    this.canvas.removeEventListener("dblclick", this._onDblClick);
    this.canvas.removeEventListener("contextmenu", this._onContextMenu);
    this.canvas.removeEventListener("wheel", this._onWheel);
  }

  private _onMouseDown = (e: MouseEvent) => {
    this.emit(EventType.PointerDown, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onMouseMove = (e: MouseEvent) => {
    this.emit(EventType.PointerMove, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onMouseUp = (e: MouseEvent) => {
    this.emit(EventType.PointerUp, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onClick = (e: MouseEvent) => {
    this.emit(EventType.Click, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onDblClick = (e: MouseEvent) => {
    this.emit(EventType.DblClick, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    this.emit(EventType.ContextMenu, { x: e.offsetX, y: e.offsetY, button: e.button });
  };

  private _onWheel = (e: WheelEvent) => {
    this.emit(EventType.Wheel, { x: e.offsetX, y: e.offsetY, delta: e.deltaY });
  };
}

export { MouseEventListener }