FROM node:18

WORKDIR /server

COPY package*.json ./

RUN npm cache clean -force

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
