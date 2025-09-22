/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-08 15:27:07
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-22 16:45:35
 * @FilePath: \vf-studio\packages\vf-core\src\utils\device.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
export function isMobile() {
    const ua = navigator.userAgent.toLowerCase();
    const mobileRegex = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|windows phone|phone|webos|kindle|tablet/i;
    return mobileRegex.test(ua);
}

export function generateUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}