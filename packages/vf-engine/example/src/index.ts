/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 11:28:13
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-13 19:52:22
 * @FilePath: /vf-studio/packages/vf-engine/example/src/index.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserViewPort } from "@vf/core";
import { CameraController, OrthographicCamera } from "../../src";

const app = document.getElementById('app');

const viewport = new BrowserViewPort(app!);
const camera = new OrthographicCamera();
const cameraController = new CameraController(camera);

window.addEventListener('resize', () => {
  viewport.setSize(window.innerWidth, window.innerHeight);
});


