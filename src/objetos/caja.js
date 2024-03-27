//Bibliotecas
import {ExtendedObject3D, CollisionEvents} from '@enable3d/phaser-extension'

// Clase base para las cajas
class Caja extends ExtendedObject3D {
    constructor(escena, modeloURL, nombre) {
        super({ name: nombre })
        this.move = { x: 0, y: 0, z: 0 }
        this.startMove = false;

        // Cargar caja
        escena.third.load.gltf(modeloURL).then(object => {
            // Agregar caja como hijo de la escena
            //console.log("Caja", object);
            object.scene.children[0].name = nombre;
            this.add(object.scene.children[0]);

            // Configurar el objeto de caja
            this.name = nombre;
            this.scale.x = this.scale.y = this.scale.z = 1;

            escena.third.physics.add.existing(this, { shape: 'box', mass: 10 ,collisionFlags: 2});

            // Aquí puedes agregar lógica adicional, como la creación de física para las cajas
            // Recuerda que necesitarás acceder a `escena.third.physics` y otras propiedades de `escena`
        }).catch(error => {
            console.error(`Error al cargar ${nombre}:`, error);
        });
    }

    // Método para actualizar la posición y la física de la Caja
    update(time) {
        // Mover las coordenadas del objeto actual
        if(this.name === 'Caja Bolas'){
            if(!this.startMove){this.position.z = 0;}
            else{this.position.z = 2;}
        }else if (this.name === 'Caja 6'){
            if(this.startMove){this.position.x = -4 ;}
            else{this.position.x = 0 ;}
        }else if (this.name === 'Caja 5'){
            if(this.startMove){this.position.z = -2.5;this.position.x = -6.8 ;}
            else{this.position.x = 0 ; this.position.z = 0;}
        }else if (this.name === 'Caja 4'){
            if(this.startMove){this.position.z = 2.3;this.position.x = -4.7 ;}
            else{this.position.x = 0 ; this.position.z = 0;}
        }else if (this.name === 'Caja 3'){
            if(this.startMove){this.position.y = -2.7;this.position.z = 3 ; this.position.x = -9.7 ;}
            else{this.position.x = 0 ; this.position.z = 0; this.position.y = 0;}
        }else if (this.name === 'Caja 2'){
            if(this.startMove){this.position.z = -4.2;this.position.x = -5 ;}
            else{this.position.x = 0 ; this.position.z = 0;}
        }else if (this.name === 'Caja 1'){
            if(this.startMove){this.position.z = -4;this.position.x = -11.3 ;}
            else{this.position.x = 0 ; this.position.z = 0;}
        }
        // Si el objeto tiene un cuerpo físico, indicar que necesita actualización
        if (this.body) {
            this.body.needUpdate = true;
        }
    }
    interact() {//funcion que se llama al pulsar E sobre el objeto
        //start move al offset
        if(!this.startMove){this.startMove = true;}
        else{this.startMove = false;}
        console.log("interacted with", this.name);
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