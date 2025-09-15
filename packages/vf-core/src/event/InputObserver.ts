/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-12 13:58:18
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-15 14:16:29
 * @FilePath: \vf-studio\packages\vf-core\src\event\InputObserver.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { Vector2, Vector2Like } from "@vf/math";
import { InputObserverInterface, PointEventPayload, ResizeEventPayload, WheelEventPayload } from "../types";
import { EventEmitter } from "./EventEmitter";

const registeredObserversClasses: InputObserverInterface[] = [];


function getObserverClasses(): InputObserverInterface[] {
    return registeredObserversClasses;
}

class InputObserver extends EventEmitter<{ Change: null }> implements InputObserverInterface {
    protected mouse = new Vector2();
    protected size = new Vector2();
    constructor() {
        super();
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
    public async onResize({ width, height }: ResizeEventPayload): Promise<boolean> {
        this.size.set(width, height);
        return false;
    }

    /**
     * @description: 转换鼠标坐标为归一化坐标
     * @param {{ x: number, y: number }} event
     * @return {Vector2}
     */
    protected getMouse({ x, y }: Vector2Like): Vector2 {
        return this.mouse.set(
            (x - this.size.x * 0.5) / (this.size.x * 0.5),
            (this.size.y * 0.5 - y) / (this.size.x * 0.5)  // 用 width 保持比例一致
        );
    }
}

export { InputObserver, getObserverClasses }