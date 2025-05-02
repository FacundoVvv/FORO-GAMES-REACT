FROM node:20-alpine

WORKDIR /home/forum/backend

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "run", "dev"]