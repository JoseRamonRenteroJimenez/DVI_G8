import Star from './star.ts';
import Phaser from 'phaser'

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends ExtendedObject3D
    {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X 
     * @param {number} y Coordenada Y Altura
     * @param {number} z Coordenada Z
     * 
     */
    constructor(scene, x, y, z) {
        super(scene, x, y, 'player');
        this.score = 0;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        this.speed = 300;
        this.jumpSpeed = -400;
        // Esta label es la UI en la que pondremos la puntuación del jugador
        this.label = this.scene.add.text(10, 10, "");
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.updateScore();
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(this.jumpSpeed);
        }
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        }
        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        }
        else {
            this.body.setVelocityX(0);
        }
    }
}