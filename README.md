# coursa-be

A modern NestJS backend project using PostgreSQL and Prisma ORM.

## Features
- NestJS 11 (strict mode)
- PostgreSQL via Prisma ORM
- Environment config with @nestjs/config
- Health check endpoint (`/health`)
- Docker Compose for local PostgreSQL
- Prettier and ESLint for code quality

---

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Set up environment variables
Create a `.env` file in the project root:
```
DATABASE_URL="postgresql://admin:password@localhost:5432/coursa"
```

### 3. Start PostgreSQL with Docker Compose

Start a local PostgreSQL database in a Docker container using Docker Compose. This will run the database in the background and make it accessible on port 5432.

```
docker-compose up -d
```

### 4. Prisma setup
- Edit `prisma/schema.prisma` to define your models.
- Run migrations:
```
npx prisma migrate dev --name init
```
- Generate the Prisma client:
```
npx prisma generate
```

### 5. Run the app
```
npm run start:dev
```

App will be available at [http://localhost:3000](http://localhost:3000)

### 6. Health Check
Visit [http://localhost:3000/health](http://localhost:3000/health) to check if the app is running.

---

## Code Quality
- Format code: `npm run format`
- Lint code: `npm run lint`

---

## Useful Commands
- Run tests: `npm test`
- Run e2e tests: `npm run test:e2e`

---

## License
MIT (or specify your license)
