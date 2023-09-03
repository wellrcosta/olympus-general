FROM node:18.17.1-alpine3.17

RUN [ "mkdir", "/app"]

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV PORT=80

EXPOSE 80

ENTRYPOINT [ "npm" ]

CMD ["start"]
