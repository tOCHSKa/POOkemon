/* Combat de Pokémon en JavaScript avec la POO
Objectif
Vous allez simuler un combat de Pokémon en utilisant la POO en JavaScript.
L’objectif est de coder un système où un dresseur peut invoquer ses Pokémon pour se
battre contre d'autres Pokémon, et utiliser des objets pendant le combat.
Classes à implémenter :

----------------------------------------------------------------------------------------

1. Classe Pokemon :
● Attributs :
● nom : le nom du Pokémon
● hp : points de vie du Pokémon.
● attaque : l’attaque du Pokémon.
● defense : la défense du Pokémon.
● sort : une fonction représentant le sort spécial du Pokémon.
● Méthodes :
● attaquer : inflige des dégâts en prenant en compte la défense de la
cible.
● utiliserSort : utilise le sort du Pokémon sur une cible.
● afficherStats : affiche les statistiques du Pokémon
● estKO : retourne true si les HP du Pokémon sont à 0 ou moins, sinon
false.

----------------------------------------------------------------------------------------

2. Classe Dresseur :
● Attributs :
● nom : le nom du dresseur.
● pokemons : Array de Pokémon.
● inventaire : Array d’objets que le dresseur peut utiliser pendant le
combat.
● Méthodes :
● ajouterPokemon: ajoute un Pokémon à l'équipe du dresseur.
● ChoisirPokemon : choisit un Pokémon dans l'équipe du dresseur
pour l'envoyer au combat.
● AjouterObjet : ajoute un objet à l'inventaire du dresseur.
● UtiliserObjet : utilise un objet sur un Pokémon et le retire de
l’inventaire.
● TousPokemonKO : vérifie si tous les Pokémon du dresseur sont K.O.

----------------------------------------------------------------------------------------

3. Classe Objet :
● Attributs :
● nom : le nom de l'objet
● effet : fonction appliquant l'effet de l'objet
● Méthode :
● utiliser :utilise l’objet sur une cible
Exemples d’objets :
● Potion : soigne X hp
● Boost d'attaque : Augmente l’attaque
● Bouclier : Augmente la défense

----------------------------------------------------------------------------------------

Étapes à réaliser :
1. Création des classes : Créer les classes Pokemon, Dresseur, et Objet avec leurs
attributs et méthodes.
2. Création de Pokémon et objets : Créez au moins deux Pokémon avec des sorts
spéciaux uniques (ex. : attaque éclair pour Pikachu, attaque empoisonnée pour
Bulbizarre). Créez aussi quelques objets à utiliser pendant le combat.
3. Combat :
● Créez deux dresseurs, chacun avec au moins un Pokémon dans son équipe.
● Simulez un combat en plusieurs tours où chaque dresseur choisit un
Pokémon pour attaquer l’adversaire ou utiliser un objet de son inventaire.
● À chaque tour, affichez les statistiques des Pokémon et vérifiez si l’un des
Pokémon est K.O.
4. Fin du combat : Le combat s’arrête lorsqu’un dresseur n’a plus de Pokémon
capables de se battre (tous ses Pokémon sont K.O.).
Bonne chance ! */

class Pokemon {
    constructor(nom, hp, attaque, defense, sort) {
        /**
         * Initialise un Pokémon avec son nom, ses points de vie (hp), son attaque, sa défense, et son sort spécial.
         */
        this.nom = nom;
        this.hp = hp;
        this.attaque = attaque;
        this.defense = defense;
        this.sort = sort; // Le sort est une fonction passée lors de la création du Pokémon
    }

    attaquer(cible) {
        /**
         * Inflige des dégâts à une cible en prenant en compte la défense de la cible.
         * Dégâts = attaque de l'attaquant - défense de la cible.
         * Les HP de la cible sont réduits par les dégâts calculés.
         */
        const degats = Math.max(this.attaque - cible.defense, 0); // S'assurer que les dégâts ne sont pas négatifs
        cible.hp -= degats;
        console.log(`${this.nom} attaque ${cible.nom} et inflige ${degats} dégâts !`);
        if (cible.hp < 0) {
            cible.hp = 0; // Les HP ne peuvent pas être négatifs
        }
    }

    utiliserSort(cible) {
        /**
         * Utilise le sort spécial du Pokémon sur une cible.
         */
        console.log(`${this.nom} utilise son sort spécial sur ${cible.nom} !`);
        this.sort(this, cible); // Appel de la fonction de sort spéciale
    }

    afficherStats() {
        /**
         * Affiche les statistiques actuelles du Pokémon : nom, HP, attaque et défense.
         */
        console.log(`Statistiques de ${this.nom} :`);
        console.log(`  HP: ${this.hp}`);
        console.log(`  Attaque: ${this.attaque}`);
        console.log(`  Défense: ${this.defense}`);
    }

    estKO() {
        /**
         * Retourne true si les HP du Pokémon sont à 0 ou moins, sinon false.
         */
        return this.hp <= 0;
    }
}

class Dresseur {
    constructor(nom) {
        /**
         * Initialise un Dresseur avec son nom, une équipe de Pokémon (array vide au départ), et un inventaire d'objets.
         */
        this.nom = nom;
        this.pokemons = [];  // Liste des Pokémon du dresseur
        this.inventaire = []; // Liste des objets dans l'inventaire du dresseur
    }

    ajouterPokemon(pokemon) {
        /**
         * Ajoute un Pokémon à l'équipe du dresseur.
         */
        this.pokemons.push(pokemon);
        console.log(`${pokemon.nom} a été ajouté à l'équipe de ${this.nom}.`);
    }

    choisirPokemon(index) {
        /**
         * Choisit un Pokémon dans l'équipe du dresseur pour l'envoyer au combat.
         * Retourne le Pokémon choisi si valide, sinon retourne null.
         */
        if (index >= 0 && index < this.pokemons.length) {
            const pokemon = this.pokemons[index];
            if (!pokemon.estKO()) {
                console.log(`${this.nom} a choisi ${pokemon.nom} pour le combat !}`);
                return pokemon;
            } else {
                console.log(`${pokemon.nom} est K.O. et ne peut pas combattre !`);
                return null;
            }
        } else {
            console.log("Indice invalide. Aucun Pokémon n'a été sélectionné.");
            return null;
        }
    }

    ajouterObjet(objet) {
        /**
         * Ajoute un objet à l'inventaire du dresseur.
         */
        this.inventaire.push(objet);
        console.log(`${objet.nom} a été ajouté à l'inventaire de ${this.nom}.`);
    }

    utiliserObjet(nomObjet, pokemon) {
        /**
         * Utilise un objet sur un Pokémon et retire cet objet de l'inventaire.
         * Si l'objet est trouvé et utilisé, il est retiré de l'inventaire.
         */
        const indexObjet = this.inventaire.findIndex(objet => objet.nom === nomObjet);

        if (indexObjet !== -1) {
            const objet = this.inventaire[indexObjet];
            objet.utiliser(pokemon);  // Appelle la méthode d'utilisation de l'objet
            this.inventaire.splice(indexObjet, 1);  // Retire l'objet de l'inventaire
            console.log(`${objet.nom} a été utilisé sur ${pokemon.nom}.`);
        } else {
            console.log(`L'objet ${nomObjet} n'est pas disponible dans l'inventaire.`);
        }
    }

    tousPokemonKO() {
        /**
         * Vérifie si tous les Pokémon du dresseur sont K.O. Retourne true si tous les Pokémon sont K.O., sinon false.
         */
        return this.pokemons.every(pokemon => pokemon.estKO());
    }
}

class Objet {
    constructor(nom, effet) {
        /**
         * Initialise un objet avec son nom et son effet (une fonction).
         */
        this.nom = nom;
        this.effet = effet;  // Fonction représentant l'effet de l'objet
    }

    utiliser(cible) {
        /**
         * Utilise l'objet sur une cible en appliquant l'effet de l'objet.
         */
        console.log(`Utilisation de ${this.nom} sur ${cible.nom} !`);
        this.effet(cible);  // Applique l'effet sur la cible
    }
}

class Potion extends Objet {
    constructor(soins) {
        super("Potion", (pokemon) => {
            pokemon.hp = Math.min(pokemon.hp + soins, 100);  // Soigne sans dépasser 100 HP
            console.log(`${pokemon.nom} récupère ${soins} HP !`);
        });
        this.soins = soins;
    }
}

class BoostAttaque extends Objet {
    constructor(augmentation) {
        super("Boost d'attaque", (pokemon) => {
            pokemon.attaque += augmentation;
            console.log(`${pokemon.nom} voit son attaque augmenter de ${augmentation} points !`);
        });
        this.augmentation = augmentation;
    }
}
class Bouclier extends Objet {
    constructor(augmentation) {
        super("Bouclier", (pokemon) => {
            pokemon.defense += augmentation;
            console.log(`${pokemon.nom} voit sa défense augmenter de ${augmentation} points !`);
        });
        this.augmentation = augmentation;
    }
}



// Simulation d'un combat en plusieurs tours
function demarrerCombat(dresseur1, dresseur2) {
    let tour = 1;

    while (!dresseur1.tousPokemonKO() && !dresseur2.tousPokemonKO()) {
        console.log(`\n===== Tour ${tour} =====`);

        // Dresseur 1 choisit une action (attaque ou utilisation d'objet)
        console.log(`\n${dresseur1.nom}, c'est votre tour !`);
        const pokemon1 = dresseur1.choisirPokemon(0); // Le premier Pokémon de l'équipe est sélectionné
        if (!pokemon1) break; // S'il n'y a plus de Pokémon, le combat s'arrête

        // Action : attaque ou utilisation d'objet
        if (Math.random() > 0.5) {
            // Attaque
            pokemon1.attaquer(dresseur2.pokemons[0]); // Le premier Pokémon de l'équipe adverse est attaqué
        } else {
            // Utiliser un objet si disponible
            if (dresseur1.inventaire.length > 0) {
                const objet = dresseur1.inventaire[0]; // Utiliser le premier objet de l'inventaire
                dresseur1.utiliserObjet(objet.nom, pokemon1);
            } else {
                console.log("Aucun objet disponible, vous attaquez !");
                pokemon1.attaquer(dresseur2.pokemons[0]);
            }
        }
        pokemon1.afficherStats(); // Afficher les stats du Pokémon après l'action

        // Vérifier si l'adversaire est KO
        if (dresseur2.pokemons[0].estKO()) {
            console.log(`${dresseur2.pokemons[0].nom} est K.O.!`);
            if (dresseur2.tousPokemonKO()) {
                console.log(`${dresseur1.nom} remporte le combat !`);
                break;
            }
        }

        // Dresseur 2 choisit une action (attaque ou utilisation d'objet)
        console.log(`\n${dresseur2.nom}, c'est votre tour !`);
        const pokemon2 = dresseur2.choisirPokemon(0); // Le premier Pokémon de l'équipe est sélectionné
        if (!pokemon2) break;

        // Action : attaque ou utilisation d'objet
        if (Math.random() > 0.5) {
            pokemon2.attaquer(dresseur1.pokemons[0]); // Le premier Pokémon de l'équipe adverse est attaqué
        } else {
            if (dresseur2.inventaire.length > 0) {
                const objet = dresseur2.inventaire[0];
                dresseur2.utiliserObjet(objet.nom, pokemon2);
            } else {
                console.log("Aucun objet disponible, vous attaquez !");
                pokemon2.attaquer(dresseur1.pokemons[0]);
            }
        }
        pokemon2.afficherStats(); // Afficher les stats du Pokémon après l'action

        // Vérifier si l'adversaire est KO
        if (dresseur1.pokemons[0].estKO()) {
            console.log(`${dresseur1.pokemons[0].nom} est K.O.!`);
            if (dresseur1.tousPokemonKO()) {
                console.log(`${dresseur2.nom} remporte le combat !`);
                break;
            }
        }

        // Passer au tour suivant
        tour++;
    }
}

// Création des Pokémon avec des sorts spéciaux
const pikachu = new Pokemon("Pikachu", 80, 30, 10, (attack, target) => {
    const degats = 40;
    target.hp -= degats;
    console.log(`${attack.nom} utilise Éclair sur ${target.nom} et inflige ${degats} dégâts !`);
});
const bulbizarre = new Pokemon("Bulbizarre", 100, 25, 20, (attack, target) => {
    console.log(`${attack.nom} utilise Poudre Dodo sur ${target.nom}... mais cela n'a aucun effet.`);
});
const salameche = new Pokemon("Salameche", 90, 35, 15, (attack, target) => {
    const degats = 45;
    target.hp -= degats;
    console.log(`${attack.nom} utilise Flamme sur ${target.nom} et inflige ${degats} dégâts !`);
});

// Création des dresseurs
const dresseur1 = new Dresseur("Sacha");
const dresseur2 = new Dresseur("Ondine");

// Ajout des Pokémon aux équipes
dresseur1.ajouterPokemon(pikachu);
dresseur1.ajouterPokemon(bulbizarre);

dresseur2.ajouterPokemon(salameche);

// Ajout d'objets aux inventaires
dresseur1.ajouterObjet(new Potion(20)); // Sacha a une Potion
dresseur2.ajouterObjet(new BoostAttaque(10)); // Ondine a un Boost d'attaque

// Démarrer le combat
demarrerCombat(dresseur1, dresseur2);

