# Codely Vercel setup

## Required environment variables

Add these in **Vercel → Codely project → Settings → Environment Variables**.
Enable Production, Preview, and Development for the first test deployment.

| Variable | Where to obtain it |
| --- | --- |
| `FIRECRAWL_API_KEY` | Firecrawl dashboard → API Keys |
| `GEMINI_API_KEY` | Google AI Studio → Get API key |
| `SANDBOX_PROVIDER` | Enter the literal value `vercel` |
| `VERCEL_TEAM_ID` | Vercel team Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Codely project Settings → General → Project ID |
| `VERCEL_TOKEN` | Vercel Account Settings → Tokens |

`MORPH_API_KEY` is optional and can be added later.

## Import and deploy

1. In Vercel, select **Add New → Project**.
2. Import `waseemkhanjdpr1902/open-lovable`.
3. Keep Framework Preset as **Next.js** and Root Directory as `./`.
4. Add all required environment variables above.
5. Select **Deploy**.

Never use a `NEXT_PUBLIC_` prefix for any API key or token.
