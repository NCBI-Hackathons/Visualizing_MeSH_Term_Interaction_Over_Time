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

ADD ./images /root/images
ADD ./javascripts /root/javascripts
ADD ./stylesheets /root/stylesheets
ADD server.py /root/server.py
ADD pm2mdb.py /root/pm2mbd.py
ADD url_gen.py /root/url_gen.py
ADD wordcloud.py /root/wordcloud.py
ADD config.txt /root/config.txt
ADD mesh_stopwords.txt /root/mesh_stopwords.txt
ADD terms.txt /root/terms.txt
ADD index.html /root/index.html

EXPOSE 8080
ENTRYPOINT ["/usr/bin/python", "/server.py"]