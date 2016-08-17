FROM mwallasch/docker-ruby-node
RUN apt-get update && apt-get install -y libtag1-dev
