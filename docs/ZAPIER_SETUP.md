# Zapier Integration Setup Guide

## Creating a Zapier Agent

This guide explains how to set up the Zapier AI Agent that powers the data analytics functionality.

### Step 1: Create a Zapier Account

1. Go to [zapier.com](https://zapier.com/)
2. Click "Sign Up" and choose your sign-up method
3. Select the Free plan (includes 100 tasks/month)

### Step 2: Create a New Zap

1. Click "Create" in the top navigation
2. Select "Create from scratch"
3. Name your Zap: "Data Analytics Agent"

### Step 3: Set Up the Trigger (Webhook)

1. Search for "Webhooks by Zapier"
2. Choose "Catch Raw Hook"
3. Click "Continue"
4. Copy the webhook URL provided
5. Paste this URL in your `.env.local` as `NEXT_PUBLIC_ZAPIER_WEBHOOK_URL`

### Step 4: Add Action (OpenAI)

1. Click the "+" button to add an action
2. Search for "OpenAI"
3. Select "Create Message"
4. Connect your OpenAI account
5. Set up the prompt:

```
You are a data analyst. Analyze the following data and provide:
- Statistical summary (mean, median, std dev, min, max)
- Trends and patterns
- Anomalies
- Actionable insights

Data: {{data}}
Analysis Type: {{analysisType}}
```

### Step 5: Store Results

1. Add another action: "Zapier Tables"
2. Create a new table called "Analysis Results"
3. Map the columns:
   - Input Data
   - Analysis Type
   - Insights
   - Timestamp

### Step 6: Test and Publish

1. Click "Test" to verify the webhook works
2. If successful, click "Publish"
3. Your Zap is now live!

## Free Tier Limits

- **100 tasks/month** ≈ 3 analyses per day
- **Unlimited Zaps** - You can create multiple
- **Unlimited Tables** - Store unlimited data
- **Unlimited Forms** - Accept unlimited submissions

## Troubleshooting

- **Webhook not receiving data?** - Check your `.env.local` URL
- **OpenAI errors?** - Verify API key and monthly quota
- **Task limit reached?** - Upgrade to Pro plan ($20/month) for 1,000 tasks

## Monitoring

In Zapier Dashboard:
- View run history
- Check logs for errors
- Monitor task usage
- Adjust filters as needed
