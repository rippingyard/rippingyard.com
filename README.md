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
$ yarn dev
$ cd hosting
$ yarn dev
$ cd ../functions
$ yarn dev
```

### Check

```sh
$ yarn build
$ open http://localhost:5555
```

### Deploy

```sh
$ yarn deploy
```
