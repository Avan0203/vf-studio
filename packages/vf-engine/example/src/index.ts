/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 11:28:13
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 11:33:11
 * @FilePath: \vf-studio\packages\vf-engine\example\src\index.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserViewPort } from "@vf/core";
import { Engine, OrthographicCamera, RenderContext } from "../../src";
import { SphereElement } from "@vf/structure";
import { Vector3 } from "@vf/math";

const app = document.getElementById('app');

const viewport = new BrowserViewPort(app!);
viewport.unlock();

const camera = new OrthographicCamera(-20, 20, 20, -20, 0.1, 1000);
camera.position.set(15, 15, 15);
camera.lookAt(new Vector3(0, 0, 0));

const context = new RenderContext({ camera, viewPort: viewport });
const engine = new Engine();
engine.addContext(context);

// 设置视口大小
const { width, height } = { width: app!.clientWidth, height: app!.clientHeight };
viewport.setSize(width, height);

// 创建球体
const doc = context.getDocument();
const sphere = doc.create(SphereElement);
sphere.setParameters({ radius: 5 });

console.log('Sphere created with radius:', 5);

// 手动触发构建
context.forceBuild();

// 启动引擎
engine.start();
engine.beginAnimation();

// 窗口大小调整
window.addEventListener('resize', () => {
    viewport.setSize(app!.clientWidth, app!.clientHeight);
});