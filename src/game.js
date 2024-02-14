import Phaser from 'phaser'
import { Project, Scene3D, PhysicsLoader, ThirdDimension, ExtendedObject3D, FirstPersonControls, THREE } from 'enable3d'
import './ammo/ammo'
import './ammo/ammo.wasm'
class MainScene extends Scene3D {
    constructor() {
        super({ key: 'MainScene' })
        console.log("MainScene constructor")
        this.move = { x: 0, y: 0, z: 0 }
    }

    postRender() {
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
        this.renderer.render(this.scene, this.camera)

        this.renderer.clearDepth()

        this.renderer.setScissorTest(true)
        this.renderer.setScissor(50, 50, 150, 100)
        this.renderer.setViewport(50, 50, 150, 100)

        //this.renderer.render(this.scene, this.secondCamera)

        this.renderer.setScissorTest(false)
    }

    create() {
        //this.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 180 })

        this.warpSpeed('-orbitControls')
        //this.haveSomeFun(50)
        this.renderer.gammaFactor = 1.5
        this.camera.layers.enable(1) // enable layer 1

        // second camera
        this.secondCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
        this.add.existing(this.secondCamera)
        this.camera.add(this.secondCamera)
        // this.secondCamera.layers.set(1)

        //this.scene.game.events.on('postrender', (renderer, time, delta) => {
        //    this.postRender()
        //})

        /**
         * hashtag3d (https://www.cgtrader.com/hashtag3d)
         * https://www.cgtrader.com/free-3d-models/military/armor/m4a1-carbine-e81d81d5-cfdb-4c57-be71-5c1b8092f4ea
         * Editorial License (https://www.cgtrader.com/pages/terms-and-conditions#general-terms-of-licensing)
         */
        
        this.load.gltf('/assets/glb/caja.glb').then(o => {
            const caja = new ExtendedObject3D();
            caja.add(o.scene);
            caja.name = "Caja";
            caja.scale.x = caja.scale.y = caja.scale.z = 4;
            this.add.existing(caja);
            console.log(caja)

            const body = this.add.box({ width: caja.scale.z, height: caja.scale.y, depth: caja.scale.z }, { lambert: { color: 'red', transparent: true, opacity: 0.5 } })
            this.physics.add.existing(body, { mass: 1e-8, shape: 'box', width: 0.2, height: 0.2, depth: 0.2, collisionFlags: 1 })
            console.log(body)
        });
        this.load.gltf('/assets/glb/M4A1.glb').then(object => {
            const rifle = object.scene

            this.rifle = new ExtendedObject3D()
            this.rifle.name = 'rifle'
            this.rifle.add(rifle)

            this.add.existing(this.rifle)

            this.rifle.traverse(child => {
                if (child.isMesh) {
                    child.layers.set(1) // mesh is in layer 1
                    child.castShadow = child.receiveShadow = true
                    if (child.material) child.material.metalness = 0
                }
            })
        })
        
        // add red dot
        this.redDot = this.add.circle(this.camera.getFilmWidth() / 2, this.camera.getFilmHeight() / 2, 4, 0xff0000)
        this.redDot.depth = 1

        // add player
        this.player = new ExtendedObject3D()
        this.player.position.setY(1)

        // add first person controls
        this.firstPersonControls = new FirstPersonControls(this.camera, this.player, {})

        // lock the pointer and update the first person control
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
            const zoom = this.input.mousePointer.rightButtonDown()
            const speed = 0.1
            const direction = new THREE.Vector3()
            const rotation = this.camera.getWorldDirection(direction)
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
                this.camera.rotateZ(0.2)
                this.firstPersonControls.offset = new THREE.Vector3(
                    Math.sin(theta + Math.PI * 0.5) * 0.4,
                    0,
                    Math.cos(theta + Math.PI * 0.5) * 0.4
                )
            } else if (this.keys.e.isDown) {
                this.camera.rotateZ(-0.2)
                this.firstPersonControls.offset = new THREE.Vector3(
                    Math.sin(theta - Math.PI * 0.5) * 0.4,
                    0,
                    Math.cos(theta - Math.PI * 0.5) * 0.4
                )
            } else {
                this.camera.rotateZ(0)
                this.firstPersonControls.offset = new THREE.Vector3(0, 0, 0)
            }

            // adjust the position of the rifle to the camera
            const raycaster = new THREE.Raycaster()
            // x and y are normalized device coordinates from -1 to +1
            raycaster.setFromCamera({ x: 0.6 - this.move.x, y: -0.8 - this.move.y }, this.camera)
            const pos = new THREE.Vector3()
            pos.copy(raycaster.ray.direction)
            pos.multiplyScalar(0.8 + this.move.z)
            pos.add(raycaster.ray.origin)

            this.rifle.position.copy(pos)
            this.rifle.rotation.copy(this.camera.rotation)

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

                raycaster.setFromCamera({ x, y }, this.camera)

                pos.copy(raycaster.ray.direction)
                pos.add(raycaster.ray.origin)

                const sphere = this.physics.add.sphere(
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
    scenes: [MainScene],
    antialias: true
    //...Canvas({ antialias: true })
}
PhysicsLoader('/__parcel_source_root/src/ammo', () => new Project(config))
/*window.addEventListener('load', () => {
    Project(() => new Phaser.Game(config)).withPhysics('/lib/ammo/kripken')
})*/