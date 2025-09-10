/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-05 16:55:08
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-08 16:00:32
 * @FilePath: \vf-studio\packages\vf-core\src\types\view.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

interface IViewPort {
  update(): void;                        // 跟新视图  
  resize(width: number, height: number): void; // 视图大小调整
  dispose(): void;
  attach(): void;                      // 清理资源
}



export { IViewPort }