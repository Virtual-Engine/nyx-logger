# nyx-logger

Nyx Logger est un simple logger pour Node.js, conçu pour faciliter l’enregistrement des messages dans la console avec des niveaux de gravité tels que l’information, l’avertissement et l’erreur. Ce module utilise des couleurs pour rendre les messages de log plus lisibles et comprend des horodatages pour un suivi facile des événements.

# Fonctionnalités
- Niveaux de log : Enregistre les messages avec différents niveaux de gravité (info, warning, error).
- Couleurs : Utilise des couleurs pour distinguer les niveaux de log dans la console.
- Horodatage : Chaque message de log est précédé d'un horodatage pour faciliter le suivi.

# Installation
Pour installer Nyx Logger, utilise npm (Node Package Manager). Exécute la commande suivante dans ton terminal :

Copier le code
npm install nyx-logger
Utilisation
Voici comment utiliser Nyx Logger dans votre projet :

```js
// Importer le module
const log = require('nyx-logger');

// Enregistrer un message d'information
log("info", 'Ceci est un message d\'information.');

// Enregistrer un message sucess
log("done", 'Ceci est un message sucess.');

// Enregistrer un message d'avertissement
log("warn", 'Ceci est un message d\'avertissement.');

// Enregistrer un message d'erreur
log("err", 'Ceci est un message d\'erreur.');

// Enregistrer un message developer
log("dev", 'Ceci est un message developer.');
```
# Contributions
Les contributions sont les bienvenues ! Si tu souhaites améliorer le module, n'hésite pas à soumettre une pull request.

License
Ce projet est sous la licence MIT. Consulte le fichier LICENSE pour plus d'informations.
