//Bibliotecas
import {ExtendedObject3D, CollisionEvents} from '@enable3d/phaser-extension'

// Clase base para las bolas
class Bola extends ExtendedObject3D {
    constructor(escena, modeloURL, nombre) {
        super({ key: nombre })
        this.move = { x: 0, y: 0, z: 0 }

        // Cargar caja
        escena.third.load.gltf(modeloURL).then(object => {
            // Agregar carta como hijo de la escena
            this.add(object.scene);

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
        // Mover las coordenadas del objeto actual
        const amplitude = 2; // Reducir la amplitud para limitar el movimiento
        const speed = 0.01; // Ajustar la velocidad para controlar la suavidad del movimiento

        this.position.x = -amplitude * Math.sin(speed * time);
        // Si el objeto tiene un cuerpo físico, indicar que necesita actualización
        if (this.body) {
            this.body.needUpdate = true;
        }
    }
    interactuar() {//funcion que se llama al pulsar E sobre el objeto
        //cojer para lanzar.
    }
}

export default Bola