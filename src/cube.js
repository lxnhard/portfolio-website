import './style.css';
// import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {
  PerspectiveCamera,
  Scene,
  Fog,
  AnimationMixer,
  WebGLRenderer,
  sRGBEncoding,
  MathUtils
} from 'three';

let camera, scene, renderer;
let mesh, mixer;

const radius = 3.2;
let theta = 0;
let prevTime = Date.now();

init();
animate();

render();

function init() {

  const container = document.getElementById('three-container');
  const containerWidth = document.getElementById('three-container').clientWidth;
  const containerHeight = document.getElementById('three-container').clientHeight;


  camera = new PerspectiveCamera(45, containerWidth / containerHeight, 0.25, 5);
  camera.position.set(0, 2.2, 0);

  scene = new Scene();
  scene.fog = new Fog(0xffffff, 3, 4);

  const loader = new GLTFLoader();

  loader.load('./cubes_wire.glb', gltf => {
    mesh = gltf.scene;
    mesh.position.set(0, 0, 0);

    scene.add(mesh);
    mixer = new AnimationMixer(mesh);
    render();
  });

  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(containerWidth, containerHeight);
  renderer.outputEncoding = sRGBEncoding;
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {
  const containerWidth = document.getElementById('three-container').clientWidth;
  const containerHeight = document.getElementById('three-container').clientHeight;

  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(containerWidth, containerHeight);

  render();

}

function animate() {

  requestAnimationFrame(animate);
  render();

}

//

function render() {

  theta += 0.3;

  camera.position.x = radius * Math.sin(MathUtils.degToRad(theta));
  camera.position.z = radius * Math.cos(MathUtils.degToRad(theta));
  camera.lookAt(0, -.1, 0);


  if (mixer) {

    const time = Date.now();

    mixer.update((time - prevTime) * 0.001);

    prevTime = time;

  }
  renderer.render(scene, camera);

}
