# Amélioration du heros
## Introduction

Les pièces et les araignées sont animées mais pas notre héros ? Ce n'est pas normal.

## Changement d'image

La première chose à faire est de changer l'image du héros pour passer à une liste d'images :
```typescript
// [...]
export class LoadingScene extends Phaser.Scene {
     preload() {
        // [...]
        // this.load.image(AssetsList.IMG_Hero, 'images/hero_stopped.png');
        this.load.spritesheet(AssetsList.SPRITESHEET_Hero, 'images/hero.png', { frameWidth: 36, frameHeight: 42 });
        // [...]
     }
}
```
Evidemment, il faut penser à ajouter une entrée dans l'enum.

## Changement du héros

Le héros doit évoluer pour :
* Utiliser la bonne image,
* Créer des animations,
* Calculer l'animation à utiliser,
* Etre dans le bon sens.

## Image & Gestion des animations

Quelques premières modifications :
```typescript
// Ajout d'un enum qui contient le nom des animations
enum HeroAnim {
    Stop = 'stop',
    Run = 'run',
    Jump = 'jump',
    Fall = 'fall'

}

// La classe est une extension d'un sprite pour en avoir
// toutes les méthodes est service
export class Hero extends Physics.Arcade.Sprite {
    // [...]
    constructor(scene: Phaser.Scene, heroModel: HeroModel) {
        // [...]

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
}
```

Il a maintenant de quoi montrer ce qu'il fait. Il reste à utiliser la bonne au bon moment ...

## La bonne animation au bon moment

Pour faciliter, une méthode est mise en place :
```typescript
export class Hero extends Physics.Arcade.Sprite {
    // [...]
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
```

## Gestion du sens

En fonction du mouvement, il faut mettre à jour le sens du heros. Idem, une méthode est mise en place :
```typescript
protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
        this.scaleX = -1;
    } else {
        this.scaleX = 1;
    }
}
```

## Mise à jour de preUpdate

Il faut maintenant utiliser les méthodes ci-dessus dans la méthode preUpdate :
```typescript
export class Hero extends Physics.Arcade.Sprite {
    // [...]
    preUpdate() {
        // [...]

        // A la fin ...
        // En fonction, changement d'animation
        this.anims.play(this.getAnimationName(), true);

        // Il faut mettre le personne du bon côté
        this.checkFlip();
    }
}
```

