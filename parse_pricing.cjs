const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'raw_pricing.txt'), 'utf8');
const lines = data.split('\n').filter(l => l.trim().length > 0 && !l.includes('---') && !l.includes('S.No'));

const pricingMap = {};

lines.forEach(line => {
  // Parsing regex since columns are separated by multiple spaces
  // "1     Australia             UPS               3305     5254  4-6 Days"
  const parts = line.trim().split(/\s{2,}/);
  if (parts.length >= 6) {
    const country = parts[1].trim();
    const provider = parts[2].trim();
    const halfKg = parseInt(parts[3].trim());
    const oneKg = parseInt(parts[4].trim());
    const timeline = parts[5].trim();

    if (!pricingMap[country]) {
      pricingMap[country] = [];
    }

    pricingMap[country].push({
      provider,
      halfKgPrice: halfKg,
      oneKgPrice: oneKg,
      timeline
    });
  }
});

const output = `export const PRICING_DATA = ${JSON.stringify(pricingMap, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, 'src', 'constants', 'pricingData.js'), output);
console.log('Successfully generated src/constants/pricingData.js');
