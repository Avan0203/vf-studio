/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 11:28:13
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-08 16:25:07
 * @FilePath: \vf-studio\packages\vf-core\examples\src\index.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Document, Element, BrowserViewPort, BrowserEventType } from "../../src/";
console.log('vf core');
console.log('hello world');

const doc = new Document();
console.log('doc: ', doc);
const element = doc.create(Element);
console.log('element: ', element);
const element2 = doc.create(Element);
const element3 = doc.create(Element);

element.add(element2);
element2.add(element3);

console.log('element children: ', element.getChildren());
console.log('element parent: ', element.getParent());

console.log('element2 parent: ', element2.getParent());

console.log('element getAllChildren: ', element.getAllChildren());

const elements = doc.getElementsByClass(Element);
console.log('elements: ', elements);


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
console.log('canvas element:', canvas);
if (!canvas) {
  console.error('Canvas element not found');
}
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

const viewPort = new BrowserViewPort(canvas);
viewPort.attach();

viewPort.on(BrowserEventType.PointerDown, (e) => {
  console.log('pointer down: ', e);
});

viewPort.on(BrowserEventType.PointerUp, (e) => {
  console.log('pointer up: ', e);
});

viewPort.on(BrowserEventType.Wheel, (e) => {
  console.log('wheel: ', e);
});

viewPort.on(BrowserEventType.Click, (e) => {
  console.log('click: ', e);
});

viewPort.on(BrowserEventType.DblClick, (e) => {
  console.log('dbl click: ', e);
});

viewPort.on(BrowserEventType.ContextMenu, (e) => {
  console.log('context menu: ', e);
});

viewPort.on(BrowserEventType.PointerMove, (e) => {
  console.log('pointer move: ', e);
});


