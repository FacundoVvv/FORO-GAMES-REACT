FROM node:lts-alpine3.19

WORKDIR /home/forum/frontend

COPY package*.json ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev-exposed"]