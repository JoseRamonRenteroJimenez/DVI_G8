//Bibliotecas
import {ExtendedObject3D} from '@enable3d/phaser-extension'

//Modelo
import modelo from "url:../../assets/glb/caja_bolas.glb"

//Objetos adicionales

class CajaBolas extends ExtendedObject3D {
    constructor(escena) {
        super({ key: 'caja_bolas' })
        this.move = { x: 0, y: 0, z: 0 }
        
        // Cargar caja
        escena.third.load.gltf(modelo).then(object => {
  
            // Agregar caja como hijo de ¡GAME!, no de nivel0
            this.add(object.scene);

            // Configurar el objeto de caja
            this.name = "Caja Bolas";
            this.scale.x = this.scale.y = this.scale.z = 0.2;

            //const body = this.third.add.box({ width: caja.scale.z, height: caja.scale.y, depth: caja.scale.z }, { lambert: { color: 'red', transparent: true, opacity: 0.5 } })
            //this.third.physics.add.existing(body, { mass: 1e-8, shape: 'box', width: 0.2, height: 0.2, depth: 0.2, collisionFlags: 1 })
            

            // Aquí puedes agregar lógica adicional, como la creación de física para el cajón de las bolas
            // Recuerda que necesitarás acceder a `this.third.physics` y otras propiedades de `escena`

            return this
        }).catch(error => {
            console.error('Error al cargar caja bolas en el nivel 0:', error);
        });
    }
}

export default CajaBolas;