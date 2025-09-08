type PointEventPayload = { x: number; y: number; button: number, touches?: TouchList };
type WheelEventPayload = { x: number; y: number; delta: number };
type ResizeEventPayload = { width: number; height: number };


interface BrowserEvents {
  [BrowserEventType.Resize]: ResizeEventPayload;
  [BrowserEventType.PointerDown]: PointEventPayload;
  [BrowserEventType.PointerMove]: PointEventPayload;
  [BrowserEventType.PointerUp]: PointEventPayload;
  [BrowserEventType.Wheel]: WheelEventPayload;
  [BrowserEventType.Click]: PointEventPayload;
  [BrowserEventType.DblClick]: PointEventPayload;
  [BrowserEventType.ContextMenu]: PointEventPayload;
}

enum BrowserEventType {
  Resize = 'resize',
  PointerDown = 'pointerdown',
  PointerMove = 'pointermove',
  PointerUp = 'pointerup',
  Wheel = 'wheel',
  Click = 'click',
  DblClick = 'dblclick',
  ContextMenu = 'contextmenu',
}

export { BrowserEvents, BrowserEventType, PointEventPayload, WheelEventPayload, ResizeEventPayload }