import { Physics } from 'phaser';
import { AssetsList } from '../consts';
import { KeyModel } from '../models/key.model';

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class Key extends Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, keyModel: KeyModel) {

        // Il faut commencer par appeler le constructeur parent
        // --> Il faut bien passer la bonne texture
        super(scene, keyModel.x, keyModel.y, AssetsList.IMG_Key);

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Gestion du corps (comme plateforme)
        // Sinon les pièces tombent ou peuvent bouger
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);

        this.setOrigin(0.5, 0.5);

        // Ajout d'une animation sur la clé pour rendre cela plus dynamique
        scene.tweens.add({
            targets: this,
            y: { from: this.y - 3, to: this.y + 6 },
            yoyo: true,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,
        });
    }

}