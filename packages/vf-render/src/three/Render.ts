/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-16 15:27:38
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-16 15:33:38
 * @FilePath: \vf-studio\packages\vf-render\src\three\Render.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { WebGLRenderer } from "three";

interface IThreeRenderConfig {
    canvas: HTMLCanvasElement;
    antialias: boolean;
    powerPreference?: string;
    alpha?: boolean;
}

class ThreeRender {
    renderer: WebGLRenderer;
    constructor(config: { canvas: HTMLCanvasElement, antialias: boolean, powerPreference: string }) {
        this.renderer = new WebGLRenderer({
            canvas: config.canvas,
            antialias: true,
            powerPreference: 'high-performance',
        });
    }
}