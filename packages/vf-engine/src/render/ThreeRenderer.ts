/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-24 11:00:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-24 13:12:24
 * @FilePath: \vf-studio\packages\vf-engine\src\render\ThreeRenderer.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */

import * as THREE from 'three';
import { RenderNode, RenderNodeType, RenderMesh } from '../node';
import { Camera } from '../camera/Camera';

class ThreeRenderer {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private threeCamera!: THREE.Camera;
    private meshMap: Map<number, THREE.Mesh> = new Map();
    
    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.renderer = new THREE.WebGLRenderer({ 
            canvas, 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
        
        this._setupLights();
    }
    
    processRenderNode(node: RenderNode): void {
        switch (node.getType()) {
            case RenderNodeType.MESH:
                this._processMesh(node as RenderMesh);
                break;
            // 未来添加 POINT, LINE 等
        }
    }
    
    private _processMesh(renderMesh: RenderMesh): void {
        let mesh = this.meshMap.get(renderMesh.elementId);
        
        if (!mesh) {
            // 创建新的 Three.js Mesh
            const geometry = this._createGeometry(renderMesh);
            const material = this._createMaterial(renderMesh.style);
            mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
            this.meshMap.set(renderMesh.elementId, mesh);
        } else {
            // 更新现有 Mesh 的几何和材质
            this._updateGeometry(mesh, renderMesh);
            this._updateMaterial(mesh, renderMesh.style);
        }
        
        // 更新变换矩阵
        mesh.matrix.fromArray(renderMesh.transform.elements);
        mesh.matrixAutoUpdate = false;
        mesh.visible = renderMesh.visible;
    }
    
    private _createGeometry(renderMesh: RenderMesh): THREE.BufferGeometry {
        const geometry = new THREE.BufferGeometry();
        const { vertices, normals, uvs, indices } = renderMesh.geometry;
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        if (normals.length > 0) {
            geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        }
        if (uvs.length > 0) {
            geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        }
        if (indices.length > 0) {
            geometry.setIndex(Array.from(indices));
        }
        
        return geometry;
    }
    
    private _createMaterial(style: any): THREE.Material {
        // 简化材质创建，暂时使用固定样式
        return new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            metalness: 0.3,
            roughness: 0.7
        });
    }
    
    private _getSide(side: any): THREE.Side {
        return THREE.FrontSide; // 暂时固定为前向
    }
    
    private _updateGeometry(mesh: THREE.Mesh, renderMesh: RenderMesh): void {
        const geometry = mesh.geometry as THREE.BufferGeometry;
        const { vertices, normals, uvs, indices } = renderMesh.geometry;
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        if (normals.length > 0) {
            geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        }
        if (indices.length > 0) {
            geometry.setIndex(Array.from(indices));
        }
        geometry.computeBoundingSphere();
    }
    
    private _updateMaterial(mesh: THREE.Mesh, style: any): void {
        // 简化：暂时不更新材质
    }
    
    private _setupLights(): void {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(ambientLight, directionalLight);
    }
    
    updateCamera(camera: Camera): void {
        // 只在相机位置或参数发生变化时才更新
        if (!this.threeCamera) {
            // 根据相机类型创建对应的 Three.js 相机
            if (camera.type === 'OrthographicCamera') {
                console.log('Creating OrthographicCamera');
                // 正交相机 - 使用与 VF 相机相同的参数
                this.threeCamera = new THREE.OrthographicCamera(-20, 20, 20, -20, 0.1, 1000);
            } else {
                console.log('Creating PerspectiveCamera');
                // 透视相机
                this.threeCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
            }
        }
        
        // 检查相机位置是否发生变化
        const currentPos = this.threeCamera.position;
        const newPos = camera.position;
        const positionChanged = Math.abs(currentPos.x - newPos.x) > 0.001 || 
                               Math.abs(currentPos.y - newPos.y) > 0.001 || 
                               Math.abs(currentPos.z - newPos.z) > 0.001;
        
        if (positionChanged) {
            console.log('Camera position changed, updating...');
            // 直接设置相机位置
            this.threeCamera.position.set(newPos.x, newPos.y, newPos.z);
            
            // 设置相机朝向（lookAt 原点）
            this.threeCamera.lookAt(0, 0, 0);
            
            // 更新投影矩阵
            this.threeCamera.projectionMatrix.fromArray(camera.projectionMatrix.elements);
        }
    }
    
    setSize(width: number, height: number): void {
        this.renderer.setSize(width, height);
    }
    
    render(camera: Camera): void {
        this.updateCamera(camera);
        this.renderer.render(this.scene, this.threeCamera);
    }
    
    dispose(): void {
        this.renderer.dispose();
        this.meshMap.forEach(mesh => {
            mesh.geometry.dispose();
            (mesh.material as THREE.Material).dispose();
        });
        this.meshMap.clear();
    }
}

export { ThreeRenderer };
