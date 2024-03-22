import Phaser from 'phaser'
//import { Project, PhysicsLoader , ThirdDimension, ExtendedObject3D, FirstPersonControls, THREE } from 'enable3d'
import { enable3d, Canvas, Scene3D, ExtendedObject3D, FirstPersonControls, THREE } from '@enable3d/phaser-extension'
import './ammo/ammo'
import './ammo/ammo.wasm'

//3D models
import m4 from "url:../assets/glb/low-poly_rose.glb"
import nivel1 from "url:../assets/glb/nivel1_3.glb"
import caja_bolas from "url:../assets/glb/caja_bolas.glb"

//cajas
import caja1 from "url:../assets/glb/caja1.glb"
import caja2 from "url:../assets/glb/caja2.glb"
import caja3 from "url:../assets/glb/caja3.glb"
import caja4 from "url:../assets/glb/caja4.glb"
import caja5 from "url:../assets/glb/caja5.glb"
import caja6 from "url:../assets/glb/caja6.glb"
import caja7 from "url:../assets/glb/caja7.glb"

//cartas
import carta1 from "url:../assets/glb/carta1.glb"

import water1 from "url:../assets/water/Water_1_M_Normal.jpg"
import water2 from "url:../assets/water/Water_2_M_Normal.jpg"
import { CollisionEvents } from '@enable3d/ammo-physics/dist/collisionEvents'

let alturaAgua = 0;

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

    async create() {
        this.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 180 })

        await this.third.warpSpeed('-orbitControls')
        //this.third.haveSomeFun(50)
        this.third.renderer.gammaFactor = 1.5
        this.third.camera.layers.enable(1) // enable layer 1
        //await this.createWater();
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
         this.third.load.gltf(nivel1).then(gltf => {
            const cajaMesh = gltf.scene;
            const nivel1 = new ExtendedObject3D();
            nivel1.add(cajaMesh);
            nivel1.name = 'nivel1';
            this.third.physics.add.existing(nivel1, { mass: 10, collisionFlags: 2 });
            this.third.add.existing(nivel1);
            });
            
         this.third.load.gltf(caja_bolas).then(gltf => {
            const cajaBolasMesh = gltf.scene;
            const caja_bolas = new ExtendedObject3D();
            caja_bolas.add(cajaBolasMesh);
            caja_bolas.name = 'caja_bolas';
            this.third.physics.add.existing(caja_bolas, { mass: 10 ,collisionFlags: 2});
            this.third.add.existing(caja_bolas);
        
            });

            this.third.load.gltf(caja1).then(gltf => {
                const caja1Mesh = gltf.scene;
                const caja1 = new ExtendedObject3D();
                caja1.add(caja1Mesh);
                caja1.name = 'caja1';
                this.third.physics.add.existing(caja1, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(caja1);
            
            });

            this.third.load.gltf(caja2).then(gltf => {
                const caja2Mesh = gltf.scene;
                const caja2 = new ExtendedObject3D();
                caja2.add(caja2Mesh);
                caja2.name = 'caja2';
                this.third.physics.add.existing(caja2, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(caja2);
                
            });

            this.third.load.gltf(caja3).then(gltf => {
                const caja3Mesh = gltf.scene;
                const caja3 = new ExtendedObject3D();
                caja3.add(caja3Mesh);
                caja3.name = 'caja3';
                this.third.physics.add.existing(caja3, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(caja3);
                
            });

            this.third.load.gltf(caja4).then(gltf => {
                const caja4Mesh = gltf.scene;
                const caja4 = new ExtendedObject3D();
                caja4.add(caja4Mesh);
                caja4.name = 'caja4';
                this.third.physics.add.existing(caja4, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(caja4);
                
            });

            this.third.load.gltf(caja5).then(gltf => {
                const caja5Mesh = gltf.scene;
                const caja5 = new ExtendedObject3D();
                caja5.add(caja5Mesh);
                caja5.name = 'caja5';
                this.third.physics.add.existing(caja5, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(caja5);
                
            });

            this.third.load.gltf(caja6).then(gltf => {
                const caja6Mesh = gltf.scene;
                const caja6 = new ExtendedObject3D();
                caja6.add(caja6Mesh);
                caja6.name = 'caja6';
                this.third.physics.add.existing(caja6, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(caja6);
                
            });

            this.third.load.gltf(caja7).then(gltf => {
                const caja7Mesh = gltf.scene;
                const caja7 = new ExtendedObject3D();
                caja7.add(caja7Mesh);
                caja7.name = 'caja7';
                this.third.physics.add.existing(caja7, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(caja7);
                
            });

            this.third.load.gltf(carta1).then(gltf => {
                const carta1Mesh = gltf.scene;
                const carta1 = new ExtendedObject3D();
                carta1.add(carta1Mesh);
                carta1.name = 'carta1';
                this.third.physics.add.existing(carta1, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(carta1);
                
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
        this.player.position.setY(5)
        this.player.position.setX(-1)
        this.player.position.setZ(2)
        


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
        this.third.physics.add.collider(this.nivel1, this.player, (nivel1, player) => {
            // Aquí puedes colocar el código que deseas ejecutar cuando ocurra la colisión
            // Este callback se llamará cada vez que se produzca una colisión entre nivel1 y player
            console.log('Colisión entre nivel1 y player');
        });
        
        //this.third.physics.add.collider(this.nivel1,this.player,eventCallback : (event: CollisionEvent));
    }

    update(time, delta) {
        alturaAgua = alturaAgua + 0.2;
        //this.createWater();
       // Verificar si `this.caja_bolas` está definido y es un objeto válido
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
        // Para mover hacia adelante
        //this.caja_bolas.position.x += 0.1; // Ajusta la velocidad como desees

        //this.caja_bolas.position.x = (Math.sin(time) + 1) * 5 + 12
        //this.caja_bolas.body.needUpdate = true
    }

    async createWater(){
        const textures = await Promise.all([
            this.third.load.texture(water1),
            this.third.load.texture(water2)
          ])
    
          textures[0].needsUpdate = true
          textures[1].needsUpdate = true
    
          this.third.misc.water({
            y: alturaAgua,
            normalMap0: textures[0],
            normalMap1: textures[1]
          })
    }

    // Método para mover el objeto hacia adelante
moveForward() {
    const forceMagnitude = 0.1; // Magnitud de la fuerza de movimiento

    // Obtener la dirección hacia adelante del objeto
    const forward = new THREE.Vector3();
    this.caja_bolas.getWorldDirection(forward);

    // Aplicar una fuerza en la dirección hacia adelante
    this.caja_bolas.body.applyForce(forward.x * forceMagnitude, forward.y * forceMagnitude, forward.z * forceMagnitude);
}

// Método para mover el objeto hacia atrás
moveBackward() {
    const forceMagnitude = -0.1; // Magnitud de la fuerza de movimiento

    // Obtener la dirección hacia adelante del objeto
    const forward = new THREE.Vector3();
    this.caja_bolas.getWorldDirection(forward);

    // Aplicar una fuerza en la dirección opuesta a la dirección hacia adelante
    this.caja_bolas.body.applyForce(forward.x * forceMagnitude, forward.y * forceMagnitude, forward.z * forceMagnitude);
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

