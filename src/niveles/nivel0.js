//Bibliotecas
import {ExtendedObject3D} from '@enable3d/phaser-extension'

//Escenario
//Clases

//Modelos
import base from "url:../../assets/glb/nivel1_1.glb"

//Objetos adicionales
//Clases
import CajaBolas from "../objetos/cajaBolas.js"
//Modelos

class Nivel0 extends ExtendedObject3D {
    constructor(escena, arrayObjetos) {
        super({ key: 'Nivel_0' })
        this.move = { x: 0, y: 0, z: 0 }
        
        // Cargar habitación
        escena.third.load.gltf(base).then(object => {

            // Agregar nivel0 como hijo de nivel
            this.add(object.scene);

            // Configurar el objeto de nivel
            this.name = "Nivel_0";
            this.scale.x = this.scale.y = this.scale.z = 0.2;

            // Agregar el objeto de nivel a la escena principal
            escena.third.add.existing(this);

            // Creo objeto y lo añado al array
            const cajaBolas = new CajaBolas(escena)
            this.add(cajaBolas)
            console.log('caja añadida 2')

            arrayObjetos.push(cajaBolas)

            console.log(this); // Imprimir información sobre el objeto de nivel

            console.log(escena.objetosArray)

            //const body = this.third.add.box({ width: caja.scale.z, height: caja.scale.y, depth: caja.scale.z }, { lambert: { color: 'red', transparent: true, opacity: 0.5 } })
            //this.third.physics.add.existing(body, { mass: 1e-8, shape: 'box', width: 0.2, height: 0.2, depth: 0.2, collisionFlags: 1 })
            

            // Aquí puedes agregar lógica adicional, como la creación de física para el nivel
            // Recuerda que necesitarás acceder a `this.third.physics` y otras propiedades de `escena`
        }).catch(error => {
            console.error('Error al cargar el nivel 0:', error);
        });
    }
}

export default Nivel0;
