# Changer de niveau
## Introduction
Bien que deux fichiers de niveau soient présents, un seul est utilisé à présent et cela implique que le joueur reste sur le même niveau à chaque fois.

## Déplacement du chargement

Actuellement, le chargement du fichier JSON est effectué dans la méthode preLoad de la classe LevelOneScene. Ce chargement est déplacé dans la scène dédiée à cela et complété par le chargement de l'autre niveau :
```typescript
export class LoadingScene extends Phaser.Scene {

    // [...]
    preload() {
        // [...]
        // Chargement des niveaux
        this.load.json('level:00', `data/level00.json`);
        this.load.json('level:01', `data/level01.json`);
        // [...]
    }
```

## Niveau par défaut et gestion d'un paramètre

Une proprité est ajoutée à la classe LevelOneScene pour savoir à quel niveau est le joueur :
```typescript
private currentLevel = 0;
```

La méthode create accepte un paramètre qui correspond aux données qui peuvent être passée quand une scène est lancée. Afin d'avoir une vérification, un model est ajouté :
```typescript
export class StartModel {
    public level: number = 0;
    public lost: boolean = false;
}
```

et le paramètre est ajouté à la fonction create de la classe LevelOneScene et est utilisé pour déterminer le niveau en cours. Ce même niveau est utilisé pour indiquer ce qu'il faut utiliser pour créer la scène :
```typescript
// [...]
create(startModel: StartModel) {
    // Récupération des informations
    this.currentLevel = (startModel.level || 0) % 2;
    // [...]
    this._createLevel(this.cache.json.get(`level:0${this.currentLevel}`));
}
```

## Passé des paramètres à la relance

Le jeu est relancé à deux endroits:  quand le joueur gagne et quand le joueur perd.

Dans le premier cas c'est à dire quand il passe la porte, l'appel est modifié pour indiquer un changement de niveau :
```typescript
this.scene.restart({ level: this.currentLevel + 1, lost: false });
```

Dans le second cas c'est à dire quand il rencontre une araigné, l'appel est modifié pour indiquer que le niveau reste mais qu'il a perdu :
```typescript
this.scene.restart({ level: this.currentLevel, lost: true });
```

A ce stade, l'utilisateur peut passer les niveaux les uns après les autres.

## Pièces et clé

Un souci demeure : quand il change de niveau, l'icone clé reste comme s'il l'avait. De même quand, il perd le nombre de pièce reste.

_NOTE : dans le tuto d'origine, il est fait mention d'appeler game.state.start. Mais cette fonction ne semble plus présente..._

En fait, ce qu'il manque c'est un moyen de dire à la scène UI de se mettre à jour. La communication entre la scène de jeu et celle d'UI passant par des évènements, c'est cette solution qui va être utilisée.

La liste des évènements est modifiée pour avoir un évènement supplémentaire :
```typescript
export enum EventList {
    GET_COIN = 'GET_COIN',
    KILL_SPIDER = 'KILL_SPIDER',
    HERO_JUMP = 'HERO_JUMP',
    OPEN_DOOR = 'OPEN_DOOR',
    GET_KEY = 'GET_KEY',
    GAME_END = 'GAME_END'
}
```

Dans la classe LevelOneScene, une méthode centralise la fin du jeu et l'émission de l'évènement :
```typescript
private _restartScene(startModel: StartModel) {
    /**
     * Relance la scène
     * @param startModel Infos
     */
    private _restartScene(startModel: StartModel) {
        // Event
        this.game.events.emit(EventList.GAME_END, startModel);
        // Relance
        this.scene.restart(startModel);
    }
}
```

_Il serait mieux de faire un model dédié pour passer des informations à l'évènement mais dans le cadre de cette exercice c'est suffisant._

Les deux appels à this.scene.restart sont remplacés par l'appel à la nouvelle méthode en passant les paramètres identiques.
```typescript
// [...]
    // this.scene.restart({ level: this.currentLevel + 1, lost: false });
    this._restartScene({ level: this.currentLevel + 1, lost: false });
// [...]
    // this.scene.restart({ level: this.currentLevel, lost: true });
    this._restartScene({ level: this.currentLevel, lost: true });
// [...]
```

Pour le moment, cela ne change rien au scénario du jeu. Pour finaliser, il faut gérer l'évènement fin du jeu dans UIScene :
```typescript
export class UIScene extends Scene {
    // [...]
    this.game.events.on(EventList.GAME_END, (data: StartModel) => {
        // Il n'a plus la clé
        this.scoreContainer.HasKey = false;
        // S'il a perdu, il n'a plus de pièce
        if (data.lost) {
            this.scoreContainer.value = 0;
        }
    });
    // [...]
}
```

Et là ... c'est bien.

Il faut ne pas oublier d'enlever le mode debug pour ne plus avoir les carrés rouges.

