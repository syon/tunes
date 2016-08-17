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

$ docker build -t syon/tunes .
$ docker images
```

### Update music data with Docker

```sh
$ docker run -it --rm -v (pwd):/app syon/tunes /bin/bash update.sh
```

- To add a album, update `resources/settings.yml` and just add tags on `def.tsv`.

### Build

```sh
$ npm run build
```

### Web server

```sh
$ node serve
```
