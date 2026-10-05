# Product Catalog

## Run locally

1. Install Node.js 20.19+ (or 22.12+).
2. In `backend/`, copy `.env.example` to `.env`, fill in the PostgreSQL and JWT
   settings, then run `npm ci` and `npm start`.
3. In `client/`, copy `.env.example` to `.env`, set `VITE_API_URL` to the API
   URL (locally, `http://localhost:4000`), then run `npm ci` and `npm run dev`.
4. The database must have the configured schema and its `users` and `products`
   tables. The backend creates the `cart_items` table when it starts.

## Deploy

The frontend and backend are separate services. Deploy the API and provision its
PostgreSQL database before deploying the frontend.

### Frontend on Vercel

1. Import this GitHub repository into Vercel and set the Root Directory to
   `client`.
2. Add the environment variable `VITE_API_URL` with the public HTTPS URL of the
   deployed backend, with no trailing slash.
3. Deploy. Vercel installs dependencies with `npm ci`, runs `npm run build`,
   publishes `dist`, and routes browser paths back to the SPA entry point.

If Vercel still shows `react-scripts build`, clear any Create React App build
command configured in Project Settings → Build and Deployment. This project
uses Vite; when the Root Directory is `client`, its build command is
`npm run build` and its output directory is `dist`.

### Backend and database

1. Create a PostgreSQL database and provision the schema and tables expected by
   the app (`users` and `products` in the schema selected by `DB_SCHEMA`).
2. Create a Node.js web service from this repository. Set its Root Directory
   to `backend`, Build Command to `npm ci`, and Start Command to `npm start`.
3. Configure the service's environment variables from `backend/.env.example`:
   `PORT` (provided by many hosts), `CORS_ORIGIN` (the deployed frontend's
   exact origin), all `DB_*` credentials/schema settings, and a long,
   randomly generated `JWT_SECRET`. Do not deploy `.env` files or commit
   production secrets.
4. Once the API is deployed, set Vercel's `VITE_API_URL` to its public HTTPS
   URL and redeploy the frontend so the API URL is included in the static build.

## Build the frontend locally

From the repository root, run `npm ci --prefix client` and
`npm --prefix client run build`. The generated static site is in `client/dist`.
