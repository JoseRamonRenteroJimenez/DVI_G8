//Bibliotecas
import {ExtendedObject3D, CollisionEvents} from '@enable3d/phaser-extension'

// Clase base para las Puertas
class Puerta extends ExtendedObject3D {
    constructor(escena, modeloURL, nombre) {
        super({ key: nombre })
        this.move = { x: 0, y: 0, z: 0 }
        this.startMove = false;

        // Cargar caja
        escena.third.load.gltf(modeloURL).then(object => {
            // Agregar carta como hijo de la escena
            this.add(object.scene.children[0]);

            // Configurar el objeto de Puerta
            this.name = nombre;
            this.scale.x = this.scale.y = this.scale.z = 1;

            escena.third.physics.add.existing(this, { mass: 10 ,collisionFlags: 2});

            // Aquí puedes agregar lógica adicional, como la creación de física para las Puerta
            // Recuerda que necesitarás acceder a `escena.third.physics` y otras propiedades de `escena`
        }).catch(error => {
            console.error(`Error al cargar ${nombre}:`, error);
        });
    }

    // Método para actualizar la posición y la física de la puerta
    update(time) {
        if(this.name === 'Puerta 1'){
            if(!this.startMove){this.position.x = 0;}
            else{this.position.x = -4.5;}
        }else{
            if(!this.startMove){this.position.x = 0;}
            else{this.position.x = 4.5;}
        }
        // Si el objeto tiene un cuerpo físico, indicar que necesita actualización
        if (this.body) {
            this.body.needUpdate = true;
        }
    }
    interact() {//funcion que se llama al pulsar E sobre el objeto
        if(!this.startMove){this.startMove = true;}
        else{this.startMove = false;}
        console.log("interacted with", this.name);
    }
}

export default Puerta