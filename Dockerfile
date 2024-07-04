# Stage 1: Development
FROM node:16 AS dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]

# Stage 2: Production
FROM node:16 AS prod

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
