/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 11:28:13
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-16 14:29:25
 * @FilePath: \vf-studio\packages\vf-engine\example\src\index.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserViewPort } from "@vf/core";
import { CameraController, Engine, OrthographicCamera, RenderContext } from "../../src";
import { SphereElement } from "@vf/structure";

const app = document.getElementById('app');

const viewport = new BrowserViewPort(app!);
viewport.unlock();
const camera = new OrthographicCamera();

const context = new RenderContext({ camera, viewPort: viewport });

const engine = new Engine();

engine.addContext(context);

resize({ width: app!.clientWidth / 2, height: app!.clientHeight / 2 });

function resize(params: { width: number; height: number }) {
  const { width, height } = params;
  console.log(' width, height: ', width, height);
  viewport.setSize(width, height);
}

window.addEventListener('resize', () => {
  resize({ width: app!.clientWidth / 2, height: app!.clientHeight / 2 });
});
function animate() {
  requestAnimationFrame(animate);
}

const doc = context.getDocument();

const sphere = doc.create(SphereElement);
sphere.setParameters({ radius: 5 });

sphere.needsUpdate = true;

context.update()
animate();