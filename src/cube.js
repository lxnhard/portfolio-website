import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {
  PerspectiveCamera,
  Scene,
  Fog,
  AnimationMixer,
  WebGLRenderer,
  sRGBEncoding,
  MathUtils,
  Vector2,
  Raycaster
} from 'three';

let camera, scene, renderer, mixer;
let mesh;
let cubeActive;

const radius = 3.2;
let theta = 0;
let prevTime = Date.now();

const raycaster = new Raycaster();
const mouse = new Vector2(1, 1);

const container = document.getElementById('three-container');

let containerWidth = document.getElementById('three-container').clientWidth;
let containerHeight = document.getElementById('three-container').clientHeight;

init();
animate();

render();

function init() {

  camera = new PerspectiveCamera(45, containerWidth / containerHeight, 0.25, 5);
  camera.position.set(0, 2, 0);
  camera.lookAt(0, 0, 0);

  scene = new Scene();
  scene.fog = new Fog(0xffffff, 1, 3);

  const loader = new GLTFLoader();

  loader.load('./cubes_still.glb', gltf => {
    mesh = gltf.scene;
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    console.log(mesh);
    mixer = new AnimationMixer(mesh);
    render();
  });

  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(containerWidth, containerHeight);
  renderer.outputEncoding = sRGBEncoding;
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);
  container.addEventListener('mousemove', onMouseMove);
}

function onWindowResize() {
  containerWidth = document.getElementById('three-container').clientWidth;
  containerHeight = document.getElementById('three-container').clientHeight;

  camera.aspect = containerWidth / containerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(containerWidth, containerHeight);

  render();

}

function onMouseMove(event) {

  event.preventDefault();

  const rect = container.getBoundingClientRect();
  // console.log(rect);

  mouse.x = ((event.clientX - rect.x) / containerWidth) * 2 - 1;
  mouse.y = - ((event.clientY - rect.y) / containerHeight) * 2 + 1;
  // console.log(mouse.x + ", " + mouse.y)
}

function animate() {

  requestAnimationFrame(animate);

  if (mesh) {
    raycaster.setFromCamera(mouse, camera);

    const intersection = raycaster.intersectObject(mesh);

    if (intersection.length > 0) {

      console.log(intersection[0]);
      cubeActive = intersection[0].object;
    }

    if (cubeActive) {
      if (intersection[0].point)
        cubeActive.rotation.x += 0.01;
    }
  }
  render();

}

//

function render() {

  // theta += 0.1;

  // camera.position.x = radius * Math.sin(MathUtils.degToRad(theta));
  // camera.position.z = radius * Math.cos(MathUtils.degToRad(theta));
  // camera.lookAt(0, -.1, 0);


  if (mixer) {

    const time = Date.now();

    mixer.update((time - prevTime) * 0.001);

    prevTime = time;

  }
  renderer.render(scene, camera);

}
