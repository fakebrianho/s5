import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMesh, addStandardMesh } from './addMeshes'
import { addLight } from './addLights'
import Model from './Model'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WheelAdaptor } from 'three-story-controls'
import gsap from 'gsap'

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({ antialias: true })
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)
camera.position.set(0, 0, 5)

//Globals
// const controls = new OrbitControls(camera, renderer.domElement)
const meshes = {}
const lights = {}
let currentItem = 0
const clock = new THREE.Clock()
const wheelAdaptor = new WheelAdaptor({ type: 'discrete' })
wheelAdaptor.connect()
wheelAdaptor.addEventListener('trigger', () => {
	if (currentItem < Object.keys(meshes).length - 1) {
		currentItem++
	} else {
		currentItem = 0
	}
	gsap.to(camera.position, {
		y: currentItem * -10,
		duration: 2,
		ease: 'back.inOut',
	})
	// currentItem++
	// if (currentItem > positions.length) {
	// 	currentItem = 0
	// }
})
init()
function init() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	//meshes
	// meshes.default = addBoilerPlateMesh()
	meshes.standard = addStandardMesh()
	meshes.standard.position.set(0, 0, 0)
	meshes.s2 = addStandardMesh()
	meshes.s2.position.set(0, -20, 0)
	meshes.s3 = addStandardMesh()
	meshes.s3.position.set(0, -10, 0)

	//lights
	lights.defaultLight = addLight()

	//changes

	//scene operations
	// scene.add(meshes.default)
	scene.add(meshes.standard)
	scene.add(meshes.s2)
	scene.add(meshes.s3)
	scene.add(lights.defaultLight)

	resize()
	animate()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	requestAnimationFrame(animate)
	const delta = clock.getDelta()

	// meshes.default.rotation.x += 0.01
	// meshes.default.rotation.z += 0.01

	meshes.standard.rotation.x += 0.01
	meshes.standard.rotation.z += 0.01

	// meshes.default.scale.x += 0.01

	renderer.render(scene, camera)
}