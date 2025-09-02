# syntax=docker.io/docker/dockerfile:1

FROM node:current-alpine3.22 AS base

FROM base AS deps
LABEL stage=deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

FROM base AS builder
LABEL stage=builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm run build

FROM base AS runner
LABEL stage=runner

RUN corepack enable pnpm 

WORKDIR /app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.env ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./

USER nobody

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]