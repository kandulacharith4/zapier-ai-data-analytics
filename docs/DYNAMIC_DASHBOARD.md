# Dynamic Dashboard Implementation Guide

## Overview

The Dynamic Dashboard system automatically generates beautiful, responsive dashboards based on any uploaded CSV/Excel data file. The AI agent analyzes the data and extracts meaningful metrics that are displayed in a professional dashboard layout.

## How It Works

### 1. Data Upload Flow
```
User Uploads CSV/Excel File
        ↓
Data Parser extracts metrics
        ↓
AI Agent analyzes data
        ↓
Dashboard Generator creates layout
        ↓
Metric Cards, Charts & Insights displayed
```

## Architecture Components

### dataParser.ts - Data Extraction
**Purpose:** Parse uploaded files and extract metrics

**Extracts:**
- Top 4 metrics from the data
- Numeric values (sum, avg, min, max)
- Trend calculations (% change)
- Unit detection (currency, percentage, etc.)
- Time series data if available

**Example:**
```typescript
import { parseCSVData } from '@/app/utils/dataParser';

const metrics = await parseCSVData(csvText);
// Returns: { topMetrics, timeSeries, summary }
```

### dashboardGenerator.tsx - UI Components
**Components:**
- **MetricCard** - Displays single metric with trend
- **TrendChart** - Bar chart for trend visualization
- **InsightsSection** - AI-generated insights
- **DynamicDashboard** - Main layout component

**Example:**
```typescript
import { DynamicDashboard } from '@/app/utils/dashboardGenerator';

<DynamicDashboard metrics={metrics} />
```

## Usage Examples

### Example 1: Sales Data
**Upload CSV:**
```
Month,Sales,Units,Cost
Jan,4500,120,3200
Feb,5200,140,3500
Mar,4800,135,3300
Apr,6100,170,4200
May,5900,165,4100
Jun,7200,200,5000
```

**Dashboard Shows:**
- Total Sales: $33,700 (↑60%)
- Total Units: 930 (↑67%)
- Total Cost: $23,300 (↑56%)
- Average Sales: $5,617
- Trend analysis chart
- AI insights on sales performance

### Example 2: Website Analytics
**Upload CSV:**
```
Date,Visitors,PageViews,BounceRate,AvgSessionTime
2024-01-01,1250,3400,42,3.2
2024-01-02,1380,3800,40,3.5
2024-01-03,1520,4200,38,4.1
2024-01-04,1890,5100,35,4.8
2024-01-05,2100,5800,32,5.2
```

**Dashboard Shows:**
- Total Visitors: 8,140 (↑68%)
- Total PageViews: 22,300 (↑71%)
- Average BounceRate: 37.4% (↓24%)
- Trend chart showing visitor growth
- Performance insights

### Example 3: Inventory Data
**Upload CSV:**
```
ProductName,Quantity,UnitPrice,ReorderLevel,Warehouse
Laptops,45,899,20,A
Mice,320,25,100,B
Keyboards,180,75,50,A
Monitors,65,299,15,C
Headphones,240,79,80,B
```

**Dashboard Shows:**
- Total Inventory Value: $48,995
- Total Units: 850
- Average Unit Price: $155.43
- Distribution of products
- Stock level insights

## File Upload Implementation

### Next.js API Route
```typescript
// app/api/analyze/route.ts
import { parseCSVData } from '@/app/utils/dataParser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const text = await file.text();
    const metrics = await parseCSVData(text);
    
    // Send to Zapier webhook for AI analysis
    const zapierResponse = await fetch(
      process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: metrics,
          fileName: file.name,
          timestamp: new Date().toISOString()
        })
      }
    );

    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze data' },
      { status: 500 }
    );
  }
}
```

### React Component (File Upload)
```typescript
// app/components/FileUpload.tsx
'use client';

import { useState } from 'react';
import { DynamicDashboard } from '@/app/utils/dashboardGenerator';
import { DashboardMetrics } from '@/app/utils/dataParser';

export function FileUpload() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          disabled={loading}
          className="block w-full text-sm text-slate-500"
        />
        {loading && <p className="mt-2 text-blue-600">Analyzing data...</p>}
      </div>

      {metrics && <DynamicDashboard metrics={metrics} />
      }
    </div>
  );
}
```

## Supported File Formats

- **CSV** - Comma-separated values
- **XLSX** - Excel 2007+
- **XLS** - Legacy Excel

## Dashboard Features

✅ **Automatic Metric Detection**
- Identifies numeric columns
- Calculates sums, averages, trends
- Detects units (currency, %, etc.)

✅ **Responsive Design**
- Mobile-friendly (1 column)
- Tablet-friendly (2 columns)
- Desktop-friendly (4 columns)

✅ **Real-time Analysis**
- Instant dashboard generation
- Trend calculation
- Anomaly detection

✅ **AI Integration**
- Zapier webhook processing
- OpenAI analysis
- Smart insights generation

## Customization

### Change Number of Top Metrics
```typescript
// In dataParser.ts, line 77
topMetrics: topMetrics.slice(0, 6) // Show top 6 instead of 4
```

### Change Dashboard Layout
```typescript
// In dashboardGenerator.tsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {/* Shows 6 columns on desktop */}
</div>
```

### Add Custom Charts
```typescript
// Create new component
export function PieChart({ data }) {
  // Your chart implementation
}

// Add to DynamicDashboard
{metrics.distribution && <PieChart data={metrics.distribution} />}
```

## Performance Tips

- CSV files up to 10MB work best
- 10K+ rows may take 2-3 seconds
- Use CSV format for faster parsing than Excel
- Cache dashboard data in Zustand store

## Troubleshooting

**Issue:** Dashboard shows no metrics
**Solution:** Ensure CSV has numeric columns in rows 2+

**Issue:** Trends show 0%
**Solution:** Need at least 2 rows of data for trend calculation

**Issue:** Wrong unit detected
**Solution:** Update detectUnit() function with domain-specific keywords

## Future Enhancements

- 📊 Advanced charting (pie, scatter, etc.)
- 📈 Predictive analytics
- 🔄 Data source integrations
- 💾 Dashboard persistence
- 🎨 Custom color schemes
- 📱 Export to PDF/PowerPoint
