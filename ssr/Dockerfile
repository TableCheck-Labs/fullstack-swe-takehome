FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "run", "start:prod"]
