FROM node:18 

WORKDIR /react-app

COPY package*.json ./

RUN npm cache clean -force

RUN npm install

COPY . .

CMD ["npm", "start"]