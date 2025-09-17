/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 11:28:13
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-17 17:01:23
 * @FilePath: \vf-studio\packages\vf-engine\example\src\index.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserViewPort } from "@vf/core";
import { CameraController, OrthographicCamera } from "../../src";

const app = document.getElementById('app');

const viewport = new BrowserViewPort(app!);
const camera = new OrthographicCamera();
const cameraController = new CameraController(camera);

cameraController.on('Change', () => {
  console.log('cameraController Change');
})

resize({ width: app!.clientWidth / 2, height: app!.clientHeight / 2 });

function resize(params: { width: number; height: number }) {
  const { width, height } = params;
  console.log('canvas width, height: ', width, height);
  viewport.setSize(width, height);
}

window.addEventListener('resize', () => {
  resize({ width: app!.clientWidth / 2, height: app!.clientHeight / 2 });
});
function animate() {
  requestAnimationFrame(animate);
}
animate();