import { Physics } from 'phaser';
import { AssetsList, EventList } from '../consts';
import { HeroModel } from '../models/hero.model';

enum HeroAnim {
    Stop = 'stop',
    Run = 'run',
    Jump = 'jump',
    Fall = 'fall'

}

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class Hero extends Physics.Arcade.Sprite {

    // Vitesse
    static readonly SPEED = 200;
    static readonly BOUNCE_SPEED = 200;
    static readonly JUMP = 600;

    // Vrai si le joueur à collecter la clé
    private _hasKey: boolean = false;
    public get HasKey(): boolean { return this._hasKey; }
    public set HasKey(value: boolean) { this._hasKey = value; }

    // Accès au clavier
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, heroModel: HeroModel) {

        // Il faut commencer par appeler le constructeur parent
        super(scene, heroModel.x, heroModel.y, AssetsList.SPRITESHEET_Hero);

        // Initialisation
        this.cursors = this.scene.input.keyboard.createCursorKeys()

        // Ajout à la scéne
        scene.add.existing(this);
        // Mais également faisant partie de la "physic"
        scene.physics.add.existing(this);

        // Limite l'acteur au tableau
        (this.body as Physics.Arcade.Body).setCollideWorldBounds(true);

        // Création des différents animations
        // -- Stop
        this.scene.anims.create({
            key: HeroAnim.Stop,
            frames: this.anims.generateFrameNumbers(AssetsList.SPRITESHEET_Hero, { frames: [0] })
        });
        // -- Run
        this.scene.anims.create({
            key: HeroAnim.Run,
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(AssetsList.SPRITESHEET_Hero, { frames: [1, 2] })
        });
        // -- Jump
        this.scene.anims.create({
            key: HeroAnim.Jump,
            frames: this.anims.generateFrameNumbers(AssetsList.SPRITESHEET_Hero, { frames: [3] })
        });
        // -- Fall
        this.scene.anims.create({
            key: HeroAnim.Fall,
            frames: this.anims.generateFrameNumbers(AssetsList.SPRITESHEET_Hero, { frames: [4] })
        });

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
                // Event
                this.scene.game.events.emit(EventList.HERO_JUMP);
            }
        }

        // En fonction, changement d'animation
        this.anims.play(this.getAnimationName(), true);

        // Il faut mettre le personne du bon côté
        this.checkFlip();
    }

    protected checkFlip(): void {
        if (this.body.velocity.x < 0) {
            this.scaleX = -1;
            this.body.setOffset(this.width, 0);
        } else {
            this.scaleX = 1;
            this.body.setOffset(0, 0);
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
     * Vrai si la vélocité y est < 0
     * @returns bool
     */
    public isJumping(): boolean {
        return this.body.velocity.y > 0;
    }

    /**
     * Un petit effet rebond
     */
    public bounce() {
        this.body.velocity.y = -Hero.BOUNCE_SPEED;
    }

    /**
     * Calcul le nom de l'animation en fonction de l'état du hero
     */
    private getAnimationName(): string {
        // Par défaut, stop
        let name = HeroAnim.Stop;

        if (this.isJumping()) {
            // Jumping
            name = HeroAnim.Jump;
        } else if (this.isFalling() && !this.body.touching.down) {
            // Falling
            name = HeroAnim.Fall;
        } else if (this.body.velocity.x !== 0 && this.body.touching.down) {
            // Running
            name = HeroAnim.Run;
        }
        return name;
    }


}