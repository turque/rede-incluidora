FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar corepack para gerenciar versões do Yarn
# RUN corepack enable
COPY package.json yarn.lock* ./
# Usar corepack para garantir a versão correta do Yarn
# RUN corepack prepare yarn@4.4.0 --activate
RUN yarn --immutable

FROM base AS builder
WORKDIR /app
# COPY --from=base /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
