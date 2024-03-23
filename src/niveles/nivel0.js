//Bibliotecas
import {ExtendedObject3D} from '@enable3d/phaser-extension'

//Escenario
//Clases

//Modelos
import base from "url:../../assets/glb/nivel1_3.glb"

//Objetos adicionales
//Clases
import Caja from "../objetos/caja.js"

//Modelos
import modeloCajaBolas from "url:../../assets/glb/caja_bolas.glb"
import modeloCaja1 from "url:../../assets/glb/caja1.glb"
import modeloCaja2 from "url:../../assets/glb/caja2.glb"
import modeloCaja3 from "url:../../assets/glb/caja3.glb"
import modeloCaja4 from "url:../../assets/glb/caja4.glb"
import modeloCaja5 from "url:../../assets/glb/caja5.glb"
import modeloCaja6 from "url:../../assets/glb/caja7.glb"
import modeloCaja7 from "url:../../assets/glb/caja7.glb"

// Nombres de los modelos para las cajas del 1 al 7
const modelosCajas = [
    modeloCaja1,
    modeloCaja2,
    modeloCaja3,
    modeloCaja4,
    modeloCaja5,
    modeloCaja6,
    modeloCaja7
]

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
            
            //Caja que guarda las bolas
            const cajaBolas = new Caja(escena, modeloCajaBolas, 'Caja Bolas')
            this.add(cajaBolas)
            arrayObjetos.push(cajaBolas)

            // Instanciación de las cajas del 1 al 7
            for (let i = 0; i < modelosCajas.length; i++) {
                const nombreCaja = `Caja ${i + 1}`; // Nombre de la caja (Caja 1, Caja 2, ..., Caja 7)
                const modeloCaja = modelosCajas[i]; // Ruta del modelo de la caja
                const caja = new Caja(escena, modeloCaja, nombreCaja); // Instancia de la caja
                this.add(caja); // Añadir la caja a la escena
                arrayObjetos.push(caja); // Agregar la caja al array de objetos
            }
            
            /*
            //Caja1
            const caja1 = new Caja(escena, modeloCaja1, 'Caja 1')
            this.add(caja1)
            arrayObjetos.push(caja1)

            //Caja2
            const caja2 = new Caja(escena, modeloCaja2, 'Caja 2')
            this.add(caja2)
            arrayObjetos.push(caja2)
            */
            //Caja3

            //Caja4

            //Caja5

            //Caja6

            //Caja7

            //Carta1










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