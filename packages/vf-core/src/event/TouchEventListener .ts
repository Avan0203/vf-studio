import { BrowserEvents, BrowserEventType } from "../types";
import { EventEmitter } from "./EventEmitter";

class TouchEventListener extends EventEmitter<BrowserEvents> {

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

  dispose() {
    this.detach();
    this.clear();
  }

  private _getPos(e: TouchEvent) {
    const t = e.touches[0] || e.changedTouches[0];
    const rect = this.canvas.getBoundingClientRect();
    return { x: t.clientX - rect.left, y: t.clientY - rect.top, button: 0 };
  }

  private _onTouchStart = (e: TouchEvent) => {
    const pos = this._getPos(e);
    this.emit(BrowserEventType.PointerDown, pos);
  };
  private _onTouchMove = (e: TouchEvent) => {
    const pos = this._getPos(e);
    this.emit(BrowserEventType.PointerMove, pos);
  };
  private _onTouchEnd = (e: TouchEvent) => {
    const pos = this._getPos(e);
    this.emit(BrowserEventType.PointerUp, pos);
    this.emit(BrowserEventType.Click, pos); // touchend 默认触发 click
  };
  private _onTouchCancel = (e: TouchEvent) => {
    const pos = this._getPos(e);
    this.emit(BrowserEventType.PointerUp, pos);
  };
}

export { TouchEventListener }