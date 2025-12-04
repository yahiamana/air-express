# Deploying Air Express to Vercel

This guide walks you through deploying the Air Express application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- A [GitHub](https://github.com), GitLab, or Bitbucket account
- Your code pushed to a Git repository
- A PostgreSQL database (we recommend [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Supabase](https://supabase.com/))

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Ensure these files exist in your repository:**
   - `.env.example` (template for environment variables)
   - `vercel.json` (Vercel configuration)
   - `next.config.ts` (Next.js production config)
   - All production optimizations implemented

## Step 2: Import Project to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New Project"**

3. **Import your Git repository:**
   - Select your Git provider (GitHub, GitLab, or Bitbucket)
   - Authorize Vercel to access your repositories
   - Select the `airexpress` repository

4. **Configure Project:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

## Step 3: Set Up Environment Variables

Before deploying, configure your environment variables in Vercel:

1. **In the "Configure Project" section, click "Environment Variables"**

2. **Add the following variables:**

   | Key | Value | Example |
   |-----|-------|---------|
   | `DATABASE_URL` | Your PostgreSQL connection string | `postgresql://user:password@host:5432/dbname` |
   | `NODE_ENV` | `production` | `production` |
   | `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL | `https://airexpress.vercel.app` |

   > **Note**: You'll need to update `NEXT_PUBLIC_APP_URL` after your first deployment with your actual Vercel URL.

3. **Environment Options:**
   - Select which environments need each variable:
     - ✅ Production
     - ✅ Preview (optional, for testing)
     - ❌ Development (use local `.env` file)

## Step 4: Set Up Database

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Follow the setup wizard
5. Copy the connection string to your `DATABASE_URL` environment variable

### Option B: External Database (Supabase, Railway, etc.)

1. Create a PostgreSQL database on your preferred provider
2. Copy the connection string
3. Add it to Vercel as `DATABASE_URL` environment variable
4. Ensure the database accepts connections from Vercel's IP ranges

### Run Database Migrations

If using Prisma, you'll need to run migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

> **Note**: You can run these in Vercel's deployment logs or set up a post-build script.

## Step 5: Deploy

1. **Click "Deploy"**
   
   Vercel will:
   - Install dependencies
   - Run the build process
   - Deploy to a production URL
   - Set up automatic HTTPS

2. **Wait for deployment** (usually 1-3 minutes)

3. **Verify deployment:**
   - Check the deployment status
   - Review build logs if there are any errors
   - Visit your live site at `https://your-project.vercel.app`

## Step 6: Update Environment Variables

After your first deployment, update the following:

1. **Copy your Vercel deployment URL** (e.g., `https://airexpress.vercel.app`)

2. **Update Environment Variable:**
   - Go to **Project Settings** → **Environment Variables**
   - Edit `NEXT_PUBLIC_APP_URL`
   - Change from local URL to your Vercel URL
   - Save changes

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click the ⋯ menu on the latest deployment
   - Select **Redeploy**

## Step 7: Configure Custom Domain (Optional)

1. **Go to Project Settings → Domains**

2. **Add your custom domain:**
   - Enter your domain (e.g., `airexpress.com`)
   - Follow DNS configuration instructions
   - Vercel will automatically provision SSL certificate

3. **Update Environment Variables:**
   - Change `NEXT_PUBLIC_APP_URL` to your custom domain
   - Redeploy the application

## Step 8: Verify Production Deployment

Test all critical functionality:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Services page displays properly
- [ ] Contact form functions
- [ ] Order placement works
- [ ] Admin dashboard is accessible
- [ ] Custom 404 page appears for invalid URLs
- [ ] Check `/robots.txt` is accessible
- [ ] Check `/sitemap.xml` is generated
- [ ] Verify Open Graph tags (use [OpenGraph.xyz](https://www.opengraph.xyz/))

## Continuous Deployment

Vercel automatically deploys:

- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a unique preview URL

To disable automatic deployments:
1. Go to **Project Settings** → **Git**
2. Adjust deployment settings as needed

## Troubleshooting

### Build Fails

**Issue**: Build errors during deployment

**Solutions**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation locally: `npm run build`
- Check environment variables are set correctly

### Database Connection Issues

**Issue**: Can't connect to database

**Solutions**:
- Verify `DATABASE_URL` format is correct
- Check database allows external connections
- Ensure SSL is configured if required
- Test connection string locally first

### Environment Variables Not Working

**Issue**: `process.env.VARIABLE` is undefined

**Solutions**:
- Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

### 404 on API Routes

**Issue**: API endpoints return 404

**Solutions**:
- Verify routes are in `app/api/` directory
- Check `route.ts` files export proper HTTP methods
- Review Vercel deployment logs for routing issues

## Performance Optimization

After deployment, optimize performance:

1. **Enable Analytics:**
   - Vercel Analytics (free tier available)
   - Monitor Core Web Vitals

2. **Check Lighthouse Scores:**
   - Run audit on live site
   - Address any performance issues

3. **Monitor Logs:**
   - Check for errors in Vercel dashboard
   - Set up error tracking (Sentry, etc.)

## Security Checklist

- [ ] All secrets are in environment variables (not hardcoded)
- [ ] `.env` file is in `.gitignore`
- [ ] Security headers are configured (check `next.config.ts`)
- [ ] Admin routes are protected
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] CORS is properly configured

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

**Congratulations!** 🎉 Your Air Express application is now live on Vercel!
