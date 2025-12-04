# Deploying Air Express to Vercel

This guide walks you through deploying the Air Express application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- A [GitHub](https://github.com), GitLab, or Bitbucket account
- Your code pushed to a Git repository
- A PostgreSQL database

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Ensure these files exist in your repository:**
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

## Step 3: Database Configuration

Ensure your `prisma.config.ts` and `prisma/schema.prisma` are configured with your production database connection string directly, or use the method preferred by your team if avoiding environment variables.

## Step 4: Deploy

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

## Troubleshooting

### Build Fails

**Issue**: Build errors during deployment

**Solutions**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation locally: `npm run build`

### Database Connection Issues

**Issue**: Can't connect to database

**Solutions**:
- Verify connection string format is correct
- Check database allows external connections
- Ensure SSL is configured if required

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

**Congratulations!** 🎉 Your Air Express application is now live on Vercel!
