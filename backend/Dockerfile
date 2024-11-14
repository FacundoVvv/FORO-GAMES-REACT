FROM node:lts-alpine3.19

WORKDIR /home/forum/backend

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "run", "dev"]