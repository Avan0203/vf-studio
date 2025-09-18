/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:38:25
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-15 13:51:59
 * @FilePath: \vf-studio\packages\vf-engine\src\types\controller.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { OrthographicCamera, PerspectiveCamera } from "../camera";


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
        enabledPan: boolean;
        enabledZoom: boolean;
        enabledRotate: boolean;
    };
    setCamera(camera: OrthographicCamera | PerspectiveCamera): void;
    update(): void;
}

export { IViewController, ControllerMode }