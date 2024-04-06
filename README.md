# Simple Contact

Create simple crud contact apps

## Content

- [Features](#features)
- [Stacks](#stacks)
- [Development Environment Version](#development-environment-version)
- [Run the Project](#run-the-project)
- [Regenerate Native Folder](#regenerate-native-folder) 
- [Test](#test)

## Features

- Show a list of contacts 
- Show contact detail
- Add new contact
- Delete a contact

## Stacks

- Project generated using [bun](https://bun.sh/) + [Expo](https://expo.dev/)
- [Setup TypeScript for Expo](https://docs.expo.dev/guides/typescript/)
- [Redux Tool Kit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/) for fetching [API](https://contact.herokuapp.com/documentation)
- `eslint` + `Standard` configured (using `npm`)

## Development Environment Version

- node: v16.20.2
- pod: v1.15.2
- bun: v1.0.35
- gem: v3.1.6
- expo: v~50.0.14
- react: v18.2.0
- react-native: v0.73.6
- java:
```text
java version "17.0.9" 2023-10-17 LTS
Java(TM) SE Runtime Environment (build 17.0.9+11-LTS-201)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.9+11-LTS-201, mixed mode, sharing)
```

## Run the Project

To run with Expo Go:

```shell
bunx expo start --ios
bunx expo start --android
```

To run with React Native:
```shell
bun run ios
bun run android
```

## Regenerate Native Folder

```shell
bunx expo prebuild --clean
```

## Test

To run test and coverage, use `jest`

```shell
jest
```
