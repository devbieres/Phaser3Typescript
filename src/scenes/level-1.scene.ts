import Phaser from 'phaser'
import { AssetsList, ScenesList } from '../consts'

export class LevelOneScene extends Phaser.Scene {

    constructor() {
        super(ScenesList.Level1Scene);
    }

    /***
     * A ce stade, les éléments ont déjà été chargés par la première scène.
     * Donc ici, normalement, rien à faire
     */
    preload() {

    }

    /**
     */
    create() {

        // Création du background.
        // Pas besoin de le charger car déjà fait dans la scène de chargement
        const background = this.add.image(0, 0, AssetsList.IMG_BackGround)
        // Il faut changer l'orgine du 
        background.setOrigin(0, 0);

    }
}