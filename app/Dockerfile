FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm i --force

COPY . .

RUN npx prisma generate

RUN npm run build

# For final optimized image
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm i --force

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY script.sh .
COPY tsconfig.json .

RUN npx prisma generate

ENTRYPOINT [ "sh", "script.sh" ]