# rippingyard.com

> lifelog for living well

## Firebase

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
```

### Development

```sh
$ yarn start:emulator
$ cd hosting
$ yarn dev
```

### Deploy

**Check**

```sh
$ cd hosting
$ yarn generate
$ open http://localhost:5000
```


---

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
