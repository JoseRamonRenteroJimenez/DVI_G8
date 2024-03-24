//Bibliotecas
import {ExtendedObject3D, CollisionEvents} from '@enable3d/phaser-extension'

// Clase base para las cajas
class Caja extends ExtendedObject3D {
    constructor(escena, modeloURL, nombre) {
        super({ key: nombre })
        this.move = { x: 0, y: 0, z: 0 }

        // Cargar caja
        escena.third.load.gltf(modeloURL).then(object => {
            // Agregar caja como hijo de la escena
            this.add(object.scene);

            // Configurar el objeto de caja
            this.name = nombre;
            this.scale.x = this.scale.y = this.scale.z = 1;

            escena.third.physics.add.existing(this, { mass: 10 ,collisionFlags: 2});

            // Aquí puedes agregar lógica adicional, como la creación de física para las cajas
            // Recuerda que necesitarás acceder a `escena.third.physics` y otras propiedades de `escena`
        }).catch(error => {
            console.error(`Error al cargar ${nombre}:`, error);
        });
    }

    // Método para actualizar la posición y la física de la Caja
    update(time) {
        // Mover las coordenadas del objeto actual
        const amplitude = 2; // Reducir la amplitud para limitar el movimiento
        const speed = 0.01; // Ajustar la velocidad para controlar la suavidad del movimiento

        this.position.x = amplitude * Math.sin(speed * time);
        // Si el objeto tiene un cuerpo físico, indicar que necesita actualización
        if (this.body) {
            this.body.needUpdate = true;
        }
    }
}

export default Caja
/*
// Clase específica para la caja de bolas
class CajaBolas extends Caja {
    constructor(escena) {
        super(escena, modeloBolasURL, "Caja Bolas");
    }
}

// Clase específica para la primera caja
class Caja1 extends Caja {
    constructor(escena) {
        super(escena, modeloCaja1URL, "Caja 1");
    }
}

// Clase específica para la segunda caja
class Caja2 extends Caja {
    constructor(escena) {
        super(escena, modeloCaja2URL, "Caja 2");
    }
}

// Luego, en tu escena, puedes crear las cajas de la siguiente manera:
// const cajaBolas = new Caja(escena);
// const caja1 = new Caja(escena);
// const caja2 = new Caja(escena);

//o

// const cajaBolas = new CajaBolas(escena);
// const caja1 = new Caja1(escena);
// const caja2 = new Caja2(escena);
*/