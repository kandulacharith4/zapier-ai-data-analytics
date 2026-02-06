# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js
- **Git** - [Download from git-scm.com](https://git-scm.com/)
- **Zapier Account** - [Sign up for free at zapier.com](https://zapier.com/)
- **OpenAI API Key** - [Get $5 free credit at platform.openai.com](https://platform.openai.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/kandulacharith4/zapier-ai-data-analytics.git
cd zapier-ai-data-analytics
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, TailwindCSS, and Zustand.

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```bash
# Zapier Configuration
NEXT_PUBLIC_ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID

# OpenAI API Configuration
OPENAI_API_KEY=sk-YOUR_OPENAI_API_KEY

# Application Settings
NEXT_PUBLIC_APP_NAME=Zapier AI Data Analytics
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG=false
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting Your API Keys

### OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API keys section
4. Create a new API key
5. Copy and paste it in `.env.local`

### Zapier Webhook URL

See [ZAPIER_SETUP.md](./ZAPIER_SETUP.md) for detailed instructions.

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

- **Port 3000 already in use?** - Change port: `npm run dev -- -p 3001`
- **Dependencies not installing?** - Try: `rm -rf node_modules && npm install`
- **API keys not working?** - Verify they're correctly set in `.env.local`
