# eSIM Plan Selector

A Next.js 15 application for selecting eSIM plans by country, data amount, and duration with dynamic pricing from Google Sheets.

## Technologies

- **Next.js 15** - React framework with App Router and server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Flag Icons** - Country flag SVG icons

## Project Structure

```
e-sim-plan-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Base UI components
│   │   ├── Button.tsx
│   │   └── RadioButton.tsx
│   ├── CountryDropdown.tsx
│   ├── DataPlanTabs.tsx
│   ├── DurationRadioGroup.tsx
│   ├── DeviceCompatibilityButton.tsx
│   └── PricingClient.tsx
├── lib/
│   └── pricing.ts          # Pricing data fetching and utilities
└── public/
    └── assets/
        └── image.png       # Scenic landscape image
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Data Source

Pricing data is fetched from Google Sheets via CSV export URL. Data is cached and revalidated every hour.
