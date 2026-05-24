# InsightX 🚀

A modern Next.js + TypeScript application that integrates with Notion, Supabase, and Clerk for authenticated data insights.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Framer Motion
- **Auth**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Integrations**: Notion API
- **UI**: Recharts, Lucide, React Markdown

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy `env.example` to `.env.local` and fill in your keys:
```bash
cp env.example .env.local
```

Required:
- **Clerk** keys: https://dashboard.clerk.com
- **Supabase** URL & keys: https://supabase.com
- **Notion** OAuth credentials: https://www.notion.so/profile/integrations
- **TOKEN_ENCRYPTION_KEY**: Run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   ├── lib/           # Utilities & helpers
│   └── api/           # API routes
├── public/            # Static assets
├── supabase/          # Database migrations & functions
└── package.json       # Dependencies
```

## Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more info.

---

**Status**: 🔨 In Development
