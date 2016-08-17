Tunes
=====

### How it works (restructure.rb)

- `resources/musics.yml` に書いた内容を、
- `materials/*.mp3` の埋込領域に書き込みます（iTunesなどで表示するため）。
- `resources/settings.yml` と組み合わせることでアルバムごとにまとめられ、
- ダウンロードページが生成されます。
- MP3 ファイルは別途サーバにアップロードします。

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
