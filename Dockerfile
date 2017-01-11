# MeSHgram
# Packages the web server and front-end UI
# Connects to the MongoDB docker images

FROM ubuntu:16.04
MAINTAINER Abdelrahman Hosny <abdelrahman.hosny@hotmail.com>

RUN apt-get update && \
    apt-get install -y python python-pip && \
    pip install cherrypy pymongo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD ./images /images
ADD ./javascripts /javascripts
ADD ./stylesheets /stylesheets
ADD server.py /server.py
ADD pm2mdb.py /pm2mbd.py
ADD url_gen.py /url_gen.py
ADD wordcloud.py /wordcloud.py
ADD config.txt /config.txt
ADD mesh_stopwords.txt /mesh_stopwords.txt
ADD terms.txt /terms.txt
ADD index.html /index.html

EXPOSE 8080
ENTRYPOINT ["/usr/bin/python", "/server.py"]