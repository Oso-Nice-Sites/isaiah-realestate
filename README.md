# Premier Properties — Real Estate Website

A professional real estate marketing site for a Middle Tennessee REALTOR®, built with React + Vite and powered by [Sanity.io](https://sanity.io) as a headless CMS. The client can update listings, bio, team, reviews, and market articles through a clean web dashboard — no coding required.

---

## Table of Contents

- [Just want to see it running?](#just-want-to-see-it-running)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Developer Setup](#developer-setup)
- [Sanity CMS Setup](#sanity-cms-setup)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Content Management Guide](#content-management-guide)

---

## Just want to see it running?

> **This section is for anyone** — no coding experience needed. Follow these steps and you'll have the site running in your browser in about 5 minutes.

### Step 1 — Install Node.js

Node.js is the engine that runs this project locally. If you already have it, skip to Step 2.

1. Go to [nodejs.org](https://nodejs.org)
2. Click the **LTS** download button (the one labeled "Recommended for most users")
3. Run the installer and follow the prompts — all defaults are fine

To confirm it worked, open **Terminal** (Mac: press `⌘ Space`, type "Terminal", press Enter) and run:

```
node --version
```

You should see a version number like `v20.x.x`. That means you're good.

### Step 2 — Open the project folder in Terminal

In Terminal, type the following and press Enter (replace the path with wherever you saved the project):

```
cd ~/Downloads/isaiah-realestate
```

### Step 3 — Install dependencies

Run this once to install everything the project needs:

```
npm install
```

This may take a minute. You'll see a lot of text scroll by — that's normal.

### Step 4 — Start the site

```
npm run dev
```

You'll see output like:

```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

### Step 5 — Open it in your browser

Open [http://localhost:5173](http://localhost:5173) in any browser. The site will be live.

> **Note:** The site will display with placeholder content until Sanity is connected. See [Sanity CMS Setup](#sanity-cms-setup) to connect real content.

To stop the server, press `Ctrl + C` in Terminal.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev) |
| Build tool | [Vite 5](https://vitejs.dev) |
| Styling | Vanilla CSS with custom design tokens |
| CMS | [Sanity.io v3](https://sanity.io) |
| Hosting | [Vercel](https://vercel.com) |
| Fonts | Cormorant Garamond + DM Sans via Google Fonts |

No CSS framework, no UI library, no router — intentionally lean.

---

## Project Structure

```
isaiah-realestate/
│
├── src/
│   ├── components/          # All UI components
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── Listings.jsx
│   │   ├── ListingModal.jsx
│   │   ├── Engagement.jsx
│   │   ├── Resources.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   ├── MortgageCalc.jsx
│   │   └── Footer.jsx
│   │
│   ├── context/
│   │   └── SiteContext.jsx  # React context — fetches all Sanity data once at root
│   │
│   ├── sanity/
│   │   ├── client.js        # @sanity/client instance + image URL builder
│   │   └── queries.js       # GROQ queries for all content types
│   │
│   ├── data.js              # Fallback/seed data (used when Sanity is not configured)
│   ├── App.jsx              # Page state machine (home / about / mortgage / contact)
│   ├── main.jsx             # App entry point — wraps with SiteProvider
│   └── index.css            # Global styles and design tokens
│
├── studio/                  # Sanity Studio (separate app, deployed independently)
│   ├── schemas/
│   │   ├── agent.js         # Singleton — name, bio, photo, stats, team
│   │   ├── listing.js       # Property listings with photos
│   │   ├── article.js       # Market resources / articles
│   │   └── review.js        # Client testimonials
│   ├── sanity.config.js     # Studio config with custom navigation structure
│   └── package.json
│
├── .env.example             # Template for required environment variables
├── vercel.json              # Vercel SPA rewrite rule
└── index.html
```

### Data flow

```
Sanity CDN
    │
    ▼
SiteContext (fetches on mount, normalizes image URLs)
    │
    ▼
All components via useSite() hook
```

If `VITE_SANITY_PROJECT_ID` is not set, the context falls back to `src/data.js` with no loading delay — useful for development without Sanity configured.

---

## Developer Setup

### Prerequisites

- Node.js 18+ (`node --version` to check)
- npm 9+ (comes with Node)
- A [Sanity account](https://sanity.io) (free)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd isaiah-realestate
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Sanity project ID (see [Sanity CMS Setup](#sanity-cms-setup)):

```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

### 3. Start the dev server

```bash
npm run dev
```

Site runs at [http://localhost:5173](http://localhost:5173).

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Sanity CMS Setup

This is a one-time setup. After this, the client manages all content through the Sanity Studio dashboard.

### Step 1 — Create a Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click **New Project**
3. Name it something like `Premier Properties`
4. Choose **Clean project with no predefined schemas**
5. Copy the **Project ID** shown on the project page

### Step 2 — Set up the Studio locally

```bash
cd studio
npm install

# Create the studio's environment file
cp .env.example .env
```

Open `studio/.env` and paste your Project ID:

```
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

Start the Studio:

```bash
npm run dev
```

Studio opens at [http://localhost:3333](http://localhost:3333). You'll see the content dashboard with sections for Agent Profile, Listings, Resources, and Reviews.

### Step 3 — Add CORS origins

The browser-side Sanity client needs permission to query your project.

1. In [sanity.io/manage](https://sanity.io/manage), open your project
2. Go to **API → CORS Origins**
3. Add the following origins (with credentials enabled for the Studio):

| Origin | Allow Credentials |
|---|---|
| `http://localhost:5173` | No |
| `http://localhost:3333` | Yes |
| `https://your-site.vercel.app` | No |

### Step 4 — Wire the main site to Sanity

Paste your Project ID into the main site's `.env.local`:

```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

Restart `npm run dev` — the site will now fetch live content from Sanity.

### Step 5 — Deploy the Studio

Deploy the Studio to Sanity's free hosting so the client can access it from anywhere:

```bash
cd studio
npm run deploy
```

Follow the prompts. The Studio will be published at a URL like `https://premier-properties.sanity.studio`.

Share that URL with the client — it's their content dashboard.

---

## Deployment

### Main site → Vercel

1. Push the repo to GitHub (private is fine)
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
3. Vercel auto-detects Vite — no build config changes needed
4. Add environment variables in **Settings → Environment Variables**:
   - `VITE_SANITY_PROJECT_ID` = your project ID
   - `VITE_SANITY_DATASET` = `production`
5. Deploy

Every push to `main` triggers an automatic redeploy.

> **Do not deploy the `studio/` folder to Vercel.** The Studio is deployed separately via `sanity deploy` (see Step 5 above).

### Deployments at a glance

| What | Where | How |
|---|---|---|
| Main site | Vercel | Auto on `git push` |
| CMS Studio | Sanity hosting | `npm run deploy` from `studio/` |
| Content | Sanity CDN | Instant on publish in Studio |

---

## Environment Variables

### Main site (`.env.local`)

| Variable | Required | Description |
|---|---|---|
| `VITE_SANITY_PROJECT_ID` | Yes | Found in sanity.io/manage |
| `VITE_SANITY_DATASET` | No | Defaults to `production` |

### Studio (`studio/.env`)

| Variable | Required | Description |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | Yes | Same project ID as above |
| `SANITY_STUDIO_DATASET` | No | Defaults to `production` |

Both `.env` files are gitignored. Never commit real credentials.

---

## Content Management Guide

> **For the client** — everything you need to know to manage your own content.

Your content dashboard lives at the Studio URL provided by your developer (e.g. `https://premier-properties.sanity.studio`). Log in with your Sanity account.

### Agent Profile

This is your personal information — name, bio, photo, contact details, and homepage stats. There is only one Agent Profile; you cannot create duplicates.

- **Profile Photo:** Upload a high-resolution headshot. The system automatically crops and resizes it.
- **Bio:** Write in plain text. Separate paragraphs with a blank line.
- **Homepage Stats:** Up to 4 stat tiles (e.g. `120+` / `Homes Sold`). Edit the value and label for each.
- **Team Members:** Add or remove team members, each with a name, role, short bio, and photo.

After editing, click **Publish** in the top right. Changes appear on the site immediately.

### Listings

Each listing is a separate document. To add a new listing:

1. Click **Listings** in the left sidebar
2. Click the pencil/edit icon (top right) → **New Listing**
3. Fill in the details — required fields are marked with a red asterisk
4. Upload photos — **drag to reorder**. The first photo is the cover image shown on the listing card.
5. Set **Display Order** (lower numbers appear first on the site)
6. Click **Publish**

To mark a listing as Pending or Sold, change the **Status** field and republish.

### Resources & Articles

Market updates, buyer guides, and research pieces shown in the Knowledge Center section. Add as many as you like. Use **Display Order** to control which appear first.

### Client Reviews

Testimonials shown in the Contact section. Add the client's name (first name + last initial is common), their rating, quote, and city. Use **Display Order** to pin your strongest reviews to the top.

---

*Built with care as a portfolio project. Questions? Open an issue or reach out directly.*
