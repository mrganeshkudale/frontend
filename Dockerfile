# chromium > 76 is required. For now, this is only available in the 'edge' build
FROM alpine:edge
USER root

RUN apk add openjdk11 
RUN java --version

#install npm
RUN apk add  --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.7/main/ nodejs=8.9.3-r1

#insttall firefox
RUN apk add --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing firefox
	
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
#Global npm dependencies
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
#optionally if you want to run npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin

COPY package.json /app/package.json
RUN npm install --unsafe-perm=true --allow-root
COPY . /app
RUN chmod -R 777 ./
#RUN chown $USER /app -Rv
#RUN webdriver-manager update
#RUN npm cache clean --force
#RUN npm test
