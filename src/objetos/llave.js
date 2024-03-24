//Bibliotecas
import {ExtendedObject3D, CollisionEvents} from '@enable3d/phaser-extension'

// Clase base para las Llaves
class Llave extends ExtendedObject3D {
    constructor(escena, modeloURL, nombre) {
        super({ key: nombre })
        this.move = { x: 0, y: 0, z: 0 }

        // Cargar Llave
        escena.third.load.gltf(modeloURL).then(object => {
            // Agregar Llave como hijo de la escena
            this.add(object.scene);

            // Configurar el objeto de Llave
            this.name = nombre;
            this.scale.x = this.scale.y = this.scale.z = 1;

            escena.third.physics.add.existing(this, { mass: 10 ,collisionFlags: 2});

            // Aquí puedes agregar lógica adicional, como la creación de física para las Llaves
            // Recuerda que necesitarás acceder a `escena.third.physics` y otras propiedades de `escena`
        }).catch(error => {
            console.error(`Error al cargar ${nombre}:`, error);
        });
    }
}

export default Llave
/*
// Clase específica para la Llave de bolas
class LlaveBolas extends Llave {
    constructor(escena) {
        super(escena, modeloBolasURL, "Llave Bolas");
    }
}

// Clase específica para la primera Llave
class Llave1 extends Llave {
    constructor(escena) {
        super(escena, modeloLlave1URL, "Llave 1");
    }
}

// Clase específica para la segunda Llave
class Llave2 extends Llave {
    constructor(escena) {
        super(escena, modeloLlave2URL, "Llave 2");
    }
}

// Luego, en tu escena, puedes crear las Llaves de la siguiente manera:
// const LlaveBolas = new Llave(escena);
// const Llave1 = new Llave(escena);
// const Llave2 = new Llave(escena);

//o

// const LlaveBolas = new LlaveBolas(escena);
// const Llave1 = new Llave1(escena);
// const Llave2 = new Llave2(escena);
*/