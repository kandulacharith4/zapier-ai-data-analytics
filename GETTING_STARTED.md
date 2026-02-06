# Getting Started with Zapier AI Data Analytics Agent

## Quick Setup (5 minutes)

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- A Zapier account (free tier available)
- GitHub account (for deployment)

### Step 1: Clone or Download the Repository

```bash
git clone https://github.com/kandulacharith4/zapier-ai-data-analytics.git
cd zapier-ai-data-analytics
```

### Step 2: Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your values:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ZAPIER_WEBHOOK_URL=<your-zapier-webhook-url>
   ```

### Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Using the Application

### 1. Upload CSV Data

1. Go to the "Upload CSV" tab
2. Drag and drop or click to select a CSV/Excel file
3. Supported formats: `.csv`, `.xlsx`, `.xls`
4. File size limit: 50MB

### 2. AI Analysis

Once uploaded, the file is sent to your Zapier webhook which:
- Parses the CSV data
- Sends it to OpenAI GPT-4 for analysis
- Generates insights and metrics
- Returns processed data with visualizations

### 3. View Dashboard

After analysis completes, view:
- **Metrics**: Key statistics from your data
- **Insights**: AI-generated insights from OpenAI
- **Charts**: Visual representations of data patterns
- **Recent Analyses**: Quick access to previous uploads

## Setting Up Zapier Integration

### Create a Zapier Agent

1. Go to [agents.zapier.com](https://agents.zapier.com)
2. Click "Create Agent"
3. Name: "Data Analytics AI"
4. Description: "Analyzes CSV data and generates insights"
5. Click "Create"

### Configure the Agent

**Add Instructions:**

```
You are a data analyst AI assistant. When a user uploads a CSV file:

1. Parse the CSV data
2. Calculate key metrics (count, sum, average, min, max)
3. Identify patterns and trends
4. Generate 5 actionable insights
5. Return results in JSON format with:
   - metrics: {key1: value1, key2: value2, ...}
   - insights: [insight1, insight2, ...]
   - charts: [{type: 'line|bar|pie', title: '...', data: {...}}]
```

### Get Webhook URL

1. In Agent Settings, scroll to "Webhooks"
2. Click "Create Webhook"
3. Copy the webhook URL
4. Add it to your `.env.local` as `ZAPIER_WEBHOOK_URL`

## File Upload Configuration

The application uses the `/api/analyze` route to handle file uploads:

```typescript
// app/api/analyze/route.ts
// Supports:
// - CSV files (.csv)
// - Excel files (.xlsx, .xls)
// - File size up to 50MB
// - Returns JSON with metrics, insights, and charts
```

## Project Structure

```
zapier-ai-data-analytics/
├── app/
│   ├── components/
│   │   ├── FileUpload.tsx      # Drag-drop file upload
│   │   ├── Dashboard.tsx       # Results visualization
│   │   ├── Header.tsx          # App header
│   │   ├── DataForm.tsx        # Form components
│   │   └── Results.tsx         # Results display
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts        # File upload endpoint
│   ├── store/
│   │   └── analysisStore.ts    # State management
│   ├── utils/
│   │   ├── dataParser.ts       # CSV parsing
│   │   └── dashboardGenerator.tsx # Chart generation
│   ├── layout.tsx
│   ├── page.tsx                # Main page
│   └── globals.css
├── docs/
│   ├── VERCEL_DEPLOYMENT.md
│   ├── DYNAMIC_DASHBOARD.md
│   ├── ZAPIER_SETUP.md
│   └── SETUP.md
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md
```

## Common Tasks

### Test with Sample Data

Create a sample CSV file (`sales_data.csv`):

```csv
Date,Product,Sales,Region
2024-01-01,Widget A,1500,North
2024-01-02,Widget B,2000,South
2024-01-03,Widget A,1800,East
2024-01-04,Widget C,2200,West
2024-01-05,Widget B,1900,North
```

1. Upload this file via the UI
2. Wait for analysis to complete
3. View generated insights and metrics

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

See [VERCEL_DEPLOYMENT.md](docs/VERCEL_DEPLOYMENT.md) for detailed instructions.

### Debug File Upload Issues

1. Check browser console (F12) for errors
2. Check API response in Network tab
3. Verify webhook URL in Zapier agent settings
4. Test webhook with sample JSON in Zapier

## Troubleshooting

### Issue: "Cannot find module 'next'"
**Solution:** Run `npm install` to install all dependencies

### Issue: File upload fails with large files
**Solution:** The limit is 50MB. Check file size or split into smaller files.

### Issue: Zapier webhook returns 404
**Solution:** Verify webhook URL is correct in `.env.local` and enabled in Zapier settings

### Issue: Dashboard not updating after upload
**Solution:** 
1. Check browser console for errors
2. Verify API route is working: `curl http://localhost:3000/api/analyze`
3. Check Zapier webhook logs for failures

## Next Steps

1. ✅ Setup complete!
2. 📊 Upload your first CSV file
3. 🚀 Customize Zapier agent instructions
4. 🌐 Deploy to Vercel for production
5. 📱 Share with team members

## Performance Tips

- **For Large Files**: Split CSV files into chunks (< 10MB each)
- **For Slow Network**: Use local development first, then deploy
- **For Better Insights**: Provide clean, structured CSV data
- **For Faster Processing**: Use Excel format instead of CSV

## Security Considerations

1. **API Keys**: Keep `ZAPIER_WEBHOOK_URL` secure, never commit to Git
2. **File Uploads**: Files are processed and not stored permanently
3. **Data Privacy**: No data is retained on servers after processing
4. **CORS**: Configure in `next.config.js` for your domain

## Support & Resources

- 📖 [Full Documentation](README.md)
- 🚀 [Deployment Guide](docs/VERCEL_DEPLOYMENT.md)
- 🔗 [Zapier Documentation](https://zapier.com/help)
- 📊 [Next.js Documentation](https://nextjs.org/docs)

## License

MIT License - see LICENSE file for details
