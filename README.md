# Ripping Yard

> lifelog for living well

## Firebase

### Setup

```sh
$ npm install -g firebase-tools
```

### Start

```sh
$ yarn start:emulator
```

http://localhost:4000/

---

## Hosting

### Setup

```sh
$ cd hosting
$ yarn install
$ cd ../functions
$ yarn install
```

### Development

```sh
$ yarn start:emulator
$ cd hosting
$ yarn dev
$ cd ../functions
$ yarn watch
```

### Check

```sh
$ cd hosting
$ yarn generate
$ open http://localhost:5000
```

### Deploy

```sh
$ yarn deploy
```
