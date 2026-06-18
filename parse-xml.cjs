const fs = require('fs');

const xmlData = `
<url>
<loc>https://couriermedicines.com/medicine-courier-from-punjab-to-zambia.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-kolkata-to-zambia.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-madhya-pradesh-to-zambia.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-jammu-and-kashmir-to-zambia.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-delhi-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-gurgaon-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-mumbai-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-bangalore-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-hyderabad-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-pune-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-chennai-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-kerala-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-chandigarh-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-lucknow-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-ahmedabad-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-noida-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-punjab-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-kolkata-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-madhya-pradesh-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
<url>
<loc>https://couriermedicines.com/medicine-courier-from-jammu-and-kashmir-to-lebanon.htm</loc>
<lastmod>2026-03-14T07:11:17+00:00</lastmod>
<priority>0.64</priority>
</url>
`;

const regex = /medicine-courier-from-([a-z\-]+)-to-([a-z\-]+)\.htm/g;
let match;
const locations = new Set();
const countries = new Set();

const formatName = (str) => {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

while ((match = regex.exec(xmlData)) !== null) {
  locations.add(formatName(match[1]));
  countries.add(formatName(match[2]));
}

console.log(JSON.stringify({
  locations: Array.from(locations),
  countries: Array.from(countries)
}, null, 2));
