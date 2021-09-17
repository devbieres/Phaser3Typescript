# Un peu de nettoyage
## Introduction
Le jeu est fonctionnel et c'est déjà une bonne chose. Par contre, une phase de nettoyage du code semble nécessaire ...

## Constantes

La liste des constantes a évolué au fil de l'eau et certaines ne sont plus nécessaires et certaines méritent d'être renommées.

Par exemple, la liste des scènes :
```typescript
export enum ScenesList {
    LoadingScene = 'loading-scene',
    LevelScene = 'level-scene',
    UIScene = 'ui-scene'
}
```

Suite à cette mise à jour, il faut aller modifier les scènes :
* Suppression de la scène HelloWorld,
* Mise à jour du label dans la classe LevelOneScene,
* Mise à jour du label dans la classe LoadingScene,
* Mise à jour de la configuration dans main.ts.

## Renommage de la scène level

La classe porte un nom qui n'a pas de sens : LevelOneScene. 

Actions :
* Renommage de LevelOneScene en LevelScene,
* Renommage du fichier également,
* Mise à jour de la configuration dans main.ts.

## Gestion des plateformes

Pour pratiquement tous les composants, il existe une classe dédiée sauf pour les plateformes. C'est à corriger...

```typescript
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
```

Puis il faut mettre à jour la méthode de création des plateformes :
```typescript
export class LevelScene extends Phaser.Scene {
    // [...]
    private _createPlatform(platformModel: PlatformModel) {
        // ---- Création de la plateforme
        const platform = new Platform(this, platformModel);
        // Ajout au tableau
        this._plateforms.push(platform);

        // --- Création des murs invisibles
        // de chaque côté de la plateforme
        this._enemyWalls.push(
            new EnemyWall(this, platform.x, platform.y, EnemyWallSide.left),
            new EnemyWall(this, platform.x + platform.width, platform.y, EnemyWallSide.right)
        );
    }
    // [...]
}
```

## Pleins d'autres petites choses

Ajout de commentaires, quelques v

