//Bibliotecas
import {enable3d, Canvas, Scene3D, ExtendedObject3D, THREE, FirstPersonControls} from '@enable3d/phaser-extension'

//Escenario
import base from "url:../../assets/glb/nivel1_1.glb"

//Objetos adicionales

class nivel0 extends ExtendedObject3D {
    constructor(escena) {
        super({ key: 'Nivel_0' })
        this.move = { x: 0, y: 0, z: 0 }
        
        // Cargar habitación
        escena.third.load.gltf(base).then(object => {
            const nivel = new ExtendedObject3D(); // Crear un nuevo objeto 3D para la habitación

            // Agregar la escena cargada al objeto de nivel
            nivel.add(object.scene);

            // Configurar el objeto de nivel
            nivel.name = "Nivel_0";
            nivel.scale.x = nivel.scale.y = nivel.scale.z = 0.2;

            // Agregar el objeto de nivel a la escena principal
            escena.third.add.existing(nivel);

            console.log(nivel); // Imprimir información sobre el objeto de nivel

            //const body = this.third.add.box({ width: caja.scale.z, height: caja.scale.y, depth: caja.scale.z }, { lambert: { color: 'red', transparent: true, opacity: 0.5 } })
            //this.third.physics.add.existing(body, { mass: 1e-8, shape: 'box', width: 0.2, height: 0.2, depth: 0.2, collisionFlags: 1 })
            

            // Aquí puedes agregar lógica adicional, como la creación de física para el nivel
            // Recuerda que necesitarás acceder a `this.third.physics` y otras propiedades de `escena`
        }).catch(error => {
            console.error('Error al cargar el nivel 0:', error);
        });
    }
}

export default nivel0;
