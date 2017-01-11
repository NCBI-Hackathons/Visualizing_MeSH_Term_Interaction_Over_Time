# MeSHgram
# Packages the web server and front-end UI
# Connects to the MongoDB docker images

FROM ubuntu:16.04
MAINTAINER Abdelrahman Hosny <abdelrahman.hosny@hotmail.com>

RUN apt-get update && \
    apt-get install -y python python-pip && \
    pip install cherrypy && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*