import { Physics } from 'phaser';
import { AssetsList } from '../consts';

// Pour bien gérer la position, il sera nécessaire d'indiquer
// si le mur est sur le côté gauche ou droit de la plateforme
export enum EnemyWallSide {
    left = 'left',
    right = 'right'
}

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class EnemyWall extends Physics.Arcade.Sprite {

    static readonly COINANIM = 'rotate';

    constructor(scene: Phaser.Scene, x: number, y: number, side: EnemyWallSide) {

        // Il faut commencer par appeler le constructeur parent
        // --> Il faut bien passer la bonne texture
        super(scene, x, y, AssetsList.IMG_Walls);

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Gestion du corps (comme plateforme)
        // Sinon les pièces tombent ou peuvent bouger
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);

        // Correction du point d'origine
        // C'est toujours en bas y = 1
        // par contre si mur de gauche, le point d'origine est à droite (1,1)
        // si mur de droite c'est à gauche (0, 1)
        this.setOrigin(
            side === EnemyWallSide.left ? 1 : 0,
            1
        );

        // Pas besoin de les voir
        this.setVisible(false);

    }

}