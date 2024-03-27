//Bibliotecas
import {ExtendedObject3D, CollisionEvents} from '@enable3d/phaser-extension'

// Clase base para las bolas
class Bola extends ExtendedObject3D {
    static bolacogida = false;
    constructor(escena,modeloURL,nombre) {
        super({ key: nombre })
        this.move = { x: 0, y: 0, z: 0 }
        escena.third.load.gltf(modeloURL).then(object => {
            // Agregar carta como hijo de la escena
            this.add(object.scene.children[0]);

            // Configurar el objeto de bola
            this.name = nombre;
            this.scale.x = this.scale.y = this.scale.z = 1;

            escena.third.physics.add.existing(this, { shape: 'sphere', mass: 10 ,collisionFlags: 2});
            //escena.third.physics.add.sphere()
            // Aquí puedes agregar lógica adicional, como la creación de física para las bolas
            // Recuerda que necesitarás acceder a `escena.third.physics` y otras propiedades de `escena`
        }).catch(error => {
            console.error(`Error al cargar ${nombre}:`, error);
        });
    }

    // Método para actualizar la posición y la física de la bola
    update(time) {

        if(this.startMove && !bolacogida){
            // Configurar propiedades de los hijos del modelo
        object.scene.traverse(child => {
            if (child.isMesh) {
                child.layers.set(1); // mesh is in layer 1
                child.castShadow = child.receiveShadow = true;
                if (child.material) child.material.metalness = 0;
            }
        });
        bolacogida = true;
        }else if (this.startMove && bolacogida){//lanzar

            bolacogida = false;
        }
        //this.position.x = -amplitude * Math.sin(speed * time);
        // Si el objeto tiene un cuerpo físico, indicar que necesita actualización
        if (this.body) {
            this.body.needUpdate = true;
        }
    }
    interact() {//funcion que se llama al pulsar E sobre el objeto
        //cojer para lanzar.
        if(!this.startMove){this.startMove = true;}
        else{this.startMove = false;}
        console.log("interacted with", this.name);
    }
}

export default Bola