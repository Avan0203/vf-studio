/*
 * @Author: wuyifan wuyifan@udschina.com
 * @Date: 2025-09-05 16:55:08
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-05 16:57:44
 * @FilePath: \vf-studio\packages\vf-core\src\types\view.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { IDocument } from "./document";

interface IViewPort {
  attachDocument(document: IDocument): void;      // 绑定文档
  update(): void;                        // 跟新视图  
  resize(width: number, height: number): void; // 视图大小调整

  // 事件系统（抽象，不依赖 DOM）
  on(event: string, handler: (e: ViewPortEvent) => void): void;
  off(event: string, handler: (e: ViewPortEvent) => void): void;

  dispose(): void;                       // 清理资源
}

interface ViewPortEvent {
  type: string;
  data: any;
}

export { IViewPort, ViewPortEvent }