# Pr8note — version web

Version compilée et prête à l'emploi de **Pr8note**, le client scolaire indépendant, moderne et fluide.

## 🌐 Accéder au client

**https://petipotam17.github.io/Pr8note_web/**

Aucune installation : le lien ouvre directement Pr8note dans le navigateur. L'application est aussi une PWA : elle peut être installée sur l'écran d'accueil (Safari : Partager → Sur l'écran d'accueil) et fonctionne hors ligne après la première visite.

## 📦 Contenu

- `index.html` + `assets/` : build statique Vite (React + TypeScript)
- `icons/` : icônes de l'application
- `manifest.webmanifest` : configuration PWA
- `sw.js` : cache hors ligne
- `.nojekyll` : publication GitHub Pages sans Jekyll

## 🧑‍💻 Source

Le code source complet, les instructions de développement et la création de l'application macOS `.app` se trouvent dans le dépôt :

**https://github.com/petipotam17/Pr8note_client**

## 🔐 Connexion & données

L’écran de connexion permet de se connecter avec un **compte élève MonLycée.net** (identifiant et mot de passe), sans administrateur ENT : le serveur Pr8note ouvre la session officielle du portail et ne stocke pas le mot de passe. Un flux **OIDC + PKCE** reste disponible lorsqu’un client public est autorisé par l’ENT. **ÉduConnect** et les autres ENT s’ouvrent via leur portail officiel.

Les notes, devoirs et l’emploi du temps restent des **données de démonstration** : aucune synchronisation PRONOTE n’est effectuée. Les actions (devoirs cochés, messages lus, réglages) sont enregistrées localement dans le navigateur et peuvent être exportées en JSON.

Pr8note n'est pas affilié à Index Éducation, PRONOTE ni MonLycée.net.
