Tunes
=====

## How it works (restructure.rb)

- `resources/musics.yml` に書いた内容を、
- `materials/*.mp3` の埋込領域に書き込みます（iTunesなどで表示するため）。
- `resources/settings.yml` と組み合わせることでアルバムごとにまとめられ、
- ダウンロードページが生成されます。
- MP3 ファイルは別途サーバにアップロードします。

## Install

#### on local
```sh
# used in gem taglib-ruby (for local running)
$ brew install taglib

$ npm install

$ docker build -t syon/tunes .
$ docker images
```

## Update music data

#### with Docker
```sh
$ docker run -it --rm -v (pwd):/app syon/tunes /bin/bash update.sh
```

#### on Local

```sh
# (macOS)
$ brew install taglib
```

```sh
$ bundle exec ruby restructure.rb
```

## Build

```sh
$ npm run build
```

## Web server

```sh
$ node serve
```
