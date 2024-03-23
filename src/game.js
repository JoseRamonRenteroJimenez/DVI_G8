import Phaser from 'phaser'
//import { Project, PhysicsLoader , ThirdDimension, ExtendedObject3D, FirstPersonControls, THREE } from 'enable3d'
import { enable3d, Canvas, Scene3D, ExtendedObject3D, THREE, FirstPersonControls } from '@enable3d/phaser-extension'
import './ammo/ammo'
import './ammo/ammo.wasm'

//Niveles
import Nivel0 from "../src/niveles/nivel0"

//3D models./modules/water
import m4 from "url:../assets/glb/low-poly_rose.glb"
import { Object3D } from 'three'



class MainScene extends Scene3D {
    constructor() {
        super({ key: 'MainScene' })
        console.log("MainScene constructor")
        this.move = { x: 0, y: 0, z: 0 }
        this.objetosArray = []; // Array para almacenar las instancias de CajaBolas
    }

    async create() {

        this.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 180 })

        await this.third.warpSpeed('-orbitControls')
        
        //this.third.haveSomeFun(50)
        
        //Cargamos nivel0
        const n0 = new Nivel0(this, this.objetosArray)
        console.log(this.objetosArray)

        //Cargar flor

        this.third.load.gltf(m4).then(object => {
            const rifle = object.scene

            this.rifle = new ExtendedObject3D()
            this.rifle.name = 'rifle'
            this.rifle.add(rifle)
            this.rifle.scale.x = this.rifle.scale.y = this.rifle.scale.z = 0.001 ; 

            this.third.add.existing(this.rifle)

            this.rifle.traverse(child => {
              if (child.isMesh) {
                child.layers.set(1) // mesh is in layer 1
                child.castShadow = child.receiveShadow = true
                if (child.material) child.material.metalness = 0
              }
            })
        })

        // add red dot
        this.redDot = this.add.circle(this.cameras.main.width / 2, this.cameras.main.height / 2, 4, 0xff0000)
        this.redDot.depth = 1

        //add camera
        this.third.renderer.gammaFactor = 1.5        
        this.third.camera.layers.enable(1) // enable layer 1

        // add player
        this.player = new ExtendedObject3D()
        this.player.position.setY(1)
        
        // add first person controls
        this.firstPersonControls = new FirstPersonControls(this.third.camera, this.player, {})

        // lock the pointer and update the first person control
        //al hacer click bloquear cursor en el canvas        
        this.input.on('pointerdown', () => {
            this.input.mouse.requestPointerLock()
        })
        this.input.on('pointermove', pointer => {
            if (this.input.mouse.locked) {
                this.firstPersonControls.update(pointer.movementX, pointer.movementY)
            }
        })
        this.events.on('update', () => {
            this.firstPersonControls.update(0, 0)
        })

        // add keys
        this.keys = {
            w: this.input.keyboard.addKey('w'),
            a: this.input.keyboard.addKey('a'),
            s: this.input.keyboard.addKey('s'),
            d: this.input.keyboard.addKey('d'),
            q: this.input.keyboard.addKey('q'),
            e: this.input.keyboard.addKey('e')
        }
    }

    update(time, delta) {
        if (this.rifle && this.rifle) {
            // some variables
            //const zoom = this.input.mousePointer.rightButtonDown()
            const zoom = undefined;
            const speed = 0.1
            const direction = new THREE.Vector3()
            const rotation = this.third.camera.getWorldDirection(direction)
            const theta = Math.atan2(rotation.x, rotation.z)

            // reset red dot
            this.redDot.alpha = 1

            // the rifle movement
            if (zoom) {
                this.redDot.alpha = 0
                this.move.x = THREE.MathUtils.lerp(this.move.x, 0.6, 0.2)
                this.move.y = THREE.MathUtils.lerp(this.move.y, -0.8 + 1.8, 0.2)
                this.move.z = THREE.MathUtils.lerp(this.move.z, -0.45, 0.2)
            } else if (this.keys.w.isDown) {
                this.move.x = Math.sin(time * -0.015) * 0.075
                this.move.y = Math.sin(time * 0.015) * 0.075
                this.move.z = Math.sin(time * 0.015) * 0.075
            } else {
                this.move.x = Math.sin(time * -0.003) * 0.01
                this.move.y = Math.sin(time * 0.003) * 0.01
                this.move.z = Math.sin(time * 0.003) * 0.01
            }

            // tilt
            if (this.keys.q.isDown) {
                this.third.camera.rotateZ(0.2)
                this.firstPersonControls.offset = new THREE.Vector3(
                    Math.sin(theta + Math.PI * 0.5) * 0.4,
                    0,
                    Math.cos(theta + Math.PI * 0.5) * 0.4
                )
            } else if (this.keys.e.isDown) {
                this.third.camera.rotateZ(-0.2)
                this.firstPersonControls.offset = new THREE.Vector3(
                    Math.sin(theta - Math.PI * 0.5) * 0.4,
                    0,
                    Math.cos(theta - Math.PI * 0.5) * 0.4
                )
            } else {
                this.third.camera.rotateZ(0)
                this.firstPersonControls.offset = new THREE.Vector3(0, 0, 0)
            }

            // adjust the position of the rifle to the camera
            const raycaster = new THREE.Raycaster()
            // x and y are normalized device coordinates from -1 to +1
            raycaster.setFromCamera({ x: 0.6 - this.move.x, y: -0.8 - this.move.y }, this.third.camera)
            const pos = new THREE.Vector3()
            pos.copy(raycaster.ray.direction)
            pos.multiplyScalar(0.8 + this.move.z)
            pos.add(raycaster.ray.origin)

            this.rifle.position.copy(pos)
            this.rifle.rotation.copy(this.third.camera.rotation)

            // move forwards and backwards
            if (this.keys.w.isDown) {
                this.player.position.x += Math.sin(theta) * speed
                this.player.position.z += Math.cos(theta) * speed
            } else if (this.keys.s.isDown) {
                this.player.position.x -= Math.sin(theta) * speed
                this.player.position.z -= Math.cos(theta) * speed
            }

            // move sideways
            if (this.keys.a.isDown) {
                this.player.position.x += Math.sin(theta + Math.PI * 0.5) * speed
                this.player.position.z += Math.cos(theta + Math.PI * 0.5) * speed
            } else if (this.keys.d.isDown) {
                this.player.position.x += Math.sin(theta - Math.PI * 0.5) * speed
                this.player.position.z += Math.cos(theta - Math.PI * 0.5) * speed
            }

            // shoot
            if (this.input.mousePointer.leftButtonDown()) {
                const x = 0
                const y = 0
                const force = 5
                const pos = new THREE.Vector3()

                raycaster.setFromCamera({ x, y }, this.third.camera)

                pos.copy(raycaster.ray.direction)
                pos.add(raycaster.ray.origin)

                const sphere = this.third.physics.add.sphere(
                    { radius: 0.05, x: pos.x, y: pos.y, z: pos.z, mass: 5, bufferGeometry: true },
                    { phong: { color: 0x202020 } }
                )

                pos.copy(raycaster.ray.direction)
                pos.multiplyScalar(24)

                sphere.body.applyForce(pos.x * force, pos.y * force, pos.z * force)
            }
        }
    }
}

const config = {
    type: Phaser.WEBGL,
    transparent: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight
    },
    scene: [MainScene],
    //antialias: true,
    ...Canvas({ antialias: true })
}

window.addEventListener('load', () => {
    enable3d(() => new Phaser.Game(config)).withPhysics('/__parcel_source_root/src/ammo');
});