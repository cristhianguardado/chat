FROM node:10
# RUN apk add --no-cache nodejs=10.14.2-r0 npm=10.14.2-r0 tini
# RUN npm i -g npm@6.8.0
WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm set progress=false && npm config set depth 0
RUN npm ci --only=production
RUN npm install
RUN npm run build
COPY . .

EXPOSE 4040:4040

CMD node ./server/index.js
