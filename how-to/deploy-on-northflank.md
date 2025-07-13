# How to Deploy the NestJS Backend on Northflank

This guide explains how to deploy your NestJS backend to Northflank using a Dockerfile, and how to set up a managed PostgreSQL database addon.

---

## 1. Prepare Your Backend Repository

- Ensure your backend project (e.g., `coursa-be/`) contains a `Dockerfile` (see the provided example in this repo).
- Commit and push all changes to your Git repository.

---

## 2. Create a New Service on Northflank

1. **Go to your Northflank project dashboard.**
2. Click **Create new** → **Service**.
3. Choose **Build and deploy a Git repo (Combined)**.
4. Fill in the basic information (service name, repo, branch, etc.).
5. Under **Build options**, select **Dockerfile**.
6. Northflank will automatically detect and use your `Dockerfile`.

---

## 3. Add a PostgreSQL Database Addon

1. In your Northflank project, go to **Addons**.
2. Click **Create new** → **Database**.
3. Choose **PostgreSQL** (recommended version: 15).
4. Set the database name, user, and password (or use generated values).
5. Create the addon.
6. After creation, go to the addon details and copy the **connection string** (e.g., `postgresql://user:password@host:5432/dbname`).

---

## 4. Configure Environment Variables

1. Go to your backend service in Northflank.
2. Find the **Environment variables** section.
3. Add the following variables (as needed):
   - `DATABASE_URL` — Paste the connection string from your Postgres addon.
   - `JWT_SECRET` — Your JWT secret key.
   - `STRIPE_SECRET_KEY` — Your Stripe secret key (if using Stripe).
   - `FRONTEND_URL` — The URL of your deployed frontend (for CORS/redirects).
   - Any other secrets/config your app needs.
4. Click **Save** or **Apply**.

---

## 5. Deploy and Monitor

- Northflank will build and deploy your backend automatically on every push to the selected branch.
- You can view build logs and deployment status in the Northflank dashboard.
- If you need to run database migrations (e.g., Prisma), you can add a post-deploy command or run them manually from the console.

---

## 6. Best Practices

- **Never commit secrets** to your repo or Dockerfile.
- **Always use environment variables** for sensitive config.
- **Test on a staging environment** before deploying to production.
- **Monitor logs and health checks** in Northflank for troubleshooting.

---

## 7. Example Dockerfile (for reference)

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate || true
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/src/main.js"]
```

---

## 8. Useful Links
- [Northflank Docs: Deploying with Dockerfile](https://docs.northflank.com/guides/deploy-dockerfile)
- [Northflank Docs: Addons & Databases](https://docs.northflank.com/docs/addons)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

**You are now ready to deploy your NestJS backend on Northflank with a managed PostgreSQL database!** 