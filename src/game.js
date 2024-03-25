import Phaser from 'phaser'
//import { Project, PhysicsLoader , ThirdDimension, ExtendedObject3D, FirstPersonControls, THREE } from 'enable3d'
import { enable3d, Canvas, Scene3D, ExtendedObject3D, THREE, FirstPersonControls, ExtendedMesh } from '@enable3d/phaser-extension'
import './ammo/ammo'
import './ammo/ammo.wasm'

//Niveles
import Nivel0 from "../src/niveles/nivel0"

//3D models./modules/water
import m4 from "url:../assets/glb/low-poly_rose.glb"
/*
import nivel1 from "url:../assets/glb/nivel1_4.glb"
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
import carta2 from "url:../assets/glb/carta2.glb"
import carta3 from "url:../assets/glb/carta3.glb"
import carta4 from "url:../assets/glb/carta4.glb"

//bolas
import bolas1 from "url:../assets/glb/bola1.glb"
import bolas2 from "url:../assets/glb/bola2.glb"
import bolas3 from "url:../assets/glb/bola3.glb"

//puertas
import puerta1 from "url:../assets/glb/puerta1.glb"
import puerta2 from "url:../assets/glb/puerta2.glb"
import cristal from "url:../assets/glb/cristal.glb"

//cofre
import cofre from "url:../assets/glb/cofre_1.glb"
*/
//llave
import llave from "url:../assets/glb/llave.glb"
import llave_inv from "url:../assets/glb/llave_inv.glb"

import { CollisionEvents } from '@enable3d/ammo-physics/dist/collisionEvents'
import { Mesh, Object3D } from 'three'
import Caja from './objetos/caja'


class MainScene extends Scene3D {

    constructor() {
        super({ key: 'MainScene' })
        console.log("MainScene constructor")
        this.move = { x: 0, y: 0, z: 0 }
        // Crea una instancia de la clase Inventory
        // Inicializa el inventario como un array vacío
        this.inventory = {}; // Objeto para almacenar los objetos del inventario
        this.currentIndex = 0; // Variable para asignar el próximo índice disponible
        this.objetosArray = [] // Array para almacenar las instancias de los objetos
        this.objectLookingAt = undefined;
        this.keyEDown = false;
    }

    async create() {

        this.accessThirdDimension({ maxSubSteps: 10, fixedTimeStep: 1 / 180 })

        await this.third.warpSpeed('-orbitControls')
        
        //this.third.haveSomeFun(50)
        this.third.renderer.gammaFactor = 1.5
        this.third.camera.layers.enable(1) // enable layer 1
        //await this.createWater();
        
        // Muestra el inventario en pantalla
        this.displayInventory();

        this.objetosArray.push(this.third.physics.add.ground({ y: 0.5, width: 4, height: 4, name: 'ground-1'}));
        /*
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

            this.third.load.gltf(carta2).then(gltf => {
                const carta2Mesh = gltf.scene;
                const carta2 = new ExtendedObject3D();
                carta2.add(carta2Mesh);
                carta2.name = 'carta2';
                this.third.physics.add.existing(carta2, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(carta2);
                
            });

            this.third.load.gltf(carta3).then(gltf => {
                const carta3Mesh = gltf.scene;
                const carta3 = new ExtendedObject3D();
                carta3.add(carta3Mesh);
                carta3.name = 'carta3';
                this.third.physics.add.existing(carta3, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(carta3);
                
            });

            this.third.load.gltf(carta4).then(gltf => {
                const carta4Mesh = gltf.scene;
                const carta4 = new ExtendedObject3D();
                carta4.add(carta4Mesh);
                carta4.name = 'carta4';
                this.third.physics.add.existing(carta4, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(carta4);
                
            });

            this.third.load.gltf(bolas1).then(gltf => {
                const bolas1Mesh = gltf.scene;
                const bolas1 = new ExtendedObject3D();
                bolas1.add(bolas1Mesh);
                bolas1.name = 'bolas1';
                this.third.physics.add.existing(bolas1, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(bolas1);
                
            });

            this.third.load.gltf(bolas2).then(gltf => {
                const bolas2Mesh = gltf.scene;
                const bolas2 = new ExtendedObject3D();
                bolas2.add(bolas2Mesh);
                bolas2.name = 'bolas2';
                this.third.physics.add.existing(bolas2, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(bolas2);
                
            });

            this.third.load.gltf(bolas3).then(gltf => {
                const bolas3Mesh = gltf.scene;
                const bolas3 = new ExtendedObject3D();
                bolas3.add(bolas3Mesh);
                bolas3.name = 'bolas3';
                this.third.physics.add.existing(bolas3, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(bolas3);
                
            });

            this.third.load.gltf(puerta1).then(gltf => {
                const puerta1Mesh = gltf.scene;
                const puerta1 = new ExtendedObject3D();
                puerta1.add(puerta1Mesh);
                puerta1.name = 'puerta1';
                this.third.physics.add.existing(puerta1, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(puerta1);
                
            });

            this.third.load.gltf(puerta2).then(gltf => {
                const puerta2Mesh = gltf.scene;
                const puerta2 = new ExtendedObject3D();
                puerta2.add(puerta2Mesh);
                puerta2.name = 'puerta2';
                this.third.physics.add.existing(puerta2, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(puerta2);
                
            });

            this.third.load.gltf(cristal).then(gltf => {
                const cristalMesh = gltf.scene;
                const cristal = new ExtendedObject3D();
                cristal.add(cristalMesh);
                cristal.name = 'cristal';
                this.third.physics.add.existing(cristal, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(cristal);
                
            });

            this.third.load.gltf(cofre).then(gltf => {
                const cofreMesh = gltf.scene;
                const cofre = new ExtendedObject3D();
                cofre.add(cofreMesh);
                cofre.name = 'cofre';
                this.third.physics.add.existing(cofre, { mass: 10 ,collisionFlags: 2});
                this.third.add.existing(cofre);
                
            });*/

        //Cargamos nivel0 con los objetos
        const n0 = new Nivel0(this, this.objetosArray)
        console.log("objetosArray", this.objetosArray)

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


        // Ejemplo de cómo eliminar un objeto del inventario
        //const objectToRemoveFromInventory = { name: 'Objeto1' };
        //this.inventory.removeItem(objectToRemoveFromInventory);
        //this.third.physics.add.collider(this.nivel1,this.player,eventCallback : (event: CollisionEvent));
    }

    update(time, delta) {

        // Recorrer todos los objetos en el array objetosArray
        for (let i = 0; i < this.objetosArray.length; i++) {
            // Verificar si el objeto en la posición actual del array no es nulo
            if (this.objetosArray[i] && this.objetosArray[i].update) {
                // Llamar al método update del objeto actual
                this.objetosArray[i].update(time);
            }
        }

        
        //alturaAgua = alturaAgua+0.2;
        //this.createWater();
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
            } else if (this.keys.e.isDown && !this.keyEDown) {//interactuar con odjeto en objectLookingAt
                this.keyEDown = true;
                /*this.third.camera.rotateZ(-0.2)
                this.firstPersonControls.offset = new THREE.Vector3(
                    Math.sin(theta - Math.PI * 0.5) * 0.4,
                    0,
                    Math.cos(theta - Math.PI * 0.5) * 0.4
                )*/
                if(this.objectLookingAt) {
                    //console.log(this.objectLookingAt);
                    this.objectLookingAt.object.parent.interact();
                }
            } else {
                this.third.camera.rotateZ(0)
                this.firstPersonControls.offset = new THREE.Vector3(0, 0, 0)
            }
            if(this.keys.e.isUp) this.keyEDown = false;
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

            //object raycaster
            raycaster.setFromCamera({x: 0, y: 0}, this.third.camera);
            let result = [];
            raycaster.intersectObjects(this.objetosArray, true, result);
            
            if(result.length === 0) {
                if(this.objectLookingAt) this.objectLookingAt = undefined;
            } else {
                if(!this.objectLookingAt || (result[0] && result[0].object.uuid != this.objectLookingAt.object.uuid)) {
                    this.objectLookingAt = result[0];
                    //console.log(this.objectLookingAt);
                }
            }
            

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

    /*async createWater(){
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
    }*/

    addToInventory(item) {
        // Asigna el próximo índice disponible al objeto y lo agrega al inventario
        this.inventory[this.currentIndex] = item;
        this.currentIndex++;
    }

    // Método para mostrar el inventario en pantalla
    displayInventory() {
        this.inventarioText = this.add.text(32, this.cameras.main.height - 32, 'inventario: [   ] [   ] [   ] [   ] ', {
            fontSize: '32px',
            fill: '#000'
          })
          this.inventarioText.setOrigin(0, 1)
          this.inventarioText.depth = 1
        // Aquí va tu lógica para mostrar el inventario en pantalla
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