# Projet CSL

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> Ce projet utilise les micro-services pour filtrer et collecter des données

## Prérequis

Pour pouvoir lancer ce projet vous devez avoir installé les outils suivants :

- [Docker Desktop](#installation-de-docker-desktop)
- [Insonmia](#installation-de-insomnia)

Assurez-vous d'avoir les ports `3000`, `3306` et `27017` de disponible sur votre machine.

### Installation de Docker Desktop

Docker Desktop est un outil qui permet de gérer des conteneurs Docker sur votre
machine.
Il est disponible pour Windows, MacOS et Linux.

A l'installation de Docker Desktop : Docker engine et Docker compose seront
installés.
De plus Docker Desktop installe une interface graphique pour gérer les
conteneurs.

Pour installer Docker Desktop sur votre machine vous pouvez suivre les
instructions sur
le site officiel de Docker :
[https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

Une fois Docker Desktop installé, vous pouvez vérifier que tout fonctionne
correctement
en ouvrant un terminal et en tapant les commandes suivantes :

```sh
  docker --version
``` 

```sh
docker-compose --version
```

Vous pouvez également vérifier que Docker Desktop est bien lancé en ouvrant
l'interface graphique.

![Docker Desktop](.readme/docker-desktop.png)

### Installation de Insomnia

Insomnia est un outil qui permet de tester des API REST.
Il est disponible pour Windows, MacOS et Linux.

Pour installer Insomnia sur votre machine vous pouvez suivre les instructions
sur
le site officiel de Insomnia : https://insomnia.rest/download

Une fois Insomnia installé, vous pouvez le lancer et vous obtiendrez cette
interface :
![Insomnia](.readme/insomnia.png)

Vous pouvez ensuite importer le fichier de test `2024-12-17.json` qui se trouve
dans le dossier `app/test/insomnia/`.

Pour cela, cliquez sur le bouton `import`
![Import button](.readme/insomnia-import-1.png)

Cliquez sur `+ File` puis `Choose a file` et sélectionnez le fichier
`2024-12-17.json` et cliquez sur `open` ou `Ouvrir`.
![Search for file](.readme/insomnia-import-2.png)

Enfin cliquez sur `Scan` pour scanner le fichier à importer puis sur `Import`.
![Scan file](.readme/insomnia-import-3.png)
![Import file](.readme/insomnia-import-4.png)

Et voilà vous avez importé le fichier de test ! 🎉

Une nouvelle collection est apparue, vous pouvez la sélectionner pour voir les
requêtes qui ont été importées.
![Collection](.readme/insomnia-import-5.png)
![Requests](.readme/insomnia-import-6.png)

## Lancez le projet

Pour lancer le projet, ouvrez votre terminal et rendez-vous à la racine du
projet.
Ensuite exécutez la commande suivante :

```sh
docker-compose -up -d --build
```

Cette commande va construire les images Docker et lancer les conteneurs.
En effet, cette application contient 3 services :

- `app` : expose l'API REST (sur le port `3000`)
- `mongodb` : contient la base de données qui va stocker les données filtrées (sur le port `27017`)
- `mariadb`: contient la base de donnée des logs (sur le port `3306`)

Vous pouvez vérifier que les conteneurs sont bien lancés en exécutant la
commande suivante :

```sh
docker ps
```

Vous devriez voir les 3 conteneurs lancés.
```
CONTAINER ID   IMAGE                           COMMAND                  CREATED       STATUS       PORTS                    NAMES
7d90351a5dd4   compo-service-log-project-app   "docker-entrypoint.s…"   2 hours ago   Up 2 hours   0.0.0.0:3000->3000/tcp   app
f77729fee31b   mongo                           "docker-entrypoint.s…"   2 hours ago   Up 2 hours   27017/tcp                mongodb
f59177f86802   mariadb                         "docker-entrypoint.s…"   2 hours ago   Up 2 hours   0.0.0.0:3306->3306/tcp   mariadb
```

Vous pouvez également vérifier que les conteneurs sont bien lancés en ouvrant l'interface graphique de Docker Desktop.
![Docker Desktop avec les conteneurs de lancés](.readme/docker-desktop-running-containers.png)

Il se peut que le conteneur `app` redémarre plusieurs fois avant de se stabiliser.
Cela est dû au fait que le conteneur `app` démarre plus vite que les conteneurs `mongodb` et `mariadb`.
Et celui-ci essaye de se connecter aux bases de données mais elles ne sont pas encore prêtes.

## Tester l'API

Pour tester l'API rendez-vous sur Insomnia avec la collection importée et
assurez-vous que les conteneurs sont bien lancés.



## Autheurs

- 👤 [Kevin Mitressé](https://github.com/kmitresse)
- 👤 [Lucàs Vabre](https://github.com/LucasVbr)
