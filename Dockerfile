FROM node:9.4.0-alpine
COPY receive_sms.js .
COPY package.json .
COPY w3otp.html .
RUN sudo npm install -g --unsafe-perm=true --allow-root
EXPOSE  3000
CMD node receive_sms.js
