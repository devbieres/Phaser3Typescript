import { AssetsList } from '../consts';


export class ScoreContainer extends Phaser.GameObjects.Container {

    // Les chiffres sous forme de chaîne
    // Nécessaire pour la fonction RetroFont pour trouver les
    // bons caractères dans l'image
    static readonly NUMBERS_STR = '0123456789X ';

    /**
     * La zone de text qui est dynamic et basé sur RetroFont
     */
    protected dynamic: Phaser.GameObjects.BitmapText;

    /**
     * La valeur qui doit être affichée
     */
    protected _value = 0;

    public get value() {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
    }

    // L'image
    private _key!: Phaser.GameObjects.Image;

    // Vrai si le joueur à la clé
    private _hasKey = false;
    public get HasKey(): boolean { return this._hasKey; }
    public set HasKey(value: boolean) { this._hasKey = value; }

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        // Création de la clé
        this._key = scene.add.image(0, 19, AssetsList.SPRITESHEET_KeyIcon);
        this._key.setOrigin(0, 0.5);


        // Création de la pièce
        // Il faut modifier sa position par rapport à la clé
        let coinIcon = scene.add.image(this._key.width + 7, 0, AssetsList.IMG_Coin);
        coinIcon.setOrigin(0, 0);

        // Creation du contenu qui sera mappé sur la valeur
        // et sur l'image
        scene.cache.bitmapFont.add(
            AssetsList.IMG_FontNumber,
            Phaser.GameObjects.RetroFont.Parse(scene, {
                image: AssetsList.IMG_FontNumber,
                width: 20, height: 26,
                chars: ScoreContainer.NUMBERS_STR,
                charsPerRow: 6,
                "spacing.x": 0,
                "spacing.y": 0,
                lineSpacing: 1,
                "offset.x": 0,
                "offset.y": 0
            })
        );

        // Creation de l'image qui est affiché
        this.dynamic = scene.add.bitmapText(
            coinIcon.x + coinIcon.width + 10,
            coinIcon.height / 2,
            AssetsList.IMG_FontNumber);
        this.dynamic.setOrigin(0, 0.5);

        // Ajout au container
        this.add(this._key);
        this.add(coinIcon);
        this.add(this.dynamic);

    }

    preUpdate() {
        this.dynamic.text = `X${this.value}`;
        this._key.setFrame(this.HasKey ? 1 : 0);
    }


}