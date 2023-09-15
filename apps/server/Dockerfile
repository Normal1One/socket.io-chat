FROM node:20-slim AS base
RUN yarn global add turbo
WORKDIR /app
COPY . .
RUN turbo prune --scope="server" --docker

FROM base AS installer
COPY --from=base /app/out/json/ .
COPY --from=base /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=base /app/out/full/ .
COPY turbo.json turbo.json

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

RUN turbo build --filter=server...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs
COPY --from=installer /app .

CMD node apps/server/dist/main.js
