/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-08 14:36:57
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-19 15:21:48
 * @FilePath: \vf-studio\packages\vf-core\src\input\InputEventListener.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import { isMobile } from '../utils';
import type { IInputObserver } from '../types';
import type { BrowserViewPort } from '../view';
import { MouseEventListener, TouchEventListener } from "../event";
import { InputDispatch } from './InputDispatch';

class BrowserInputDispatch extends InputDispatch {
  protected listener: MouseEventListener | TouchEventListener;
  protected observers: IInputObserver[] = [];

  constructor(protected viewPort: BrowserViewPort) {
    super(viewPort);
    // 简单判断移动端
    this.listener = isMobile() ? new TouchEventListener(this.viewPort.html()) : new MouseEventListener(this.viewPort.html());
  }
}
export { BrowserInputDispatch }