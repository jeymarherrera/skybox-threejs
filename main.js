import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

class mundo3D{
    constructor(){
        this.initialize()
    }

    initialize(){
        this.theejs = new THREE.WebGLRenderer({antialias: true})
        this.theejs.shadowMap.enabled = true
        this.theejs.shadowMap.type = THREE.PCFSoftShadowMap
        this.theejs.setPixelRatio(window.devicePixelRatio)
        this.theejs.setSize(window.innerWidth, window.innerHeight)

        document.body.appendChild(this.theejs.domElement)

        window.addEventListener('resize', () => {
            this.WindowResize();
        }, false)

        const fov = 60;
        const aspect = 1920 / 1080
        const near = 1.0;
        const far = 1000.0
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        this.camera.position.set(75, 20, 0)

        this.scene = new THREE.Scene();

        let light = new THREE.DirectionalLight(0xfff, 1.0)
        light.position.set(20,100,10)
        light.target.position.set(0,0,0)
        light.castShadow = true
        light.shadow.bias = -0.001
        light.shadow.mapSize.width = 2048
        light.shadow.mapSize.height = 2048
        light.shadow.camera.near = 0.1
        light.shadow.camera.far = 500.0
        light.shadow.camera.near = 0.5
        light.shadow.camera.far = 500.0
        light.shadow.camera.left = 100
        light.shadow.camera.right = -100
        light.shadow.camera.top = 100
        light.shadow.camera.bottom = -100
        this.scene.add(light)

        light = new THREE.AmbientLight(0x101)
        this.scene.add(light)

        const controls = new OrbitControls(
            this.camera, this.theejs.domElement
        )
        controls.target.set(0,20,0)
        controls.update()

        const loader = new THREE.CubeTextureLoader()
        const texture = loader.load([
            './img/indigo_ft.jpg',
            './img/indigo_bk.jpg',
            './img/indigo_up.jpg',
            './img/indigo_dn.jpg',
            './img/indigo_rt.jpg',
            './img/indigo_lf.jpg',

        ])

        this.scene.background = texture;
        this.RequestAnimationFrame()


    }

    WindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.theejs.setSize(window.innerWidth, window.innerHeight)
    }

    RequestAnimationFrame(){
        requestAnimationFrame(() => {
            this.theejs.render(this.scene, this.camera)
            this.RequestAnimationFrame()
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    APP = new mundo3D()
})