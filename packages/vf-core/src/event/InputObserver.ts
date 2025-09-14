/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-12 13:58:18
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-15 01:28:51
 * @FilePath: /vf-studio/packages/vf-core/src/event/InputObserver.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { InputObserverInterface, PointEventPayload, ResizeEventPayload, WheelEventPayload } from "../types";

const registeredObserversClasses: InputObserverInterface[] = [];


function getObserverClasses(): InputObserverInterface[] {
    return registeredObserversClasses;
}

class InputObserver implements InputObserverInterface {
    constructor() {
        registeredObserversClasses.push(this);
    }
    public async onPointerDown(event: PointEventPayload): Promise<boolean> {
        return false;
    }
    public async onPointerUp(event: PointEventPayload): Promise<boolean> {
        return false;
    }
    public async onPointerMove(event: PointEventPayload): Promise<boolean> {
        return false;
    }
    public async onClick(event: PointEventPayload): Promise<boolean> {
        return false;
    }
    public async onContextMenu(event: PointEventPayload): Promise<boolean> {
        return false;
    }
    public async onWheel(event: WheelEventPayload): Promise<boolean> {
        return false;
    }
    public async onDblClick(event: PointEventPayload): Promise<boolean> {
        return false;
    }
    public async onResize(event: ResizeEventPayload): Promise<boolean> {
        return false;
    }
}

export { InputObserver, getObserverClasses }