FROM node:18

RUN npm i -g nodemon
RUN mkdir -p /home/Backend

WORKDIR /home/Backend

EXPOSE 9091

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["nodemon", "server.js"]
