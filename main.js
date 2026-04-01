import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('viewerContainer');

// --- SCENE ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333); // visible background

// --- CAMERA ---
const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);
camera.position.set(0, 2, 6);
camera.lookAt(0, 0, 0);

// --- RENDERER ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// --- STRONG LIGHTING ---
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
scene.add(hemi);

const dir = new THREE.DirectionalLight(0xffffff, 3);
dir.position.set(5, 10, 7);
scene.add(dir);

// --- TEST CUBE (should ALWAYS be visible) ---
const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshStandardMaterial({ color: 'red' });
const cube = new THREE.Mesh(geo, mat);
cube.position.set(0, 1, 0);
scene.add(cube);

// --- LOAD YOUR GLB ---
const loader = new GLTFLoader();
loader.load(
    './BillytheBarbarianRings.glb',
    (gltf) => {
        gltf.scene.position.set(0, 0, 0);
        scene.add(gltf.scene);
        console.log("GLB loaded!");
    },
    undefined,
    (err) => {
        console.error("GLB failed to load:", err);
    }
);

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01; // visible motion proves rendering works
    renderer.render(scene, camera);
}
animate();
