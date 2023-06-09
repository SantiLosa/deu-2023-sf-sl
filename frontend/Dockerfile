# Dockerfile for the frontend
FROM node:14.17.0 as frontend

WORKDIR /app/frontend

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "serve"]