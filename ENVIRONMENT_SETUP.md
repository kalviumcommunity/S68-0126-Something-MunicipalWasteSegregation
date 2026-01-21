# Environment Configuration Guide

## Overview
This project uses environment-specific configuration files to manage different settings across development, staging, and production environments.

## Environment Files Structure

### `.env.example` (Tracked in Git)
Template showing all required variables without secrets. **This file should be committed to Git**.

### `.env.development` (For local development)
Development-specific configuration. **Safe to commit** since it contains non-production values.

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=postgres://user:password@localhost:5432/waste_dev_db
```

### `.env.staging` (For staging environment)
Staging-specific configuration. **Safe to commit** since it contains staging values.

```bash
NEXT_PUBLIC_API_URL=https://staging-api.example.com
DATABASE_URL=postgres://user:pass@staging-db.example.com:5432/waste_staging_db
```

### `.env.production` (For production environment)
Production configuration templates. **Safe to commit**, but secrets should be injected via CI/CD.

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgres://user:pass@prod-db.example.com:5432/waste_prod_db
```

### `.env.local` (Local overrides - NOT tracked)
Optional file for developer-specific overrides. **NEVER commit this file**.

```bash
# Copy from .env.local.example and modify locally
cp web/.env.local.example web/.env.local
```

### `.env` (NOT tracked)
Used by `next dev` when `.env.local` doesn't exist. **NEVER commit this file**.

---

## Usage

### Local Development
```bash
cd web
npm run dev
# Uses .env.development by default
```

### Staging Build
```bash
cd web
npm run build:staging
# Uses .env.staging
```

### Production Build
```bash
cd web
npm run build:production
# Uses .env.production
```

---

## Variables Classification

### Public Variables (Safe to expose)
Prefixed with `NEXT_PUBLIC_` - these are bundled into the browser JavaScript.

```
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_APP_NAME
NEXT_PUBLIC_ENVIRONMENT
```

### Private Variables (Server-side only)
NOT prefixed - these remain server-side only and are never exposed to the browser.

```
DATABASE_URL
API_SECRET_KEY
JWT_SECRET
```

---

## CI/CD Integration

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

1. **Detects the branch** being pushed
2. **Selects the correct environment**:
   - `main` → production
   - `staging` → staging
   - `Dev` → development
3. **Loads the appropriate .env file**
4. **Builds with environment-specific settings**
5. **Injects secrets from GitHub Secrets** (for sensitive values)

### Setting Up Secrets in GitHub

For production secrets, add them to your GitHub repository settings:

1. Go to **Settings → Secrets and variables → Actions**
2. Add the following secrets:
   - `DATABASE_URL_PRODUCTION`
   - `DATABASE_URL_STAGING`
   - `API_SECRET_KEY`
   - `JWT_SECRET`

Then reference them in the workflow:
```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL_PRODUCTION }}
  API_SECRET_KEY: ${{ secrets.API_SECRET_KEY }}
```

---

## Security Best Practices

✅ **DO:**
- Commit `.env.example` and `.env.[environment]` files (without secrets)
- Use `.env.local` for local overrides (not tracked)
- Store secrets in GitHub Secrets or CI/CD variables
- Review `.gitignore` to ensure environment files aren't accidentally committed

❌ **DON'T:**
- Commit actual `.env` or `.env.local` files
- Hardcode secrets in `.env.development` or `.env.staging`
- Commit files with real database passwords or API keys
- Share `.env` files with other developers

---

## Troubleshooting

### Environment not loading?
Check that the correct `.env.[environment]` file exists:
```bash
ls -la web/.env*
```

### Variables showing as undefined?
1. Public variables must have `NEXT_PUBLIC_` prefix
2. Restart the dev server after changing `.env` files
3. For Next.js 13+, variables are loaded at build time

### Port already in use?
Set a custom port in `.env.local`:
```
PORT=3002
```

---

## References
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
