/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-17 17:00:10
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-18 17:33:22
 * @FilePath: \vf-studio\packages\vf-engine\src\render\RenderContext.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserViewPort, Document, type IViewPort } from "@vf/core";
import { OrthographicCamera, PerspectiveCamera } from "../camera";
import { CameraController } from "../controller";

class RenderContext {
    document: Document;
    cameraController: CameraController;
    enabled = true;
    constructor(protected camera: OrthographicCamera | PerspectiveCamera, protected viewPort: IViewPort) {
        this.document = new Document();
        this.cameraController = new CameraController(camera);
        this.camera = camera;
        this.setViewPort(viewPort);
    }

    setCamera(camera: OrthographicCamera | PerspectiveCamera) {
        this.camera = camera;
        this.cameraController.setCamera(camera);
        this.resize();
    }

    getCamera(): OrthographicCamera | PerspectiveCamera {
        return this.camera;
    }

    setViewPort(viewPort: IViewPort) {
        const oldViewPort = this.viewPort;
        this.viewPort = viewPort;
        if (oldViewPort instanceof BrowserViewPort) {
            oldViewPort.removeObserver(this.cameraController);
        }
        if (this.viewPort instanceof BrowserViewPort) {
            this.viewPort.addObserver(this.cameraController);
        }
        this.resize();
    }
    getViewPort(): IViewPort {
        return this.viewPort;
    }

    resize() {
        if (!this.camera || !this.viewPort) return;

        const { width, height } = this.viewPort.getSize();
        const aspect = width / height;
        if (this.camera instanceof OrthographicCamera) {
            const frustumHeight = this.camera.top - this.camera.bottom;
            const frustumWidth = frustumHeight * aspect;

            const centerX = (this.camera.left + this.camera.right) / 2;
            const centerY = (this.camera.top + this.camera.bottom) / 2;

            this.camera.left = centerX - frustumWidth / 2;
            this.camera.right = centerX + frustumWidth / 2;
            this.camera.top = centerY + frustumHeight / 2;
            this.camera.bottom = centerY - frustumHeight / 2;
        } else {
            this.camera.aspect = aspect;
        }
        this.camera.updateProjectionMatrix();
    }

    update(delta: number) {
        if (!this.enabled) return;

    }
}

export { RenderContext }