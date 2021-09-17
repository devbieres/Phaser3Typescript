import { Physics } from 'phaser';
import { PlatformModel } from '../models/plateform.model';

export class Platform extends Physics.Arcade.Sprite {

    /**
     */
    constructor(scene: Phaser.Scene, plateformModel: PlatformModel) {

        // Appel du parent
        super(scene, plateformModel.x, plateformModel.y, plateformModel.image);

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Mise à jour du Body
        const body = this.body as Physics.Arcade.Body;
        // Par contre, pour éviter qu'elle tombe, il faut leur dire que la gravité n'a pas d'impact
        body.setAllowGravity(false);
        // Et pour éviter que si quelqu'un marche dessus, la plateforme glisse
        body.setImmovable(true);

        // Pour que le placement soit cohérent
        this.setOrigin(0, 0);

    }

}