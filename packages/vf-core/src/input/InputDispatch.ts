/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-19 14:05:35
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-19 15:55:18
 * @FilePath: \vf-studio\packages\vf-core\src\input\InputDispatch.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { EventListener } from "../event";
import { EventType, IInputObserver, PointEventPayload, ResizeEventPayload, ViewPortEvents, WheelEventPayload } from "../types";
import { ViewPort } from "../view";

const events = [
    EventType.PointerDown,
    EventType.PointerUp,
    EventType.PointerMove,
    EventType.Wheel,
    EventType.Click,
    EventType.DblClick,
    EventType.ContextMenu,
    EventType.Resize,
];

const eventMap = {
    [EventType.PointerDown]: 'onPointerDown',
    [EventType.PointerUp]: 'onPointerUp',
    [EventType.PointerMove]: 'onPointerMove',
    [EventType.Wheel]: 'onWheel',
    [EventType.Click]: 'onClick',
    [EventType.DblClick]: 'onDblClick',
    [EventType.ContextMenu]: 'onContextMenu',
    [EventType.Resize]: 'onResize',
}


class InputDispatch extends EventListener {
    protected listener: EventListener;
    protected observers: IInputObserver[] = [];
    constructor(protected viewPort: ViewPort) {
        super();
        this.listener = new EventListener();
    }

    public detach() {
        this.listener.detach();
        this.stopListening();
    }

    public attach() {
        this.listener.attach();
        this.startListening();
    }

    public addObserver(observer: IInputObserver) {
        this.observers.push(observer);
    }
    public removeObserver(observer: IInputObserver) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    private boundProcessEvent = this.processEvent.bind(this);

    private async processEvent(payload: ResizeEventPayload | PointEventPayload | WheelEventPayload, event: EventType): Promise<void> {
        for (let i = 0, len = this.observers.length; i < len; i++) {
            const observer = this.observers[i]
            const result = await (observer as any)[(eventMap as any)[event]](payload);
            if (result) {
                break;
            }
        }
    }

    private startListening() {
        for (const event of events) {
            this.listener.on(event, this.boundProcessEvent);
        }
    }

    private stopListening() {
        for (const event of events) {
            this.listener.off(event, this.boundProcessEvent as (payload?: ResizeEventPayload | PointEventPayload | WheelEventPayload | undefined, event?: EventType | undefined) => void);
        }
    }

    dispose() {
        this.listener.dispose();
        this.clear();
    }

    getListener() {
        return this.listener;
    }
}

export { InputDispatch }