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
        // -- Collecte de pièces
        this.game.events.on(EventList.GET_COIN, this.manageGetCoin, this);
        // -- Saut
        this.game.events.on(EventList.HERO_JUMP, () => this.sound.play(AssetsList.SND_Jump));
        // -- Kill a spider
        this.game.events.on(EventList.KILL_SPIDER, () => this.sound.play(AssetsList.SND_Stomp));
        // -- Récupération de la clé
        this.game.events.on(EventList.GET_KEY, () => {
            this.sound.play(AssetsList.SND_Key);
            this.scoreContainer.HasKey = true;
        });
        // -- Gestion de la porte
        this.game.events.on(EventList.OPEN_DOOR, () => this.sound.play(AssetsList.SND_Door));

    }

    /**
     * Gère quand notre héros capture une pièce
     */
    private manageGetCoin() {
        // Mise à jour du score
        this.scoreContainer.value += 1;
        this.sound.play(AssetsList.SND_Coin);
    }



}