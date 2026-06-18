import os

files_to_update = [
    'src/App.jsx',
    'src/components/layout/Navbar.jsx',
    'src/components/layout/Topbar.jsx',
    'src/constants/index.js',
    'src/pages/CountryDetail.jsx',
    'src/pages/LocationDetail.jsx',
    'src/pages/PopularLocations.jsx',
    'src/pages/PopularCountries.jsx'
]

replacements = {
    '"/about"': '"/about.htm"',
    '"/popular-countries"': '"/popular-countries.htm"',
    '"/popular-locations"': '"/popular-locations.htm"',
    '"/blog"': '"/blog.htm"',
    '"/faq"': '"/faq.htm"',
    '"/contact"': '"/contact.htm"',
    '"/track"': '"/track.htm"',
    
    # Check for single quotes as well
    "'/about'": "'/about.htm'",
    "'/popular-countries'": "'/popular-countries.htm'",
    "'/popular-locations'": "'/popular-locations.htm'",
    "'/blog'": "'/blog.htm'",
    "'/faq'": "'/faq.htm'",
    "'/contact'": "'/contact.htm'",
    "'/track'": "'/track.htm'",
}

for file_path in files_to_update:
    full_path = os.path.join(r'c:\Users\ahaad\OneDrive\Desktop\courier-medicine', file_path)
    if not os.path.exists(full_path):
        continue
        
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replaced static routes with .htm")
