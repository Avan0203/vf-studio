/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-17 17:00:10
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-17 17:51:49
 * @FilePath: \vf-studio\packages\vf-engine\src\context\RenderContext.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { Document, type IViewPort } from "@vf/core";
import { OrthographicCamera, PerspectiveCamera } from "../camera";

class RenderContext {
    document: Document;
    constructor(protected camera: OrthographicCamera | PerspectiveCamera, protected viewPort: IViewPort) {
        this.document = new Document();
        this.camera = camera;
        this.setViewPort(viewPort);
    }

    setCamera(camera: OrthographicCamera | PerspectiveCamera) {
        this.camera = camera;
        this.resize();
    }
    getCamera(): OrthographicCamera | PerspectiveCamera {
        return this.camera;
    }

    setViewPort(viewPort: IViewPort) {
        this.viewPort = viewPort;
        this.resize();
    }
    getViewPort(): IViewPort {
        return this.viewPort;
    }

    resize() {
        const { width, height } = this.viewPort.getSize();
        if (this.camera instanceof OrthographicCamera) {

        } else {

        }
        this.camera.updateProjectionMatrix();
    }
}

export { RenderContext }