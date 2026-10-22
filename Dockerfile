FROM node:22.20.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.20.0-alpine
ENV NODE_ENV=production HOST=0.0.0.0 PORT=8080
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY scripts/serve.mjs ./scripts/serve.mjs
USER node
EXPOSE 8080
CMD ["node", "scripts/serve.mjs"]
