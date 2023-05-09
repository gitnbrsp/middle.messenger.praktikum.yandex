FROM node:20-alpine
WORKDIR /var/www
COPY package.json ./
COPY ./ ./
RUN npm i
RUN npm run build
EXPOSE 3000

CMD ip a
CMD node server.js
