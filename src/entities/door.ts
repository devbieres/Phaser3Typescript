import { Physics } from 'phaser';
import { AssetsList } from '../consts';
import { DoorModel } from '../models/door.model';

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class Door extends Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, doorModel: DoorModel) {

        // Il faut commencer par appeler le constructeur parent
        // --> Il faut bien passer la bonne texture
        super(scene, doorModel.x, doorModel.y, AssetsList.SPRITESHEET_Door);

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Gestion du corps (comme plateforme)
        // Sinon les pièces tombent ou peuvent bouger
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);

        // Mise à jour de l'origin pour placer la porte en fonction
        // du milieu en "bas"
        this.setOrigin(0.5, 1);

    }

}