FROM oven/bun:latest

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

WORKDIR /app

COPY . .

RUN bun install

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

RUN bun run build
