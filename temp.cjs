const fs = require('fs');
const code = fs.readFileSync('src/constants/index.js', 'utf8');

const countriesMatch = code.match(/export const ALL_COUNTRIES = \[([\s\S]*?)\];/);
const countries = countriesMatch ? countriesMatch[1].split('},').length : 0;

const locationsMatch = code.match(/export const ALL_LOCATIONS = \[([\s\S]*?)\];/);
const locationsBlock = locationsMatch ? locationsMatch[1] : '';
const cityMatches = locationsBlock.match(/city: '([^']+)'|city: "([^"]+)"/g) || [];
const cities = [...new Set(cityMatches.map(m => m.replace(/city: ['"]|['"]$/g, '')))];

console.log('Total Countries:', countries);
console.log('Total Unique Locations:', cities.length);
console.log('Cities:', cities.join(', '));
