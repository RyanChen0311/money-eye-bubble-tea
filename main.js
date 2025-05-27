
// 簡約版 Three.js 金錢眼球轉換器
import * as THREE from 'three';

let scene, camera, renderer;
let coins = [];
let totalUSD = 0, totalNT = 0, teaCount = 0, pearlCount = 0;

const USD_TO_NT = 31;
const NT_PER_TEA = 55;
const PEARLS_PER_TEA = 80;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    camera.position.z = 10;

    // Emoji風格眼球
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://twemoji.maxcdn.com/v/latest/72x72/1f441.png');
    const material = new THREE.SpriteMaterial({ map: texture });
    const eye = new THREE.Sprite(material);
    eye.scale.set(2, 2, 1);
    eye.position.set(0, 0, 0);
    scene.add(eye);

    document.getElementById('addMoney').onclick = () => {
        const usd = parseFloat(document.getElementById('usdAmount').value);
        if (!isNaN(usd) && usd > 0) {
            createCoin(usd);
        }
    };

    document.getElementById('reset').onclick = resetAll;

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function createCoin(value) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://twemoji.maxcdn.com/v/latest/72x72/1f4b0.png');
    const material = new THREE.SpriteMaterial({ map: texture });
    const coin = new THREE.Sprite(material);
    coin.scale.set(1, 1, 1);
    coin.position.set((Math.random() - 0.5) * 6, 6, 0);
    coin.userData = { value, velocityY: -0.05 };
    scene.add(coin);
    coins.push(coin);
}

function processCoin(value) {
    totalUSD += value;
    const nt = value * USD_TO_NT;
    totalNT += nt;
    const newPearls = Math.floor((nt / NT_PER_TEA) * PEARLS_PER_TEA);
    pearlCount = Math.floor(totalNT / NT_PER_TEA) * PEARLS_PER_TEA + Math.floor((totalNT % NT_PER_TEA) / NT_PER_TEA * PEARLS_PER_TEA);
    const newTeas = Math.floor(totalNT / NT_PER_TEA);
    teaCount = newTeas;
    updateUI();
}

function resetAll() {
    coins.forEach(c => scene.remove(c));
    coins = [];
    totalUSD = 0;
    totalNT = 0;
    teaCount = 0;
    pearlCount = 0;
    updateUI();
}

function updateUI() {
    document.getElementById('totalUSD').textContent = totalUSD.toFixed(2);
    document.getElementById('totalNT').textContent = Math.floor(totalNT);
    document.getElementById('teaCount').textContent = teaCount;
    document.getElementById('groundPearls').textContent = pearlCount;
}

function animate() {
    requestAnimationFrame(animate);
    coins.forEach((coin, i) => {
        coin.position.y += coin.userData.velocityY;
        if (coin.position.y <= 0.5) {
            processCoin(coin.userData.value);
            scene.remove(coin);
            coins.splice(i, 1);
        }
    });
    renderer.render(scene, camera);
}
