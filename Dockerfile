FROM node

WORKDIR /usr/src/app

COPY package*.json ./
COPY server/package*.json ./server/

RUN cd server && yarn install
RUN yarn install

RUN cd server/prisma && prisma generate

COPY . .

CMD [ "cd server && yarn start", "&&", "yarn start"]