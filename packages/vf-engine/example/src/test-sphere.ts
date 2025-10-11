/*
 * @Author: wuyifan 1208097313@qq.com
 * @Date: 2025-10-11
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2025-10-11 16:59:56
 * @FilePath: \vf-studio\packages\vf-engine\example\src\test-sphere.ts
 * Copyright (c) 2025 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
 */
import * as THREE from 'three';
import { SphereSurface, subdivideSurface, Vector2, Vector3 } from '@vf/math';

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
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app')?.appendChild(renderer.domElement as HTMLElement);

// 添加光源
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// 创建球面
const sphereCenter = new Vector3(0, 0, 0);
const sphereRadius = 2;
const sphere = new SphereSurface(sphereCenter, sphereRadius);

console.log('球面中心:', sphere.getCenter());
console.log('球面半径:', sphere.getRadius());

// 细分球面为 32x32 网格
const meshData = subdivideSurface(sphere, 32, 32);
console.log('顶点数:', meshData.positions.length / 3);
console.log('三角形数:', meshData.indices.length / 3);

// 创建 BufferGeometry
const geometry = new THREE.BufferGeometry();

// 设置顶点位置
const positionAttribute = new THREE.Float32BufferAttribute(meshData.positions, 3);
geometry.setAttribute('position', positionAttribute);

// 设置法向量
const normalAttribute = new THREE.Float32BufferAttribute(meshData.normals, 3);
geometry.setAttribute('normal', normalAttribute);

// 设置UV坐标
const uvAttribute = new THREE.Float32BufferAttribute(meshData.uvs, 2);
geometry.setAttribute('uv', uvAttribute);

// 设置索引
geometry.setIndex(meshData.indices);

// 创建材质
const material = new THREE.MeshStandardMaterial({
    color: 0x4488ff,
    metalness: 0.3,
    roughness: 0.4,
    wireframe: false,
    side: THREE.DoubleSide
});

// 创建网格
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 创建线框以便更好地查看网格
const wireframeGeometry = new THREE.WireframeGeometry(geometry);
const wireframeMaterial = new THREE.LineBasicMaterial({ 
    color: 0xffffff, 
    transparent: true,
    opacity: 0.2
});
const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
mesh.add(wireframe);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// 添加网格辅助器
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// 添加信息面板
const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.top = '10px';
infoDiv.style.left = '10px';
infoDiv.style.color = 'white';
infoDiv.style.fontFamily = 'monospace';
infoDiv.style.fontSize = '14px';
infoDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
infoDiv.style.padding = '10px';
infoDiv.style.borderRadius = '5px';
infoDiv.innerHTML = `
    <div><strong>球面测试</strong></div>
    <div>中心: (${sphereCenter.x}, ${sphereCenter.y}, ${sphereCenter.z})</div>
    <div>半径: ${sphereRadius}</div>
    <div>细分: 32 × 32</div>
    <div>顶点数: ${meshData.positions.length / 3}</div>
    <div>三角形数: ${meshData.indices.length / 3}</div>
    <div style="margin-top: 10px; font-size: 12px;">
        <div>W: 显示线框</div>
        <div>S: 显示实体</div>
        <div>B: 显示双面</div>
    </div>
`;
document.body.appendChild(infoDiv);

// 键盘控制
window.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
        case 'w':
            material.wireframe = true;
            break;
        case 's':
            material.wireframe = false;
            break;
        case 'b':
            material.side = material.side === THREE.DoubleSide 
                ? THREE.FrontSide 
                : THREE.DoubleSide;
            break;
    }
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
    
    // 旋转球面以便观察
    mesh.rotation.y += 0.005;
    mesh.rotation.x += 0.002;
    
    renderer.render(scene, camera);
}

animate();

console.log('球面渲染测试已启动');
console.log('网格数据:', meshData);

