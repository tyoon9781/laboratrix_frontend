FROM node:23.5-bookworm-slim

WORKDIR /app

COPY . /app

RUN if [ -f "package.json" ]; then npm install; fi