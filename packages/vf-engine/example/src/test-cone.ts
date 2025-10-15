/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-13
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-15 15:29:58
 * @FilePath: \vf-studio\packages\vf-engine\example\src\test-cone.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { ConeSurface, Vector3, Interval, PeriodInterval, Vector2 } from '@vf/math';
import { SurfaceTessellator } from '@vf/structure';
import { Pane } from 'tweakpane';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.up.set(0, 0, 1);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
camera.updateProjectionMatrix();

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app')?.appendChild(renderer.domElement as HTMLElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // 启用阻尼（惯性）
controls.dampingFactor = 0.05;  // 阻尼系数
controls.screenSpacePanning = false;  // 禁止平移
controls.minDistance = 1;  // 最小缩放距离
controls.maxDistance = 20;  // 最大缩放距离
controls.maxPolarAngle = Math.PI;  // 最大垂直旋转角度

// 添加光源
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// ============ 圆锥面参数 ============
const coneApex = new Vector3(0, 0, 0);
const coneAxis = new Vector3(1, 1, 1);
const coneRadius = 2;
const coneHeight = 3;
const cone = new ConeSurface(coneApex, coneAxis, coneRadius, coneHeight);

// 创建曲面细分器
const tessellator = new SurfaceTessellator();

// UI 控制参数
const params = {
    // UV 范围控制
    uMin: 0,
    uMax: Math.PI * 2,
    vMin: 0,
    vMax: 1,

    // 网格细分
    uSegments: 32,
    vSegments: 16,

    // 材质设置
    color: '#ffffff',
    metalness: 0.3,
    roughness: 0.4,
    wireframe: false,
    showWireframe: true,
    useTexture: true,  // 是否使用 UV 贴图
    showNative: true,  // 显示原生 THREE.js 圆锥对比
    showNormals: false, // 显示法向量

    // 几何参数
    radius: 2,
    height: 3,
    isClosed: true,  // 是否闭合曲面
};

// 加载 UV 纹理
// 这个纹理用于验证 UV 映射是否正确
const textureLoader = new THREE.TextureLoader();
const uvTexture = textureLoader.load('/UV2.png');
uvTexture.wrapS = THREE.RepeatWrapping;  // U 方向重复
uvTexture.wrapT = THREE.RepeatWrapping;  // V 方向重复

// 创建材质
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(params.color),
    metalness: params.metalness,
    roughness: params.roughness,
    wireframe: params.wireframe,
    side: THREE.DoubleSide,
    map: params.useTexture ? uvTexture : null
});

// 创建网格和线框（初始为 null，稍后创建）
let mesh: THREE.Mesh | null = null;
let wireframe: THREE.LineSegments | null = null;
let normalHelper: VertexNormalsHelper | null = null;
let nativeNormalHelper: VertexNormalsHelper | null = null;

// 添加信息面板
const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.bottom = '10px';
infoDiv.style.left = '10px';
infoDiv.style.color = 'white';
infoDiv.style.fontFamily = 'monospace';
infoDiv.style.fontSize = '12px';
infoDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
infoDiv.style.padding = '10px';
infoDiv.style.borderRadius = '5px';
infoDiv.style.minWidth = '200px';
document.body.appendChild(infoDiv);

// 更新信息面板函数
function updateInfo() {
    if (!mesh) return;

    const bounds = cone.getUVBounds();
    const geometry = mesh.geometry;
    const vertexCount = geometry.getAttribute('position').count;
    const triangleCount = geometry.index ? geometry.index.count / 3 : 0;
    
    // 检查是否为完整圆锥
    const isFullU = Math.abs(params.uMin - 0) < 1e-6 && Math.abs(params.uMax - Math.PI * 2) < 1e-6;
    const isFullV = Math.abs(params.vMin - 0) < 1e-6 && Math.abs(params.vMax - 1) < 1e-6;

    infoDiv.innerHTML = `
        <div><strong>圆锥面信息</strong></div>
        <div>半径: ${params.radius.toFixed(2)}</div>
        <div>高度: ${params.height.toFixed(2)}</div>
        <div>UV 范围:</div>
        <div style="margin-left: 10px;">U: [${params.uMin.toFixed(2)}, ${params.uMax.toFixed(2)}] (${((params.uMax - params.uMin) / Math.PI).toFixed(2)}π)</div>
        <div style="margin-left: 10px;">V: [${params.vMin.toFixed(2)}, ${params.vMax.toFixed(2)}]</div>
        <div>细分: ${params.uSegments} × ${params.vSegments}</div>
        <div>顶点数: ${vertexCount}</div>
        <div>三角形数: ${triangleCount}</div>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2);">
            <div>UV 贴图: ${params.useTexture ? '✓ 开启' : '✗ 关闭'}</div>
            <div>闭合曲面: ${params.isClosed ? '✓ 是' : '✗ 否'}</div>
            <div>生成方法: ${isFullU && isFullV ? '完整圆锥' : '部分圆锥'}</div>
            <div>原生对比: ${params.showNative ? '✓ 显示' : '✗ 隐藏'}</div>
            <div>法向量: ${params.showNormals ? '✓ 显示' : '✗ 隐藏'}</div>
        </div>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 11px; color: rgba(255,255,255,0.7);">
            <div>左: 自定义 ConeSurface (绿色法向量)</div>
            <div>右: 原生 THREE.ConeGeometry (红色法向量)</div>
        </div>
    `;
}

// 创建原生 THREE.js 圆锥用于对比
const nativeMaterial = material.clone();
const coneMesh = new THREE.Mesh(
    new THREE.ConeGeometry(params.radius, params.height, params.uSegments, params.vSegments, false, params.uMin, params.uMax - params.uMin),
    nativeMaterial
);
// 将原生圆锥放在右侧，与自定义圆锥对比
const offset = (params.radius + params.height / 2) * 1.5;
coneMesh.position.set(offset, 0, params.height / 2);
scene.add(coneMesh);

// 更新圆锥面网格的函数
function updateCone() {
    // 移除旧的网格、线框和法向量辅助
    if (mesh) {
        scene.remove(mesh);
        if (mesh.geometry) mesh.geometry.dispose();
    }
    if (wireframe) {
        if (wireframe.geometry) wireframe.geometry.dispose();
    }
    if (normalHelper) {
        scene.remove(normalHelper);
        normalHelper.dispose();
        normalHelper = null;
    }
    if (nativeNormalHelper) {
        scene.remove(nativeNormalHelper);
        nativeNormalHelper.dispose();
        nativeNormalHelper = null;
    }

    // 更新圆锥参数
    cone.setRadius(params.radius);
    cone.setHeight(params.height);

    // 设置 UV 范围
    cone.setUVBounds({
        u: new PeriodInterval(params.uMin, params.uMax),
        v: new Interval(params.vMin, params.vMax)
    });

    console.log('当前 UV 范围:', cone.getUVBounds());
    
    // 调试信息：检查圆锥面方向
    const coordinate = cone.getCoordinate();
    console.log('圆锥面坐标系:');
    console.log('  原点:', coordinate.origin);
    console.log('  X轴:', coordinate.dx);
    console.log('  Y轴:', coordinate.dy);
    console.log('  Z轴 (轴方向):', coordinate.getNormal());
    
    // 测试顶点和底面中心
    const vertexPoint = cone.getPointAt(new Vector2(0, 0));
    const bottomPoint = cone.getPointAt(new Vector2(0, 1));
    console.log('顶点 (v=0):', vertexPoint);
    console.log('底面中心 (v=1):', bottomPoint);
    console.log('方向向量:', bottomPoint.clone().sub(vertexPoint));
    
    // 测试法向量
    const normalAtVertex = cone.getNormalAt(new Vector2(0, 0));
    const normalAtBottom = cone.getNormalAt(new Vector2(0, 1));
    console.log('顶点法向量:', normalAtVertex);
    console.log('底面法向量:', normalAtBottom);

    // 使用新的细分器生成网格
    const meshData = tessellator.tessellate(cone, {
        uSegments: params.uSegments,
        vSegments: params.vSegments,
        isClosed: params.isClosed
    });

    // 创建新的 geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(meshData.positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(meshData.normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(meshData.uvs, 2));
    geometry.setIndex(meshData.indices);

    // 创建新网格
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 创建线框
    if (params.showWireframe) {
        const wireframeGeometry = new THREE.WireframeGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({ 
            color: 0xffffff, 
            transparent: true,
            opacity: 0.2
        });
        wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        mesh.add(wireframe);
    }

    // 创建法向量辅助工具
    if (params.showNormals) {
        normalHelper = new VertexNormalsHelper(mesh, 0.2, 0x00ff00);
        scene.add(normalHelper);
    }

    // 更新原生圆锥
    coneMesh.geometry.dispose();
    coneMesh.geometry = new THREE.ConeGeometry(
        params.radius, 
        params.height, 
        params.uSegments, 
        params.vSegments, 
        params.isClosed,  // 使用 isClosed 参数
        params.uMin, 
        params.uMax - params.uMin
    );
    const offset = (params.radius + params.height / 2) * 1.5;
    coneMesh.position.set(offset, 0, params.height / 2);

    // 创建原生圆锥的法向量辅助工具
    if (params.showNormals && params.showNative) {
        nativeNormalHelper = new VertexNormalsHelper(coneMesh, 0.2, 0xff0000);
        scene.add(nativeNormalHelper);
    }

    // 更新信息面板
    updateInfo();
}

// 初始化圆锥
updateCone();

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// 添加网格辅助器
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// ============ Tweakpane UI ============
const pane = new Pane({ title: '圆锥面 UV 控制' });

// UV 范围控制
pane.addBinding(params, 'uMin', {
    label: 'U Min',
    min: 0,
    max: Math.PI * 2,
    step: 0.01,
}).on('change', () => {
    if (params.uMin > params.uMax) params.uMin = params.uMax;
    updateCone();
});

pane.addBinding(params, 'uMax', {
    label: 'U Max',
    min: 0,
    max: Math.PI * 2,
    step: 0.01,
}).on('change', () => {
    if (params.uMax < params.uMin) params.uMax = params.uMin;
    updateCone();
});

pane.addBinding(params, 'vMin', {
    label: 'V Min',
    min: 0,
    max: 1,
    step: 0.01,
}).on('change', () => {
    if (params.vMin > params.vMax) params.vMin = params.vMax;
    updateCone();
});

pane.addBinding(params, 'vMax', {
    label: 'V Max',
    min: 0,
    max: 1,
    step: 0.01,
}).on('change', () => {
    if (params.vMax < params.vMin) params.vMax = params.vMin;
    updateCone();
});

// 网格细分
pane.addBinding(params, 'uSegments', {
    label: 'U 段数',
    min: 3,
    max: 64,
    step: 1,
}).on('change', updateCone);

pane.addBinding(params, 'vSegments', {
    label: 'V 段数',
    min: 2,
    max: 64,
    step: 1,
}).on('change', updateCone);

// 几何参数
pane.addBinding(params, 'radius', {
    label: '半径',
    min: 0.5,
    max: 5,
    step: 0.1,
}).on('change', updateCone);

pane.addBinding(params, 'height', {
    label: '高度',
    min: 0.5,
    max: 6,
    step: 0.1,
}).on('change', updateCone);

pane.addBinding(params, 'isClosed', {
    label: '闭合曲面',
}).on('change', updateCone);

pane.addBlade({ view: 'separator' });

// 材质设置
pane.addBinding(params, 'color', {
    label: '颜色',
}).on('change', (ev: any) => {
    material.color.set(ev.value);
    nativeMaterial.color.set(ev.value);
});

pane.addBinding(params, 'metalness', {
    label: '金属度',
    min: 0,
    max: 1,
    step: 0.01,
}).on('change', (ev: any) => {
    material.metalness = ev.value;
    nativeMaterial.metalness = ev.value;
});

pane.addBinding(params, 'roughness', {
    label: '粗糙度',
    min: 0,
    max: 1,
    step: 0.01,
}).on('change', (ev: any) => {
    material.roughness = ev.value;
    nativeMaterial.roughness = ev.value;
});

pane.addBinding(params, 'wireframe', {
    label: '线框模式',
}).on('change', (ev: any) => {
    material.wireframe = ev.value;
    nativeMaterial.wireframe = ev.value;
});

pane.addBinding(params, 'showWireframe', {
    label: '显示网格',
}).on('change', updateCone);

pane.addBinding(params, 'useTexture', {
    label: 'UV 贴图',
}).on('change', (ev: any) => {
    material.map = ev.value ? uvTexture : null;
    material.needsUpdate = true;
    nativeMaterial.map = ev.value ? uvTexture : null;
    nativeMaterial.needsUpdate = true;
    updateInfo();
});

pane.addBinding(params, 'showNative', {
    label: '显示原生圆锥',
}).on('change', (ev: any) => {
    coneMesh.visible = ev.value;
    updateInfo();
});

pane.addBinding(params, 'showNormals', {
    label: '显示法向量',
}).on('change', updateCone);

pane.addBlade({ view: 'separator' });

// UV 预设按钮
pane.addButton({ title: '完整圆锥' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI * 2;
    params.vMin = 0;
    params.vMax = 1;
    updateCone();
});

pane.addButton({ title: '半圆锥' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI;
    params.vMin = 0;
    params.vMax = 1;
    updateCone();
});

pane.addButton({ title: '四分之一圆锥' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI / 2;
    params.vMin = 0;
    params.vMax = 1;
    updateCone();
});

pane.addButton({ title: '上半部分' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI * 2;
    params.vMin = 0;
    params.vMax = 0.5;
    updateCone();
});

pane.addButton({ title: '下半部分' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI * 2;
    params.vMin = 0.5;
    params.vMax = 1;
    updateCone();
});

pane.addButton({ title: '中间部分' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI * 2;
    params.vMin = 0.25;
    params.vMax = 0.75;
    updateCone();
});

pane.addButton({ title: '测试 UV 范围' }).on('click', () => {
    // 测试部分 UV 范围
    params.uMin = Math.PI / 4;
    params.uMax = Math.PI * 3 / 4;
    params.vMin = 0.2;
    params.vMax = 0.8;
    updateCone();
});

pane.addBlade({ view: 'separator' });

// 添加相机控制按钮
pane.addButton({ title: '重置相机' }).on('click', () => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    controls.reset();
});

// 窗口大小调整
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    // 更新轨道控制器
    controls.update();
    renderer.render(scene, camera);
}

animate();

