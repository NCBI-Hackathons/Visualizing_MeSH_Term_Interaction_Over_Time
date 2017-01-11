# MeSHgram
# Packages the web server and front-end UI
# Connects to the MongoDB docker image

FROM ubuntu:16.04
MAINTAINER Abdelrahman Hosny <abdelrahman.hosny@hotmail.com>

RUN apt-get update && \
    apt-get install -y python python-pip && \
    pip install cherrypy pymongo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD ./images /hackathon/MeSHgram/images
ADD ./javascripts /hackathon/MeSHgram/javascripts
ADD ./stylesheets /hackathon/MeSHgram/stylesheets
ADD server.py /hackathon/MeSHgram/server.py
ADD pm2mdb.py /hackathon/MeSHgram/pm2mbd.py
ADD url_gen.py /hackathon/MeSHgram/url_gen.py
ADD wordcloud.py /hackathon/MeSHgram/wordcloud.py
ADD config.txt /hackathon/MeSHgram/config.txt
ADD mesh_stopwords.txt /hackathon/MeSHgram/mesh_stopwords.txt
ADD terms.txt /hackathon/MeSHgram/terms.txt
ADD index.html /hackathon/MeSHgram/index.html

EXPOSE 8080
ENTRYPOINT ["/usr/bin/python", "/hackathon/MeSHgram/server.py"]