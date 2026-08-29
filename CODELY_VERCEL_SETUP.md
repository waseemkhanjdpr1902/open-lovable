# Codely Vercel setup

## Required environment variables

Add these in **Vercel → Codely project → Settings → Environment Variables**.
Enable Production, Preview, and Development for the first test deployment.

| Variable | Where to obtain it |
| --- | --- |
| `FIRECRAWL_API_KEY` | Firecrawl dashboard → API Keys |
| `GEMINI_API_KEY` | Google AI Studio → Get API key |
| `SANDBOX_PROVIDER` | Enter the literal value `vercel` |
Vercel automatically injects `VERCEL_OIDC_TOKEN` into deployments, so you do not
need to create a permanent Vercel token for the normal hosted setup.

`VERCEL_TEAM_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` are fallback values for
environments where OIDC is unavailable. `MORPH_API_KEY` is also optional.

## Import and deploy

1. In Vercel, select **Add New → Project**.
2. Import `waseemkhanjdpr1902/open-lovable`.
3. Keep Framework Preset as **Next.js** and Root Directory as `./`.
4. Add all required environment variables above.
5. Select **Deploy**.

Never use a `NEXT_PUBLIC_` prefix for any API key or token.
