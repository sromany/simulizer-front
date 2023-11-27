FROM node:21-alpine AS build

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN mv dist/* public/

FROM nginx:1.25-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/public/ /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html