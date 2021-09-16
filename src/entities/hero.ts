import { Physics } from 'phaser';
import { AssetsList } from '../consts';
import { HeroModel } from '../models/hero.model';

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class Hero extends Physics.Arcade.Sprite {

    // Vitesse
    static readonly SPEED = 200;
    static readonly BOUNCE_SPEED = 200;
    static readonly JUMP = 600;

    // Accès au clavier
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, heroModel: HeroModel) {

        // Il faut commencer par appeler le constructeur parent
        super(scene, heroModel.x, heroModel.y, AssetsList.IMG_Hero);

        // Initialisation
        this.cursors = this.scene.input.keyboard.createCursorKeys()

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Limite l'acteur au tableau
        (this.body as Physics.Arcade.Body).setCollideWorldBounds(true);
    }

    preUpdate() {
        // Par défaut, il ne doit pas bouger
        this.body.velocity.x = 0;

        // Gestion de doite et gauche
        if (this.cursors.left.isDown) {
            // Le joueur veut aller à gauche
            this.body.velocity.x = -1 * Hero.SPEED;
        }
        else if (this.cursors.right.isDown) {
            // Le joeur veur aller à droite
            this.body.velocity.x = 1 * Hero.SPEED;
        }

        // Gestion du saut
        if (this.cursors.up.isDown) {
            // Est-ce qu'il n'est pas déjà en cours de saut ?
            if (this.body.touching.down) {
                // RAPPEL : 0,0 c'est en haute. Donc quand il saute,
                // il descend :)
                this.body.velocity.y = -1 * Hero.JUMP;
            }
        }
    }

    /**
     * Vrai si la vélocité y est > 0
     * @returns bool
     */
    public isFalling(): boolean {
        return this.body.velocity.y > 0;
    }

    /**
     * Un petit effet rebond
     */
    public bounce() {
        this.body.velocity.y = -Hero.BOUNCE_SPEED;
    }



}