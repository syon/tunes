Tunes
=====

### Install

```sh
# for gem taglib-ruby
$ brew install taglib

$ npm install -g bower
$ bower install

$ npm install -g coffee-script
$ npm install -g gulp

$ npm install
```

### Update music data with Docker

```sh
$ docker build -t syon/tunes .
$ docker images
$ docker run -it --rm -v (pwd):/app syon/tunes
root@xxxxxxxxxxxx:/app# sh update.sh
```

- To add a album, just add tag and update `structure.json`.

### Build

```sh
$ npm run build
```

### Web server

```sh
$ node serve
```
