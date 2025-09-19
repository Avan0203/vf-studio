/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-17 17:00:10
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-09-19 16:10:01
 * @FilePath: \vf-studio\packages\vf-engine\src\render\RenderContext.ts
 * Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserViewPort, Document, EventType, type ViewPort } from "@vf/core";
import { OrthographicCamera, PerspectiveCamera } from "../camera";
import { CameraController } from "../controller";

class RenderContext {
    protected document: Document;
    protected cameraController: CameraController;
    enabled = true;
    constructor(protected camera: OrthographicCamera | PerspectiveCamera, protected viewPort: ViewPort) {
        this.document = new Document();
        this.cameraController = new CameraController(camera);
        this.camera = camera;
        this.setViewPort(viewPort);
    }

    getDocument(): Document {
        return this.document;
    }

    setDocument(document: Document) {
        this.document = document;
    }

    setCamera(camera: OrthographicCamera | PerspectiveCamera) {
        this.camera = camera;
        this.cameraController.setCamera(camera);
        this.resize();
    }

    getCamera(): OrthographicCamera | PerspectiveCamera {
        return this.camera;
    }

    setViewPort(viewPort: ViewPort) {
        const oldViewPort = this.viewPort;
        this.viewPort = viewPort;
        if (oldViewPort instanceof BrowserViewPort) {
            oldViewPort.removeObserver(this.cameraController);
            oldViewPort.off(EventType.Resize, this.bindResize);
        }
        if (this.viewPort instanceof BrowserViewPort) {
            this.viewPort.addObserver(this.cameraController);
            this.viewPort.on(EventType.Resize, this.bindResize);
        }
        this.resize();
    }
    getViewPort(): ViewPort {
        return this.viewPort;
    }

    protected bindResize = this.resize.bind(this);

    private resize() {
        if (!this.camera || !this.viewPort) return;

        const { width, height } = this.viewPort.getSize();
        console.log('render context resize width, height: ', width, height);
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