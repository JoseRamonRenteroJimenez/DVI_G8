//Bibliotecas
import {ExtendedObject3D, CollisionEvents} from '@enable3d/phaser-extension'

// Clase base para las cartas
class Carta extends ExtendedObject3D {
    constructor(escena, modeloURL, nombre) {
        super({ key: nombre })
        this.move = { x: 0, y: 0, z: 0 }

        // Cargar caja
        escena.third.load.gltf(modeloURL).then(object => {
            // Agregar carta como hijo de la escena
            this.add(object.scene);

            // Configurar el objeto de carta
            this.name = nombre;
            this.scale.x = this.scale.y = this.scale.z = 1;

            escena.third.physics.add.existing(this, { mass: 10 ,collisionFlags: 2});

            // Aquí puedes agregar lógica adicional, como la creación de física para las cartas
            // Recuerda que necesitarás acceder a `escena.third.physics` y otras propiedades de `escena`
        }).catch(error => {
            console.error(`Error al cargar ${nombre}:`, error);
        });
    }
}

export default Carta