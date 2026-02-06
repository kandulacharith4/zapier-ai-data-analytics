# Vercel Deployment Guide

## Overview
This guide walks you through deploying the Zapier AI Data Analytics application to Vercel for free.

## Prerequisites
- GitHub account with the repository pushed
- Vercel account (create at https://vercel.com)
- Node.js 16+ installed locally

## Step-by-Step Deployment

### 1. Sign Up or Log In to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Grant permissions to the repository

### 2. Create a New Project
1. Click "Add New..." → "Project"
2. Find and select `zapier-ai-data-analytics` repository
3. Click "Import"

### 3. Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Build and Output Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
Add the following environment variables in the "Environment Variables" section:

```
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
ZAPIER_WEBHOOK_URL=your_zapier_webhook_url_here
```

### 4. Deploy
1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Once complete, you'll see your live URL

## Post-Deployment

### Update Zapier Webhook
1. Go to your Zapier Agent settings
2. Update the webhook URL to point to your Vercel deployment:
   ```
   https://your-domain.vercel.app/api/analyze
   ```
3. Test the webhook connection

### Test File Upload Feature
1. Navigate to your Vercel deployment URL
2. Upload a CSV file with the FileUpload component
3. Verify the data analysis dashboard displays correctly
4. Check API responses in the browser console

## Troubleshooting

### Build Fails
**Issue:** `Error: Cannot find module 'next'`

**Solution:**
- Check package.json dependencies
- Verify Node.js version compatibility
- Clear build cache in Vercel project settings

### File Upload Not Working
**Issue:** 413 Payload Too Large error

**Solution:**
In `next.config.js`, add:
```javascript
module.exports = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
```

### CORS Issues
**Issue:** File upload fails with CORS error

**Solution:**
Ensure your API route handles CORS properly:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Allow', 'POST');
```

## Environment-Specific Configurations

### Development (Local)
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Production (Vercel)
- Automatic deployments on every push to `main` branch
- Preview deployments for pull requests
- Environment variables managed in Vercel dashboard

## Monitoring & Logs

### View Deployment Logs
1. Go to your Vercel project dashboard
2. Click "Deployments" tab
3. Select the deployment
4. View build logs and function logs

### Enable Analytics
1. In Vercel dashboard, go to "Analytics"
2. View real-time performance metrics
3. Monitor API usage and errors

## Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Zapier webhook URL with custom domain

## Continuous Deployment

Vercel automatically deploys when you:
- Push to the main branch
- Create or update pull requests
- Manually trigger from Vercel dashboard

## Performance Optimization

### Image Optimization
Next.js automatically optimizes images. Ensure CSV files are processed efficiently:

```typescript
// Recommended: Process large files in chunks
const CHUNK_SIZE = 100000; // rows
```

### Database Queries
If adding a database later, use serverless-compatible options:
- Supabase (PostgreSQL)
- MongoDB Atlas
- Firebase Realtime Database

## Security Best Practices

1. **API Keys:** Store Zapier webhook URLs in environment variables
2. **CORS:** Restrict to trusted domains only
3. **Input Validation:** Validate CSV uploads before processing
4. **Rate Limiting:** Implement rate limiting for API routes

## Rollback & Versioning

### Rollback to Previous Deployment
1. Go to "Deployments" in Vercel
2. Click on a previous deployment
3. Click "Promote to Production"

### Version Control
Each Git commit creates a Vercel deployment:
- Use semantic versioning in your releases
- Tag important versions in Git
- Reference deployment from GitHub releases

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test file upload and analysis
3. ✅ Configure custom domain (optional)
4. ✅ Monitor performance
5. ✅ Share deployment URL on LinkedIn
6. ✅ Add GitHub badge with deployment status

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Zapier Webhooks](https://zapier.com/help/create/intro/understanding-webhooks)

## FAQ

**Q: Is Vercel hosting free?**
A: Yes, the Hobby plan is free with limitations on usage.

**Q: Can I use a custom domain?**
A: Yes, add it in Vercel project settings and update DNS records.

**Q: How do I debug API errors?**
A: Check Vercel function logs and browser console for errors.

**Q: Can I preview changes before deploying?**
A: Yes, Vercel creates preview URLs for pull requests.
