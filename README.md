# 🚀 Zapier AI Data Analytics Agent

> **Production-Ready Data Analytics AI Agent with Full Next.js Web UI**
> 
> Built with Zapier Agents, OpenAI GPT-4, and modern web technologies. Free tier compatible with complete documentation and deployment guide.

![Zapier](https://img.shields.io/badge/Zapier-Agents-FF5035?style=for-the-badge&logo=zapier)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![AI](https://img.shields.io/badge/AI-OpenAI-412991?style=for-the-badge&logo=openai)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Free Tier](https://img.shields.io/badge/Free%20Tier-Compatible-20C997?style=for-the-badge)

---

## 📋 Overview

A **complete, production-ready data analytics application** that combines:
- **Zapier Agents** - AI-powered automation and data processing
- **Next.js 14** - Modern React web framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Beautiful, responsive UI
- **OpenAI GPT-4** - Advanced AI analysis
- **Zustand** - Simple state management
- **Vercel** - Serverless deployment

### 🎯 Key Features

✅ **Automated Data Analysis**
- Statistical analysis (mean, median, std dev, min, max)
- Pattern and trend detection
- Anomaly detection with IQR method
- AI-generated insights and recommendations

✅ **Beautiful Web UI**
- Professional form for data input
- Real-time results display
- Analysis history with timestamps
- Download results as text/CSV
- Responsive design (mobile-friendly)

✅ **Zapier Integration**
- Webhook-based communication
- Async processing
- Queue management
- Error handling and retries

✅ **Production Ready**
- Environment variable configuration
- Error boundaries and logging
- API rate limiting
- Input validation
- Security best practices

---

## 🏗️ Architecture

```
User Interface (Next.js)
        ↓
  Form Submission
        ↓
  API Route (/api/analyze)
        ↓
  Zapier Webhook
        ↓
  Zapier Agent
        ↓
  OpenAI GPT-4 Analysis
        ↓
  Results Stored
        ↓
  Display in UI
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (download from [nodejs.org](https://nodejs.org))
- npm or yarn
- Zapier account (free tier available)
- OpenAI API key (free $5 credit)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kandulacharith4/zapier-ai-data-analytics.git
   cd zapier-ai-data-analytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```
   NEXT_PUBLIC_ZAPIER_WEBHOOK_URL=your_zapier_webhook_url
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📚 Documentation

- [Complete Setup Guide](./docs/SETUP.md)
- [Zapier Integration Guide](./docs/ZAPIER_SETUP.md)
- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

---

## 💻 Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|----------|
| **Frontend** | Next.js 14 + React 18 | Modern web UI |
| **Styling** | TailwindCSS | Beautiful, responsive design |
| **State** | Zustand | Light-weight state management |
| **API** | Next.js API Routes | Backend endpoints |
| **Data Process** | Zapier Agents | AI automation |
| **AI** | OpenAI GPT-4 | Analysis engine |
| **Database** | Zustand (in-memory) | Session storage |
| **Deployment** | Vercel | Serverless hosting |
| **Language** | TypeScript | Type-safe development |

---

## 📊 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts    # Webhook endpoint
│   └── globals.css         # Global styles
│
├── components/
│   ├── DataForm.tsx        # Input form
│   ├── Results.tsx         # Results display
│   ├── Dashboard.tsx       # Results history
│   ├── Header.tsx          # Page header
│   ├── LoadingState.tsx    # Loading UI
│   └── ui/                 # shadcn components
│
├── store/
│   └── analysisStore.ts    # Zustand store
│
├── types/
│   └── index.ts            # TypeScript types
│
└── utils/
    └── api.ts              # API helpers

public/
└── ...                      # Static assets

.env.example                # Environment template
package.json                # Dependencies
tsconfig.json               # TypeScript config
tailwind.config.ts          # Tailwind config
next.config.js              # Next.js config
```

---

## 🔧 Usage

### Analyzing Data

1. Go to the web app
2. Paste CSV data or describe your dataset
3. Select analysis type:
   - **Complete Analysis** - Full statistical + trend analysis
   - **Statistical Only** - Stats and distributions
   - **Trend Analysis** - Growth patterns and forecasts
4. Click "Analyze Data"
5. View results in real-time
6. Download report as text file

### Example Input

```
Monthly Sales: Jan:4500, Feb:5200, Mar:4800, Apr:6100, May:5900, Jun:7200, Jul:6800, Aug:7500, Sep:6300, Oct:8100, Nov:8900, Dec:9200
```

### Example Output

```
KEY INSIGHTS
✓ Strong growth trajectory (Dec vs Jan: +104%)
✓ Upward trend with seasonal patterns
✓ Q4 peak performance

STATISTICS
- Average: $6,658.33
- Median: $6,550
- Std Dev: $1,442.75
- Range: $4,500 - $9,200

RECOMMENDATIONS
1. Analyze September performance dip
2. Replicate successful Q4 strategies
3. Plan for seasonal Q1 variations
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select this repository
   - Add environment variables
   - Deploy!

3. **Your app is live!**
   - Automatic deployments on git push
   - HTTPS enabled
   - Custom domain support
   - Analytics included

### Deploy to AWS, GCP, or Azure

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

---

## 📈 Free Tier Economics

### Zapier Free Plan
- **100 tasks/month** - Sufficient for 30-50 analyses
- **Unlimited Zaps** - Unlimited automation workflows
- **Unlimited Tables** - Unlimited data storage
- **Unlimited Forms** - Unlimited form creations

### OpenAI Free Tier
- **$5 free credit** - ~500 analyses
- **After free:** ~$0.02-0.05 per analysis

### Hosting (Vercel Free Tier)
- **Serverless Functions** - 100GB bandwidth/month
- **Edge Functions** - Global deployment
- **Unlimited Deployments** - CI/CD included
- **SSL/HTTPS** - Automatic

**Total Monthly Cost (for small volume):** ~$0-5

---

## 🔒 Security & Privacy

✅ **Environment Variables**
- Sensitive data never committed to git
- API keys stored securely in `.env.local`

✅ **Data Encryption**
- HTTPS for all communications
- Encrypted at rest on Vercel

✅ **GDPR Compliance**
- No data logging
- User data deleted after session
- Compliant with privacy regulations

✅ **Best Practices**
- Input validation on all forms
- CSRF protection
- Rate limiting on API
- Error messages don't expose details

---

## 📞 Support & Help

- 📖 **Documentation** - See `/docs` folder
- 💬 **Issues** - [GitHub Issues](https://github.com/kandulacharith4/zapier-ai-data-analytics/issues)
- 🤝 **Discussions** - [GitHub Discussions](https://github.com/kandulacharith4/zapier-ai-data-analytics/discussions)
- 📧 **Email** - kandulacharith4@gmail.com

---

## 🌟 Features Roadmap

- [ ] CSV file upload with parsing
- [ ] Database integration (PostgreSQL)
- [ ] Advanced visualizations (charts, graphs)
- [ ] Machine learning predictions
- [ ] Scheduled reports
- [ ] Team collaboration
- [ ] API access for integrations
- [ ] Zapier integration templates
- [ ] Custom alert rules
- [ ] Data export (Excel, PDF)

---

## 📜 License

MIT License - Feel free to use, modify, and distribute this project.

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- **Zapier** - Powerful automation platform
- **OpenAI** - Advanced AI models
- **Next.js** - Modern React framework
- **TailwindCSS** - Beautiful styling
- **Vercel** - Seamless deployment

---

## 🚀 Get Started Now!

```bash
# Clone the repo
git clone https://github.com/kandulacharith4/zapier-ai-data-analytics.git

# Install dependencies
cd zapier-ai-data-analytics && npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Run locally
npm run dev

# Open http://localhost:3000
```

---

**⭐ If you find this helpful, please star this repository!**

**🔗 [View on GitHub](https://github.com/kandulacharith4/zapier-ai-data-analytics) | [Live Demo](#) (coming soon)**
