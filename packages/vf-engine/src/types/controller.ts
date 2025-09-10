/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-11 00:38:25
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-11 01:04:06
 * @FilePath: /vf-studio/packages/vf-engine/src/types/controller.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */


interface IController {
    enabled: boolean;
    update(): void;
}

export { IController }