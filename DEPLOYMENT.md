# Deploying to Vercel

This guide will help you deploy your YouTube Transcript Frontend to Vercel in under 5 minutes.

## Prerequisites

- GitHub account
- Vercel account (sign up free at [vercel.com](https://vercel.com))
- Your code pushed to a GitHub repository

## Step-by-Step Deployment

### 1. Push Code to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/youtube-transcript-frontend.git
git push -u origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Vercel will auto-detect Next.js settings

### 3. Configure Build Settings (Usually Auto-Detected)

Vercel should automatically detect:
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Deploy

1. Click "Deploy"
2. Wait ~2 minutes for the build to complete
3. Your app will be live at: `https://your-project-name.vercel.app`

## Environment Variables (Optional)

If you want to make the API URL configurable:

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://youtube-transcript-storage.automatehub.workers.dev`
4. Redeploy the project

Then update `lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://youtube-transcript-storage.automatehub.workers.dev';
```

## Custom Domain (Optional)

To use your own domain:

1. Go to project Settings → Domains
2. Add your domain
3. Follow Vercel's DNS configuration instructions
4. Your app will be accessible at your custom domain

## Automatic Deployments

Once set up, Vercel will automatically:
- Deploy every push to `main` branch (production)
- Create preview deployments for pull requests
- Run builds and tests automatically
- Provide deployment URLs for each commit

## Monitoring & Analytics

Vercel provides:
- Real-time deployment logs
- Performance analytics
- Error tracking
- Web Vitals metrics

Access these in your project dashboard.

## Build Configuration

If you need to customize the build, create a `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

## Troubleshooting Deployment

### Build Fails

1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Test the build locally: `npm run build`
4. Check for TypeScript errors: `npm run lint`

### Runtime Errors

1. Check the Function Logs in Vercel dashboard
2. Verify environment variables are set correctly
3. Check that API endpoints are accessible from Vercel's servers

### CORS Issues in Production

1. Ensure your Worker has CORS headers:
   ```typescript
   'Access-Control-Allow-Origin': '*'
   ```
2. Or specifically allow your Vercel domain:
   ```typescript
   'Access-Control-Allow-Origin': 'https://your-app.vercel.app'
   ```

## Performance Optimization

Vercel automatically provides:
- **Global CDN**: Content delivered from edge locations worldwide
- **Automatic HTTPS**: Free SSL certificates
- **Image Optimization**: Automatic image compression and resizing
- **Caching**: Static assets cached at the edge

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] First deployment successful
- [ ] Custom domain configured (optional)
- [ ] Environment variables set (if needed)
- [ ] Test all features in production
- [ ] Monitor performance and errors

## Cost

Vercel's free tier includes:
- Unlimited deployments
- 100 GB bandwidth per month
- Automatic HTTPS
- Preview deployments
- Analytics

Perfect for most projects. See [vercel.com/pricing](https://vercel.com/pricing) for details.

## Continuous Integration

For advanced CI/CD:

1. Create `.github/workflows/ci.yml`:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## Vercel CLI (Optional)

Install Vercel CLI for local testing:

```bash
npm i -g vercel
```

Commands:
```bash
vercel dev      # Run locally with production environment
vercel          # Deploy to preview
vercel --prod   # Deploy to production
vercel logs     # View deployment logs
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Deployment Guide](https://nextjs.org/docs/deployment)

---

**Your app is now live!** Share your deployment URL and start using your YouTube Transcript Storage app in production. 🚀
