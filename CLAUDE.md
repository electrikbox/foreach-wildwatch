# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application called "ForEach WildWatch" built with Expo. The app allows users to track wildlife observations with location data using an interactive map interface powered by Mapbox.

## Architecture

The project follows **Screaming Architecture** principles, organizing code by business domain rather than technical layers:

- `app/` - Expo Router entry points that delegate to feature implementations
- `src/app/` - Application configuration, navigation, and UI orchestration hooks
- `src/features/` - Business domain features and shared code
  - `map/` - Interactive map functionality with Mapbox integration, including observation management
  - `shared/` - Cross-cutting concerns (API, hooks, components, types)

Key architectural patterns:
- **True screaming architecture**: All business logic contained within `src/features/`
- Feature-based structure: each feature is self-contained at the top level
- Map feature includes both cartographic and observation functionality (high cohesion)
- Centralized shared code in `src/features/shared/`
- App-level concerns (navigation, UI orchestration) in `src/app/`

## Development Commands

**Start development server:**
```bash
npm start
# or
npx expo start
```

**Platform-specific builds:**
```bash
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

**Code quality:**
```bash
npm run lint       # Run ESLint
```

**Build/deployment:**
```bash
npm run prebuild   # Clean prebuild for native platforms
```

## Key Technologies

- **Expo 54** with new architecture enabled
- **React Native 0.81** with React 19.1
- **Expo Router** for file-based navigation with typed routes
- **@rnmapbox/maps** for map functionality
- **expo-location** for GPS/location services
- **TypeScript** for type safety

## Environment Setup

The app requires environment variables for Mapbox integration:
- `EXPO_PUBLIC_MAPBOX_DOWNLOAD_TOKEN` - Required for Mapbox SDK
- `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` - Required for map rendering

## Data Models

Core entities are defined in `src/features/shared/types/observation-types.ts`:
- `Observation` - Wildlife observation with location and metadata
- Location/position types using expo-location
- UI component prop interfaces

## Navigation Structure

- Uses Expo Router with file-based routing
- Entry points in `app/` directory delegate to domain implementations
- Main routes: map view (index) and observation form
- Typed routes enabled for better developer experience