/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-09-17 17:00:10
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-16 15:12:47
 * @FilePath: \vf-studio\packages\vf-engine\src\render\RenderContext.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import { BrowserViewPort, Document, EventType, type ViewPort } from "@vf/core";
import { OrthographicCamera, PerspectiveCamera } from "../camera";
import { CameraController } from "../controller";

/**
 * 渲染上下文配置接口
 */
interface IRenderContextConfig {
    camera: OrthographicCamera | PerspectiveCamera;
    viewPort: ViewPort;
    document?: Document;
    enabled?: boolean;
}

/**
 * 渲染上下文状态枚举
 */
enum RenderContextState {
    UNINITIALIZED = 'uninitialized',
    INITIALIZING = 'initializing',
    READY = 'ready',
    RENDERING = 'rendering',
    DISPOSED = 'disposed'
}

/**
 * 重新设计的渲染上下文类
 * 负责协调四个核心模块：Document、Camera、CameraController、ViewPort
 */
class RenderContext {
    // 核心模块
    private _document: Document;
    private _camera: OrthographicCamera | PerspectiveCamera;
    private _cameraController!: CameraController;
    private _viewPort: ViewPort;
    
    // 状态管理
    private _state: RenderContextState = RenderContextState.UNINITIALIZED;
    private _enabled: boolean = true;
    
    // 事件处理
    private _resizeHandler: (() => void) | null = null;
    private _isInitialized: boolean = false;

    constructor(config: IRenderContextConfig) {
        this._camera = config.camera;
        this._viewPort = config.viewPort;
        this._document = config.document || new Document();
        this._enabled = config.enabled ?? true;
        
        this._initialize();
    }

    /**
     * 初始化渲染上下文
     */
    private async _initialize(): Promise<void> {
        if (this._state !== RenderContextState.UNINITIALIZED) {
            throw new Error('RenderContext has already been initialized');
        }

        this._state = RenderContextState.INITIALIZING;

        try {
            // 1. 初始化相机控制器
            this._cameraController = new CameraController(this._camera);
            
            // 2. 设置视口
            await this._setupViewPort();
            
            // 3. 初始化相机投影矩阵
            this._updateCameraProjection();
            
            this._state = RenderContextState.READY;
            this._isInitialized = true;
        } catch (error) {
            this._state = RenderContextState.UNINITIALIZED;
            throw new Error(`Failed to initialize RenderContext: ${error}`);
        }
    }

    /**
     * 设置视口并绑定事件
     */
    private async _setupViewPort(): Promise<void> {
        if (!this._viewPort) {
            throw new Error('ViewPort is required');
        }

        // 如果是BrowserViewPort，需要绑定事件监听器
        if (this._viewPort instanceof BrowserViewPort) {
            // 添加相机控制器作为输入观察者
            this._viewPort.addObserver(this._cameraController);
            
            // 绑定resize事件
            this._resizeHandler = this._handleResize.bind(this);
            this._viewPort.on(EventType.Resize, this._resizeHandler);
        }
    }

    /**
     * 处理视口大小变化
     */
    private _handleResize(): void {
        if (!this._isInitialized || this._state !== RenderContextState.READY) {
            return;
        }

        this._updateCameraProjection();
    }

    /**
     * 更新相机投影矩阵
     */
    private _updateCameraProjection(): void {
        if (!this._camera || !this._viewPort) {
            return;
        }

        const { width, height } = this._viewPort.getSize();
        
        // 防止除零错误
        if (width <= 0 || height <= 0) {
            console.warn('Invalid viewport size:', { width, height });
            return;
        }

        const aspect = width / height;
        
        if (this._camera instanceof OrthographicCamera) {
            this._updateOrthographicCamera(aspect);
        } else {
            this._updatePerspectiveCamera(aspect);
        }
        
        this._camera.updateProjectionMatrix();
    }

    /**
     * 更新正交相机参数
     */
    private _updateOrthographicCamera(aspect: number): void {
        const camera = this._camera as OrthographicCamera;
        const frustumHeight = camera.top - camera.bottom;
        const frustumWidth = frustumHeight * aspect;

        const centerX = (camera.left + camera.right) / 2;
        const centerY = (camera.top + camera.bottom) / 2;

        camera.left = centerX - frustumWidth / 2;
        camera.right = centerX + frustumWidth / 2;
        camera.top = centerY + frustumHeight / 2;
        camera.bottom = centerY - frustumHeight / 2;
    }

    /**
     * 更新透视相机参数
     */
    private _updatePerspectiveCamera(aspect: number): void {
        const camera = this._camera as PerspectiveCamera;
        camera.aspect = aspect;
    }

    // ========== 公共API ==========

    /**
     * 获取文档对象
     */
    getDocument(): Document {
        this._ensureInitialized();
        return this._document;
    }

    /**
     * 设置文档对象
     */
    setDocument(document: Document): void {
        this._ensureInitialized();
        if (!document) {
            throw new Error('Document cannot be null or undefined');
        }
        this._document = document;
    }

    /**
     * 获取相机对象
     */
    getCamera(): OrthographicCamera | PerspectiveCamera {
        this._ensureInitialized();
        return this._camera;
    }

    /**
     * 设置相机对象
     */
    setCamera(camera: OrthographicCamera | PerspectiveCamera): void {
        this._ensureInitialized();
        if (!camera) {
            throw new Error('Camera cannot be null or undefined');
        }
        
        this._camera = camera;
        this._cameraController.setCamera(camera);
        this._updateCameraProjection();
    }

    /**
     * 获取视口对象
     */
    getViewPort(): ViewPort {
        this._ensureInitialized();
        return this._viewPort;
    }

    /**
     * 设置视口对象
     */
    async setViewPort(viewPort: ViewPort): Promise<void> {
        this._ensureInitialized();
        if (!viewPort) {
            throw new Error('ViewPort cannot be null or undefined');
        }

        // 清理旧的视口事件监听器
        await this._cleanupViewPort();

        // 设置新的视口
        this._viewPort = viewPort;
        await this._setupViewPort();
        
        // 更新相机投影
        this._updateCameraProjection();
    }

    /**
     * 获取相机控制器
     */
    getCameraController(): CameraController {
        this._ensureInitialized();
        return this._cameraController;
    }

    /**
     * 获取当前状态
     */
    getState(): RenderContextState {
        return this._state;
    }

    /**
     * 是否启用
     */
    get enabled(): boolean {
        return this._enabled;
    }

    /**
     * 设置启用状态
     */
    set enabled(value: boolean) {
        this._enabled = value;
    }

    /**
     * 更新渲染上下文
     */
    update(delta: number): void {
        if (!this._enabled || this._state !== RenderContextState.READY) {
            return;
        }

        this._state = RenderContextState.RENDERING;
        
        // 更新相机控制器
        this._cameraController.update();
        
        this._state = RenderContextState.READY;
    }

    build(): void {
        this._document.getChangeCache();
        const { add, remove, update } = this._document.getChangeCache();
        for (const id of add) {
            const element = this._document.getElementById(id);
        
        }
        for (const id of remove) {
            const element = this._document.getElementById(id);
       
        }


    }

    /**
     * 清理视口相关资源
     */
    private async _cleanupViewPort(): Promise<void> {
        if (this._viewPort instanceof BrowserViewPort) {
            // 移除相机控制器观察者
            this._viewPort.removeObserver(this._cameraController);
            
            // 移除resize事件监听器
            if (this._resizeHandler) {
                this._viewPort.off(EventType.Resize, this._resizeHandler);
                this._resizeHandler = null;
            }
        }
    }

    /**
     * 确保已初始化
     */
    private _ensureInitialized(): void {
        if (!this._isInitialized) {
            throw new Error('RenderContext has not been initialized');
        }
    }

    /**
     * 释放资源
     */
    async dispose(): Promise<void> {
        if (this._state === RenderContextState.DISPOSED) {
            return;
        }

        this._state = RenderContextState.DISPOSED;
        this._enabled = false;

        // 清理视口资源
        await this._cleanupViewPort();

        // 清理其他资源
        this._document = null as any;
        this._camera = null as any;
        this._cameraController = null as any;
        this._viewPort = null as any;
        
        this._isInitialized = false;
    }
}

export { RenderContext, IRenderContextConfig, RenderContextState }