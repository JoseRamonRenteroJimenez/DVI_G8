import Phaser from 'phaser'
//import { Project, PhysicsLoader , ThirdDimension, ExtendedObject3D, FirstPersonControls, THREE } from 'enable3d'
import { enable3d, Canvas, Scene3D, ExtendedObject3D, FirstPersonControls, THREE } from '@enable3d/phaser-extension'
import './ammo/ammo'
import './ammo/ammo.wasm'

//3D models
import m4 from "url:../assets/glb/low-poly_rose.glb"
import caja from "url:../assets/glb/Habitacion1.glb"
//fetch(m4); fetch(caja);
class MainScene extends Scene3D {
    constructor() {
        super({ key: 'MainScene' })
        console.log("MainScene constructor")
        this.move = { x: 0, y: 0, z: 0 }
    }

    postRender() {
        this.third.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
        this.third.renderer.render(this.third.scene, this.third.camera)

        this.third.renderer.clearDepth()

        this.third.renderer.setScissorTest(true)
        this.third.renderer.setScissor(50, 50, 150, 100)
        this.third.renderer.setViewport(50, 50, 150, 100)

        //this.third.renderer.render(this.third.scene, this.secondCamera)

        this.third.renderer.setScissorTest(false)
    }

    create() {
        this.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 180 })

        this.third.warpSpeed('-orbitControls')
        //this.third.haveSomeFun(50)
        this.third.renderer.gammaFactor = 1.5
        this.third.camera.layers.enable(1) // enable layer 1

        // second camera
        //this.secondCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
        //this.third.add.existing(this.secondCamera)
        //this.third.camera.add(this.secondCamera)
        // this.secondCamera.layers.set(1)

        this.scene.scene.game.events.on('postrender', (renderer, time, delta) => {
          this.postRender()
        })

        /**
         * hashtag3d (https://www.cgtrader.com/hashtag3d)
         * https://www.cgtrader.com/free-3d-models/military/armor/m4a1-carbine-e81d81d5-cfdb-4c57-be71-5c1b8092f4ea
         * Editorial License (https://www.cgtrader.com/pages/terms-and-conditions#general-terms-of-licensing)
         */
        
        this.third.load.gltf(caja).then(o => {
            const caja = new ExtendedObject3D();
            caja.add(o.scene);
            caja.name = "Caja";
            caja.scale.x = caja.scale.y = caja.scale.z = 0.2;
            this.third.add.existing(caja);
            console.log(caja)

            const body = this.third.add.box({ width: caja.scale.z, height: caja.scale.y, depth: caja.scale.z }, { lambert: { color: 'red', transparent: true, opacity: 0.5 } })
            this.third.physics.add.existing(body, { mass: 1e-8, shape: 'box', width: 0.2, height: 0.2, depth: 0.2, collisionFlags: 1 })
            console.log(body)
        });
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
//PhysicsLoader('/__parcel_source_root/src/ammo', () => new Project(config))
//PhysicsLoader('/__parcel_source_root/src/ammo', () => new Phaser.Game(config))
/*window.addEventListener('load', () => {
    Project(() => new Phaser.Game(config)).withPhysics('/lib/ammo/kripken')
})*/