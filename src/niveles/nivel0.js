//Bibliotecas
import {ExtendedObject3D, CollisionEvents} from '@enable3d/phaser-extension'

//Escenario
//Clases

//Modelos
import base from "url:../../assets/glb/nivel1_4.glb"

//Objetos adicionales
//Clases
import Caja from "../objetos/caja.js"
import Carta from "../objetos/carta.js"
import Bola from "../objetos/bola.js"
import Cofre from "../objetos/cofre.js"
import Cristal from '../objetos/cristal.js'
import Llave from '../objetos/llave.js'
import Puerta from '../objetos/puerta.js'

//Modelos
import modeloCajaBolas from "url:../../assets/glb/caja_bolas.glb"
import modeloCaja1 from "url:../../assets/glb/caja1.glb"
import modeloCaja2 from "url:../../assets/glb/caja2.glb"
import modeloCaja3 from "url:../../assets/glb/caja3.glb"
import modeloCaja4 from "url:../../assets/glb/caja4.glb"
import modeloCaja5 from "url:../../assets/glb/caja5.glb"
import modeloCaja6 from "url:../../assets/glb/caja7.glb"
import modeloCaja7 from "url:../../assets/glb/caja7.glb"

import modeloCarta1 from "url:../../assets/glb/carta1.glb"
import modeloCarta2 from "url:../../assets/glb/carta2.glb"
import modeloCarta3 from "url:../../assets/glb/carta3.glb"
import modeloCarta4 from "url:../../assets/glb/carta4.glb"

import modeloBola1 from "url:../../assets/glb/bola1.glb"
import modeloBola2 from "url:../../assets/glb/bola2.glb"
import modeloBola3 from "url:../../assets/glb/bola3.glb"

import modeloPuerta1 from "url:../../assets/glb/puerta1.glb"
import modeloPuerta2 from "url:../../assets/glb/puerta2.glb"
import modeloCristal from "url:../../assets/glb/cristal.glb"

import modeloCofre from "url:../../assets/glb/cofre_1.glb"

import modeloLlave from "url:../../assets/glb/llave.glb"
import modeloLlave_inv from "url:../../assets/glb/llave_inv.glb"

// Nombres de los modelos para las cajas del 1 al 6
const modelosCajas = [
    modeloCaja1,
    modeloCaja2,
    modeloCaja3,
    modeloCaja4,
    modeloCaja5,
    modeloCaja6
]

const modelosCartas = [
    modeloCarta1,
    modeloCarta2,
    modeloCarta3,
    modeloCarta4
]

const modelosBolas = [
    modeloBola1,
    modeloBola2,
    modeloBola3
]

const modelosPuertas = [
    modeloPuerta1,
    modeloPuerta2
]

const modelosLlaves = [
    modeloLlave,
    modeloLlave_inv
]

class Nivel0 extends ExtendedObject3D {
    constructor(escena, arrayObjetos) {
        super({ key: 'Nivel_0' })
        this.move = { x: 0, y: 0, z: 0 }
        
        // Cargar habitación
        escena.third.load.gltf(base).then(object => {
            console.log(object);
            //object.scene.children contiene los objetos del modelo 3d.
            // Agregar nivel0 como hijo de nivel
            this.add(object.scene);

            // Configurar el objeto de nivel
            this.name = "Nivel_0";
            this.scale.x = this.scale.y = this.scale.z = 1;

            // Agregar el objeto de nivel a la escena principal
            escena.third.add.existing(this);
            
            //Caja que guarda las bolas
            const cajaBolas = new Caja(escena, modeloCajaBolas, 'Caja Bolas')
            this.add(cajaBolas)
            arrayObjetos.push(cajaBolas)


            // Instanciación de las cajas del 1 al 6
            for (let i = 0; i < modelosCajas.length; i++) {
                const nombreCaja = `Caja ${i + 1}`; // Nombre de la caja (Caja 1, Caja 2, ..., Caja 6)
                const modeloCaja = modelosCajas[i]; // Ruta del modelo de la caja
                const caja = new Caja(escena, modeloCaja, nombreCaja); // Instancia de la caja
                this.add(caja); // Añadir la caja a la escena
                arrayObjetos.push(caja); // Agregar la caja al array de objetos
            }

            // Instanciación trozos carta 1 a 4
            for (let i = 0; i < modelosCartas.length; i++) {
                const nombreCarta = `Carta ${i + 1}`; // Nombre de la carta (Carta 1, Carta 2, ..., Carta 4)
                const modeloCarta = modelosCartas[i]; // Ruta del modelo de la carta
                const carta = new Carta(escena, modeloCarta, nombreCarta); // Instancia de la carta
                this.add(carta); // Añadir la carta a la escena
                arrayObjetos.push(carta); // Agregar la carta al array de objetos
            }

            // Instanciación bolas 1 a 3
            for (let i = 0; i < modelosBolas.length; i++) {
                const nombreBola = `Bola ${i + 1}`; // Nombre de la bola
                const modeloBola = modelosBolas[i]; // Ruta del modelo de la bola
                const bola = new Bola(escena, modeloBola, nombreBola); // Instancia de la bola
                this.add(bola); // Añadir la bola a la escena
                arrayObjetos.push(bola); // Agregar la bola al array de objetos
            }

            // Instanciación puertas 1 y 2
            for (let i = 0; i < modelosPuertas.length; i++) {
                const nombrePuerta = `Puerta ${i + 1}`; // Nombre de la Puerta
                const modeloPuerta = modelosPuertas[i]; // Ruta del modelo de la Puerta
                const puerta = new Puerta(escena, modeloPuerta, nombrePuerta); // Instancia de la Puerta
                this.add(puerta); // Añadir la puerta a la escena
                arrayObjetos.push(puerta); // Agregar la puerta al array de objetos
            }

            //Instanciación cristal
            const nombreCristal = `Cristal`; // Nombre del cristal
            const cristal = new Cristal(escena, modeloCristal, nombreCristal); // Instancia del cristal
            this.add(cristal); // Añadir el cristal a la escena
            arrayObjetos.push(cristal); // Agregar el cristal al array de objetos

            //Instanciación cristal
            const nombreCofre = `Cofre`; // Nombre del cofre
            const cofre = new Cofre(escena, modeloCofre, nombreCofre); // Instancia del cofre
            this.add(cofre); // Añadir el cofre a la escena
            arrayObjetos.push(cofre); // Agregar el cofre al array de objetos

            //Llave

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