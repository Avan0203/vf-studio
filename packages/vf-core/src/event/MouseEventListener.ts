import { BrowserEvents, BrowserEventType } from "../types";
import { EventEmitter } from "./EventEmitter";

class MouseEventListener extends EventEmitter<BrowserEvents> {

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
  }

  public detach() {
    this.canvas.removeEventListener("mousedown", this._onMouseDown);
    this.canvas.removeEventListener("mousemove", this._onMouseMove);
    this.canvas.removeEventListener("mouseup", this._onMouseUp);
    this.canvas.removeEventListener("click", this._onClick);
    this.canvas.removeEventListener("dblclick", this._onDblClick);
    this.canvas.removeEventListener("contextmenu", this._onContextMenu);
  }

  public dispose() {
    this.detach();
    this.clear();
  }

  private _onMouseDown = (e: MouseEvent) => {
    this.emit(BrowserEventType.PointerDown, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onMouseMove = (e: MouseEvent) => {
    this.emit(BrowserEventType.PointerMove, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onMouseUp = (e: MouseEvent) => {
    this.emit(BrowserEventType.PointerUp, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onClick = (e: MouseEvent) => {
    this.emit(BrowserEventType.Click, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onDblClick = (e: MouseEvent) => {
    this.emit(BrowserEventType.DblClick, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
  private _onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    this.emit(BrowserEventType.ContextMenu, { x: e.offsetX, y: e.offsetY, button: e.button });
  };
}

export { MouseEventListener }