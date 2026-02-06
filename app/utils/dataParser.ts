// Data Parser Utility - Extracts metrics from CSV/Excel data

export interface DataMetric {
  name: string;
  value: number | string;
  type: 'number' | 'percentage' | 'text' | 'date';
  icon?: string;
  trend?: number; // percentage change
  unit?: string;
}

export interface DashboardMetrics {
  topMetrics: DataMetric[];
  timeSeries?: Array<{ timestamp: string; value: number }>;
  distribution?: { [key: string]: number };
  summary: string;
}

// Parse CSV data and extract metrics
export async function parseCSVData(csvText: string): Promise<DashboardMetrics> {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, idx) => {
      obj[header] = values[idx]?.trim();
      return obj;
    }, {} as Record<string, string>);
  });

  const metrics = extractMetrics(headers, rows);
  return metrics;
}

// Extract metrics from parsed data
function extractMetrics(headers: string[], rows: Record<string, string>[]): DashboardMetrics {
  const topMetrics: DataMetric[] = [];
  const timeSeries: Array<{ timestamp: string; value: number }> = [];

  headers.forEach(header => {
    const values = rows.map(row => row[header]);
    const numericValues = values
      .map(v => parseFloat(v))
      .filter(v => !isNaN(v));

    if (numericValues.length > 0) {
      const sum = numericValues.reduce((a, b) => a + b, 0);
      const avg = sum / numericValues.length;
      const max = Math.max(...numericValues);
      const min = Math.min(...numericValues);

      // Add top metric
      topMetrics.push({
        name: header,
        value: sum,
        type: 'number',
        unit: detectUnit(header),
        trend: calculateTrend(numericValues)
      });

      // Create time series if data has timestamp column
      if (header.toLowerCase().includes('date') || header.toLowerCase().includes('time')) {
        rows.forEach((row, idx) => {
          const nextVal = numericValues[idx + 1];
          if (nextVal) {
            timeSeries.push({
              timestamp: row[header],
              value: nextVal
            });
          }
        });
      }
    }
  });

  return {
    topMetrics: topMetrics.slice(0, 4), // Top 4 metrics
    timeSeries: timeSeries.length > 0 ? timeSeries : undefined,
    summary: generateSummary(topMetrics)
  };
}

function detectUnit(header: string): string {
  const lower = header.toLowerCase();
  if (lower.includes('price') || lower.includes('cost') || lower.includes('revenue')) return '$';
  if (lower.includes('percent') || lower.includes('rate')) return '%';
  if (lower.includes('quantity') || lower.includes('count')) return 'units';
  return '';
}

function calculateTrend(values: number[]): number {
  if (values.length < 2) return 0;
  const first = values[0];
  const last = values[values.length - 1];
  return Math.round(((last - first) / first) * 100);
}

function generateSummary(metrics: DataMetric[]): string {
  const trends = metrics
    .filter(m => m.trend)
    .map(m => `${m.name} ${m.trend! > 0 ? '↑' : '↓'} ${Math.abs(m.trend!)}%`)
    .join(', ');
  return `Key trends: ${trends}`;
}
