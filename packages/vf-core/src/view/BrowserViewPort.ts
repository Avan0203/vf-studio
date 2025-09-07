// render/browser/BrowserViewPort.ts
import { ViewPortEvent } from "../types";
import { AbstractViewPort } from "./AbstractViewPort";

export class BrowserViewPort extends AbstractViewPort {
  private canvas: HTMLCanvasElement;
  private listeners = new Map<string, Set<(e: ViewPortEvent) => void>>();

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  attach() {
    this.canvas.addEventListener("mousedown", this._onMouseDown);
    this.canvas.addEventListener("mousemove", this._onMouseMove);
    this.canvas.addEventListener("mouseup", this._onMouseUp);
    this.canvas.addEventListener("wheel", this._onWheel);
  }

  detach() {
    this.canvas.removeEventListener("mousedown", this._onMouseDown);
    this.canvas.removeEventListener("mousemove", this._onMouseMove);
    this.canvas.removeEventListener("mouseup", this._onMouseUp);
    this.canvas.removeEventListener("wheel", this._onWheel);
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  on(event: string, handler: (e: ViewPortEvent) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  off(event: string, handler: (e: ViewPortEvent) => void): void {
    this.listeners.get(event)?.delete(handler);
  }

  private emit(event: ViewPortEvent) {
    this.listeners.get(event.type)?.forEach((h) => h(event));
  }

  private _onMouseDown = (e: MouseEvent) => {
    this.emit({ type: "pointerdown", payload: { x: e.offsetX, y: e.offsetY, button: e.button } });
  };
  private _onMouseMove = (e: MouseEvent) => {
    this.emit({ type: "pointermove", payload: { x: e.offsetX, y: e.offsetY } });
  };
  private _onMouseUp = (e: MouseEvent) => {
    this.emit({ type: "pointerup", payload: { x: e.offsetX, y: e.offsetY, button: e.button } });
  };
  private _onWheel = (e: WheelEvent) => {
    this.emit({ type: "wheel", payload: { x: e.offsetX, y: e.offsetY, delta: e.deltaY } });
  };

  update() {
    // 浏览器里交给 WebGLRenderer 实现
  }
}
