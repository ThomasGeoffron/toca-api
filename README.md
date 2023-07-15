# Toca (API & Backoffice)

## Récupérer le projet

```bash
git clone git@github.com:ThomasGeoffron/toca-api.git
```

## Lancer le projet

Lancer l'api :

```bash
cd api
npm i
cp .env.local .env # IMPORANT! : VOIR NB EN BAS DE PAGE
npm run start:dev
```

Lancer le backoffice :

```bash
cd backoffice
npm i
cp .env.local .env
npm run start
```

## Identifiant

Email : `oceane@bng.fr`  
Mot de passe : `oceane`

## ⚠️ IMPORTANT ⚠️

NB: La varialble d'environnement MONGO_URL se trouve dans la
description du rendu sur Myges, il est fortement recommandé
d'utiliser cette variable car la base de données est préalablement remplie
pour pouvoir tester le projet
