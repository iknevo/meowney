# Meowney

Meowney is a personal finance dashboard for managing accounts, categories, and transactions. It turns imported transaction data into filterable summaries and charts while keeping the underlying records editable and organized.

Live demo: [meowney.vercel.app](https://meowney.vercel.app/)

## Features

- Authenticated user accounts with Clerk
- Dashboard summary by date range and account
- Multiple chart views for income, expenses, and category breakdowns
- Account CRUD with bulk deletion
- Category CRUD with bulk deletion
- Transaction CRUD with sorting, search, pagination, and row selection
- CSV transaction import with preview before insertion
- Bulk transaction deletion
- Profile and account settings
- Responsive interface with light/dark theme support

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 15 App Router and React 19 |
| API | Hono with Zod validation |
| Database | Neon Postgres with Drizzle ORM |
| Authentication | Clerk |
| Data fetching | TanStack Query |
| UI | Tailwind CSS, shadcn/ui, Radix UI |
| Charts | Recharts |
| Client state | Zustand |
| Package manager | Bun |

## Getting started

### Prerequisites

- Node.js 20 or newer
- [Bun](https://bun.sh/)
- A Clerk application
- A PostgreSQL database, such as [Neon](https://neon.tech/)

### Installation

```bash
git clone https://github.com/iknevo/meowney.git
cd meowney
bun install
```

Create a `.env.local` file with the variables below, then run the database migration and seed scripts:

```bash
bun run db:migrate
bun run db:seed
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon/PostgreSQL connection string used by Drizzle and migration scripts |
| `NEXT_PUBLIC_APP_URL` | Public URL used by the Hono client |
| Clerk variables | Configure the Clerk keys required by `@clerk/nextjs` |

Do not commit `.env.local` or database credentials. Configure the Clerk sign-in/sign-up URLs and redirect behavior in the Clerk dashboard for the environment being used.

## Available scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start Next.js with Turbopack |
| `bun run build` | Create a production build |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |
| `bun run db:generate` | Generate Drizzle migrations from the schema |
| `bun run db:migrate` | Apply migrations to the database |
| `bun run db:seed` | Seed initial account/category data |
| `bun run db:studio` | Open Drizzle Studio |

## Project structure

```text
src/
├── app/
│   ├── (auth)/           # Clerk authentication pages
│   ├── (dashboard)/      # Dashboard, accounts, categories, transactions, settings
│   └── api/              # Hono API routes
├── components/           # Shared UI and data-display components
├── db/                   # Drizzle schema, migrations, and seed scripts
├── features/
│   ├── accounts/         # Account CRUD and selection
│   ├── categories/       # Category CRUD
│   ├── dashboard/        # Summary dashboard and charts
│   ├── summary/          # Aggregated financial data
│   └── transactions/     # Transaction CRUD and CSV import
└── providers/            # Query, auth, and sheet providers
```

## Architecture notes

The Next.js UI consumes typed Hono endpoints through TanStack Query. Drizzle defines the relational data model and generates migrations, while feature modules keep CRUD operations, forms, tables, and query hooks close to the domain they serve. CSV imports are previewed in the transaction feature before bulk insertion.

## Deployment

Meowney can be deployed to Vercel with Neon Postgres:

1. Configure `DATABASE_URL`, `NEXT_PUBLIC_APP_URL`, and Clerk settings.
2. Apply migrations with `bun run db:migrate`.
3. Seed the database if starting a new environment.
4. Build with `bun run build` and deploy.

## License

No license file is currently included in the repository.
