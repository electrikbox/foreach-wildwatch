# ForEach WildWatch 🔍

Une application mobile React Native construite avec Expo pour le suivi d'observations diverses avec géolocalisation et interface cartographique interactive.

## 📋 Description

ForEach WildWatch permet aux utilisateurs de suivre et d'enregistrer toutes sortes d'observations avec des données de localisation précises grâce à une carte interactive alimentée par Mapbox.

## 🚀 Installation et Configuration

### Prérequis

- Node.js (version 20 ou plus récente)
- npm ou yarn
- Expo CLI
- Un compte Mapbox pour les tokens d'API

### Installation

1. Cloner le projet
   ```bash
   git clone <url-du-repo>
   cd foreach-wildwatch
   ```

2. Installer les dépendances
   ```bash
   npm install
   ```

3. Configuration des variables d'environnement
   ```bash
   cp .env.example .env
   ```

   Remplir le fichier `.env` avec vos tokens Mapbox :
   ```
   EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN=votre_token_de_téléchargement
   EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=votre_token_d_accès
   ```

## 🏃‍♂️ Lancement de l'application

### Développement

Démarrer le serveur de développement :
```bash
npm start
# ou
npx expo start
```

### Plateformes spécifiques

```bash
npm run android    # Lancer sur Android
npm run ios        # Lancer sur iOS
npm run web        # Lancer sur web
```

### Build et déploiement

```bash
npm run prebuild --clean  # Nettoyer et préparer le build natif
```

## 🛠️ Commandes de développement

```bash
npm run lint       # Exécuter ESLint pour vérifier le code
npm start          # Démarrer le serveur de développement
```

## 🏗️ Architecture du projet

Le projet suit les principes de **Screaming Architecture**, organisant le code par domaine métier plutôt que par couches techniques :

```
├── src/
│   ├── app/
│   └── features/
│       ├── map/
│       └── shared/
├── assets/
├── android/
└── ios/
```

### Principes architecturaux

- **Architecture criante** : toute la logique métier est contenue dans `src/features/`
- Structure basée sur les fonctionnalités : chaque fonctionnalité est autonome
- La fonctionnalité carte inclut la cartographie ET la gestion des observations (forte cohésion)
- Code partagé centralisé dans `src/features/shared/`
- Préoccupations niveau application dans `src/app/`

## 💻 Technologies utilisées

- **Expo 54** avec la nouvelle architecture activée
- **React Native 0.81** avec React 19.1
- **Expo Router** pour la navigation basée sur les fichiers avec routes typées
- **@rnmapbox/maps** pour les fonctionnalités cartographiques
- **expo-location** pour les services GPS/localisation
- **TypeScript** pour la sécurité des types

## 📱 Fonctionnalités

- Interface cartographique interactive avec Mapbox
- Enregistrement d'observations diverses avec géolocalisation
- Modification d'observations

## 🔧 Configuration environnement

L'application nécessite des variables d'environnement pour l'intégration Mapbox :
- `EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN` - Requis pour le SDK Mapbox
- `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` - Requis pour le rendu de la carte
