# Dockerfile for the frontend
FROM node:14.17.0 as frontend

WORKDIR /app/frontend

COPY package*.json ./
RUN npm install
RUN npm install --save axios

COPY . .

CMD ["npm", "run", "serve"]