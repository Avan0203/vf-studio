/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 16:55:08
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-18 17:17:11
 * @FilePath: \vf-studio\packages\vf-core\src\types\view.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

interface IViewPort {
  getSize(): { width: number; height: number };
  setSize(width: number, height: number): this;
  resize(width: number, height: number): this; // 视图大小调整
  dispose(): void;
}



export { IViewPort }