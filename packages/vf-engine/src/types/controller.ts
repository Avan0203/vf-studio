/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:38:25
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-11 10:44:21
 * @FilePath: \vf-studio\packages\vf-engine\src\types\controller.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import type { Vector3 } from "@vf/math";

enum ControllerMode {
    NONE = 'none',
    ZOOM = 'zoom',
    PAN = 'pan',
    ROTATE = 'rotate',
}

interface IViewController {
    mode: ControllerMode;
    state: {
        enabled: boolean;
        enabledInPan: boolean;
        enabledInZoom: boolean;
        enabledInRotate: boolean;
    };
    update(): void;
    handlePan(dx: number, dy: number): void;
    handleZoom(delta: number, dx: number, dy: number): void;
    handleRotate(dx: number, dy: number): void;
}

export { IViewController, ControllerMode }