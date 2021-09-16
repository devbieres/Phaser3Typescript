import { Scene } from 'phaser';
import { AssetsList, EventList, ScenesList } from '../consts';
import { ScoreContainer } from '../ui/score.container';

export class UIScene extends Scene {

    private scoreContainer!: ScoreContainer;

    /**
     * 
     */
    constructor() {
        super(ScenesList.UIScene);
    }

    /**
     * Creation ...
     */
    create() {

        // Création du conteneur qui affiche le score
        this.scoreContainer = new ScoreContainer(this, 10, 10);
        this.add.existing(this.scoreContainer);

        // Ecoute des évènements
        this.game.events.on(EventList.GET_COIN, this.manageGetCoin, this);


    }

    /**
     * Gère quand notre héros capture une pièce
     */
    private manageGetCoin() {
        this.scoreContainer.value += 1;
    }



}