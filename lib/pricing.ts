export interface PricingData {
  country: string;
  countryCode: string;
  gb: string;
  days: number;
  price: number;
  comment?: string;
}

export async function fetchPricingData(): Promise<PricingData[]> {
  try {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/175nZGjBS7q9ApbDJPeo_BXyr-J8Joof2ciqXs2FKVtA/export?format=csv',
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch pricing data');
    }
    
    const csvText = await response.text();
    const lines = csvText.split('\n').filter(line => line.trim());
    
    const dataLines = lines.slice(1);
    
    const pricingData: PricingData[] = [];
    
    for (const line of dataLines) {
      const columns = line.split(',');
      if (columns.length < 5) continue;
      
      const country = columns[0]?.trim() || '';
      const countryCode = columns[1]?.trim() || '';
      const gb = columns[2]?.trim() || '';
      const days = parseInt(columns[3]?.trim() || '0', 10);
      const price = parseFloat(columns[4]?.trim() || '0');
      const comment = columns[5]?.trim();
      
      if (!country || !countryCode || isNaN(days) || isNaN(price)) {
        continue;
      }
      
      pricingData.push({
        country,
        countryCode,
        gb,
        days,
        price,
        ...(comment && { comment }),
      });
    }
    
    return pricingData;
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return [];
  }
}

export function getCountriesFromPricingData(data: PricingData[]): string[] {
  const countries = new Set(data.map(item => item.country));
  return Array.from(countries).sort();
}

export function getPricingForCountry(
  data: PricingData[],
  countryCode: string,
  days: number
): PricingData | null {
  return (
    data.find(
      item => item.countryCode === countryCode && item.days === days
    ) || null
  );
}

export function getAvailableDaysForCountry(
  data: PricingData[],
  countryCode: string
): number[] {
  const days = new Set(
    data
      .filter(item => item.countryCode === countryCode)
      .map(item => item.days)
  );
  return Array.from(days).sort((a, b) => a - b);
}

