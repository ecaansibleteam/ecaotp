FROM node:9.4.0-alpine
COPY receive_sms.js .
COPY package.json .
COPY w3otp.html .
RUN npm install &&\
    apk update &&\
    apk upgrade
EXPOSE 3000
CMD node receive_sms.js
