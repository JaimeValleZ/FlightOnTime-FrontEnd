FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 4200

ENV PORT=4200

CMD ["node", "dist/flight-on-time/server/server.mjs"]