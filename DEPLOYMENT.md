# Automated Deployment Setup

This project uses a **hybrid deployment approach** combining Vercel's GitHub integration with GitHub Actions for CI/CD.

## Overview

- **Vercel GitHub Integration**: Handles automatic deployments
- **GitHub Actions**: Runs CI checks (linting and build validation) before deployment
- **Trigger**: Any push to `master` or `main` branch

## Architecture

```
Push to master/main
       ↓
GitHub Actions CI (.github/workflows/ci.yml)
  ├── Install dependencies
  ├── Run ESLint
  └── Validate build
       ↓
   (If CI passes)
       ↓
Vercel Automatic Deployment
  ├── Build with Next.js
  ├── Deploy to production
  └── Update zvarney.com
```

## Setup Instructions

### 1. Connect GitHub Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `Varnasus/portafoglio`
4. Configure project settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (auto-configured)
   - **Output Directory**: `.next` (auto-configured)
   - **Install Command**: `npm install` (auto-configured)

5. Click **"Deploy"**

### 2. Configure Production Domain

1. In Vercel project settings, go to **"Domains"**
2. Add your custom domain: `zvarney.com`
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates

### 3. Environment Variables (if needed)

If your project requires environment variables:

1. Go to Vercel project → **"Settings"** → **"Environment Variables"**
2. Add variables for:
   - `NEXT_PUBLIC_*` variables (exposed to browser)
   - API keys, database URLs, etc.
3. Set environment scope: Production, Preview, Development

### 4. Enable Automatic Deployments

Once connected, Vercel will automatically:

- ✅ Deploy on every push to `master`/`main`
- ✅ Create preview deployments for pull requests
- ✅ Run builds and deploy
- ✅ Provide deployment URLs and status

## GitHub Actions CI

The CI workflow (`.github/workflows/ci.yml`) runs automatically on:

- Push to `master` or `main` branch
- Pull requests targeting `master` or `main`

### CI Steps

1. **Checkout code**: Get latest code from repository
2. **Setup Node.js**: Install Node.js 18 with npm caching
3. **Install dependencies**: Run `npm ci` for clean install
4. **Run linter**: Execute `npm run lint` to check code quality
5. **Build project**: Run `npm run build` to validate build
6. **Check build output**: Verify `.next` directory was created

### Viewing CI Results

- Check the **"Actions"** tab in your GitHub repository
- Each commit/PR will show CI status (✓ or ✗)
- Click on workflow runs to see detailed logs

## Vercel Configuration

The `vercel.json` file configures:

- **Build settings**: Custom build and dev commands
- **Framework**: Next.js (optimized builds)
- **Git integration**: Auto-deploy from `master`/`main`
- **GitHub settings**: Auto-aliasing, job cancellation

## Deployment Flow

### Production Deployment (master/main)

```bash
git add .
git commit -m "feat: new feature"
git push origin master
```

1. GitHub Actions CI starts
2. Runs linting and build validation
3. If CI passes, Vercel detects push
4. Vercel builds and deploys to production
5. Updates zvarney.com domain

### Preview Deployment (Pull Request)

```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create PR on GitHub
```

1. GitHub Actions CI runs on PR
2. Vercel creates preview deployment
3. Preview URL shared in PR comments
4. Test changes before merging

## Monitoring Deployments

### Vercel Dashboard

- **Deployments**: View all deployments and their status
- **Logs**: Real-time build and runtime logs
- **Analytics**: Performance metrics and visitor data
- **Insights**: Core Web Vitals and performance scores

### GitHub Notifications

- Vercel bot comments on PRs with preview URLs
- Deployment status checks in PR
- Email notifications for failed builds

## Troubleshooting

### Build Failures

1. Check Vercel deployment logs in dashboard
2. Verify environment variables are set correctly
3. Test build locally: `npm run build`
4. Check GitHub Actions logs for CI failures

### CI Failures

1. Go to GitHub → Actions tab
2. Click on failed workflow run
3. Expand failed step to see error details
4. Fix locally and push again

### Deployment Not Triggering

1. Verify Vercel GitHub integration is connected
2. Check project settings → Git Integration
3. Ensure branch name is `master` or `main`
4. Check Vercel project logs for webhook errors

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linting
npm run lint

# Build for production (test locally)
npm run build

# Start production server (after build)
npm start
```

## Custom Deployment Settings

To customize deployment behavior, edit `vercel.json`:

```json
{
  "git": {
    "deploymentEnabled": {
      "master": true,
      "main": true
    }
  }
}
```

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **GitHub Actions Documentation**: https://docs.github.com/en/actions

## Summary

✅ **Automated CI/CD**: Push to master → CI checks → Auto-deploy
✅ **Quality Gates**: Linting and build validation before deployment
✅ **Preview Deployments**: Test PRs before merging
✅ **Zero Configuration**: Works out of the box with Next.js
✅ **Custom Domain**: Deploys to zvarney.com
