/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-08 16:00:04
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-14 15:55:51
 * @FilePath: /vf-studio/packages/vf-core/src/types/event.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
type PointEventPayload = { x: number; y: number; button: MouseButton };
type WheelEventPayload = { x: number; y: number; delta: number };
type ResizeEventPayload = { width: number; height: number };


enum MouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}

interface ViewPortEvents {
  [EventType.Resize]: ResizeEventPayload;
  [EventType.PointerDown]: PointEventPayload;
  [EventType.PointerMove]: PointEventPayload;
  [EventType.PointerUp]: PointEventPayload;
  [EventType.Wheel]: WheelEventPayload;
  [EventType.Click]: PointEventPayload;
  [EventType.DblClick]: PointEventPayload;
  [EventType.ContextMenu]: PointEventPayload;
}

enum EventType {
  Resize = 'resize',
  PointerDown = 'pointerdown',
  PointerMove = 'pointermove',
  PointerUp = 'pointerup',
  Wheel = 'wheel',
  Click = 'click',
  DblClick = 'dblclick',
  ContextMenu = 'contextmenu',
}


interface IInputObserver {
  onPointerDown(payload: PointEventPayload): Promise<boolean>;
  onPointerUp(payload: PointEventPayload): Promise<boolean>;
  onPointerMove(payload: PointEventPayload): Promise<boolean>;
  onClick(payload: PointEventPayload): Promise<boolean>;
  onContextMenu(payload: PointEventPayload): Promise<boolean>;
  onWheel(payload: WheelEventPayload): Promise<boolean>;
  onDblClick(payload: PointEventPayload): Promise<boolean>;
  onResize(payload: ResizeEventPayload): Promise<boolean>;
}


export { 
  EventType, 
  ViewPortEvents, 
  PointEventPayload, 
  WheelEventPayload, 
  ResizeEventPayload, 
  IInputObserver,
  MouseButton
}