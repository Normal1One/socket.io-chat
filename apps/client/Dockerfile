FROM node:20-slim AS base
RUN yarn global add turbo
WORKDIR /app
COPY . .
RUN turbo prune --scope="client" --docker

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

RUN turbo build --filter=client...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/client/next.config.js .
COPY --from=installer /app/apps/client/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/client/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/client/public ./apps/client/public

CMD node apps/client/server.js
