# 1. Install dependencies using pnpm
FROM node:18-alpine AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 2. Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm again in this stage
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV CI=false # Disable ESLint warnings as errors
RUN pnpm build

# 3. Run the app
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

RUN npm install -g pnpm

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["pnpm", "start"]