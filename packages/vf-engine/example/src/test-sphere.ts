/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-11
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-13 15:40:28
 * @FilePath: \vf-studio\packages\vf-engine\example\src\test-sphere.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
// @ts-nocheck
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { SphereSurface, subdivideSurface, Vector3, Interval, PeriodInterval } from '@vf/math';
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

// ============ 球面参数 ============
const sphereCenter = new Vector3(0, 0, 0);
const sphereRadius = 2;
const sphere = new SphereSurface(sphereCenter, sphereRadius);

// UI 控制参数
const params = {
    // UV 范围控制
    uMin: 0,
    uMax: Math.PI * 2,
    vMin: 0,
    vMax: Math.PI,

    // 网格细分
    uSegments: 32,
    vSegments: 32,

    // 材质设置
    color: '#ffffff',
    metalness: 0.3,
    roughness: 0.4,
    wireframe: false,
    showWireframe: true,
    useTexture: true,  // 是否使用 UV 贴图
    showNative: true,  // 显示原生 THREE.js 球体对比
    showNormals: false, // 显示法向量

    // 半径和旋转
    radius: 2,
};

// 加载 UV 纹理
// 这个纹理用于验证 UV 映射是否正确
// 通过观察贴图在球面上的显示，可以检查：
// 1. U 方向（经度）是否正确映射
// 2. V 方向（纬度）是否正确映射
// 3. UV 范围的裁剪是否符合预期
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
    side: THREE.FrontSide,  // 三角形绕序已修正，使用 FrontSide
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

    const bounds = sphere.getUVBounds();
    const geometry = mesh.geometry;
    const vertexCount = geometry.getAttribute('position').count;
    const triangleCount = geometry.index ? geometry.index.count / 3 : 0;

    infoDiv.innerHTML = `
        <div><strong>球面信息</strong></div>
        <div>半径: ${params.radius.toFixed(2)}</div>
        <div>UV 范围:</div>
        <div style="margin-left: 10px;">U: [${params.uMin.toFixed(2)}, ${params.uMax.toFixed(2)}] (${((params.uMax - params.uMin) / Math.PI).toFixed(2)}π)</div>
        <div style="margin-left: 10px;">V: [${params.vMin.toFixed(2)}, ${params.vMax.toFixed(2)}] (${((params.vMax - params.vMin) / Math.PI).toFixed(2)}π)</div>
        <div>细分: ${params.uSegments} × ${params.vSegments}</div>
        <div>顶点数: ${vertexCount}</div>
        <div>三角形数: ${triangleCount}</div>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2);">
            <div>UV 贴图: ${params.useTexture ? '✓ 开启' : '✗ 关闭'}</div>
            <div>原生对比: ${params.showNative ? '✓ 显示' : '✗ 隐藏'}</div>
            <div>法向量: ${params.showNormals ? '✓ 显示' : '✗ 隐藏'}</div>
        </div>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 11px; color: rgba(255,255,255,0.7);">
            <div>左: 自定义 SphereSurface (绿色法向量)</div>
            <div>右: 原生 THREE.SphereGeometry (红色法向量)</div>
        </div>
    `;
}

// 创建原生 THREE.js 球体用于对比
const nativeMaterial = material.clone();
const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(params.radius, params.uSegments, params.vSegments),
    nativeMaterial
);
// 将原生球体放在右侧，与自定义球体对比
const offset = params.radius * 2.5;
sphereMesh.position.set(offset, 0, 0);
scene.add(sphereMesh);

// 更新球面网格的函数
function updateSphere() {
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

    // 更新球面半径
    sphere.setRadius(params.radius);

    // 设置 UV 范围
    sphere.setUVBounds({
        u: new PeriodInterval(params.uMin, params.uMax),
        v: new Interval(params.vMin, params.vMax)
    });

    console.log('当前 UV 范围:', sphere.getUVBounds());

    // 细分球面
    const meshData = subdivideSurface(sphere, params.uSegments, params.vSegments);

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

    // 更新原生球体
    sphereMesh.geometry.dispose();
    sphereMesh.geometry = new THREE.SphereGeometry(params.radius, params.uSegments, params.vSegments, params.uMin, params.uMax - params.uMin, params.vMin, params.vMax - params.vMin);
    const offset = params.radius * 2.5;
    sphereMesh.position.set(offset, 0, 0);

    // 创建原生球体的法向量辅助工具
    if (params.showNormals && params.showNative) {
        nativeNormalHelper = new VertexNormalsHelper(sphereMesh, 0.2, 0xff0000);
        scene.add(nativeNormalHelper);
    }

    // 更新信息面板
    updateInfo();
}

// 初始化球面
updateSphere();

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// 添加网格辅助器
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// ============ Tweakpane UI ============
const pane = new Pane({ title: '球面 UV 控制' });

// UV 范围控制
pane.addBinding(params, 'uMin', {
    label: 'U Min',
    min: 0,
    max: Math.PI * 2,
    step: 0.01,
}).on('change', () => {
    if (params.uMin > params.uMax) params.uMin = params.uMax;
    updateSphere();
});

pane.addBinding(params, 'uMax', {
    label: 'U Max',
    min: 0,
    max: Math.PI * 2,
    step: 0.01,
}).on('change', () => {
    if (params.uMax < params.uMin) params.uMax = params.uMin;
    updateSphere();
});

pane.addBinding(params, 'vMin', {
    label: 'V Min',
    min: 0,
    max: Math.PI,
    step: 0.01,
}).on('change', () => {
    if (params.vMin > params.vMax) params.vMin = params.vMax;
    updateSphere();
});

pane.addBinding(params, 'vMax', {
    label: 'V Max',
    min: 0,
    max: Math.PI,
    step: 0.01,
}).on('change', () => {
    if (params.vMax < params.vMin) params.vMax = params.vMin;
    updateSphere();
});

// 网格细分
pane.addBinding(params, 'uSegments', {
    label: 'U 段数',
    min: 4,
    max: 128,
    step: 1,
}).on('change', updateSphere);

pane.addBinding(params, 'vSegments', {
    label: 'V 段数',
    min: 4,
    max: 128,
    step: 1,
}).on('change', updateSphere);

// 其他设置
pane.addBinding(params, 'radius', {
    label: '半径',
    min: 0.5,
    max: 5,
    step: 0.1,
}).on('change', updateSphere);

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
}).on('change', updateSphere);

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
    label: '显示原生球体',
}).on('change', (ev: any) => {
    sphereMesh.visible = ev.value;
    updateInfo();
});

pane.addBinding(params, 'showNormals', {
    label: '显示法向量',
}).on('change', updateSphere);

pane.addBlade({ view: 'separator' });

// UV 预设按钮
pane.addButton({ title: '完整球面' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI * 2;
    params.vMin = 0;
    params.vMax = Math.PI;
    updateSphere();
});

pane.addButton({ title: '北半球' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI * 2;
    params.vMin = 0;
    params.vMax = Math.PI / 2;
    updateSphere();
});

pane.addButton({ title: '南半球' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI * 2;
    params.vMin = Math.PI / 2;
    params.vMax = Math.PI;
    updateSphere();
});

pane.addButton({ title: '四分之一球' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI;
    params.vMin = 0;
    params.vMax = Math.PI / 2;
    updateSphere();
});

pane.addButton({ title: '赤道带' }).on('click', () => {
    params.uMin = 0;
    params.uMax = Math.PI * 2;
    params.vMin = Math.PI / 4;
    params.vMax = Math.PI * 3 / 4;
    updateSphere();
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

