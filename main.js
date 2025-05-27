import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 加一個立方體代表珍奶
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffccaa });
const bubbleTea = new THREE.Mesh(geometry, material);
scene.add(bubbleTea);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  bubbleTea.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();