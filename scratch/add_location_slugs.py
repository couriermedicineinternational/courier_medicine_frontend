import re

path = r'c:\Users\ahaad\OneDrive\Desktop\courier-medicine\src\constants\index.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to add slug to ALL_LOCATIONS
# ALL_LOCATIONS starts with: export const ALL_LOCATIONS = [
start_index = content.find('export const ALL_LOCATIONS = [')
end_index = content.find('];', start_index)

all_locations_str = content[start_index:end_index+2]

def add_slug(match):
    # match.group(0) is the full match: { id: "xx", city: "xx", country: "xx", name: "xx" }
    city = match.group(2)
    country = match.group(3)
    
    slug = 'medicine-courier-from-' + city.lower().replace(' ', '-').replace('&', 'and') + '-to-' + country.lower().replace(' ', '-').replace('&', 'and') + '.htm'
    slug = re.sub(r'-+', '-', slug)
    
    # inject slug
    return f'{{ id: "{match.group(1)}", city: "{city}", country: "{country}", name: "{match.group(4)}", slug: "{slug}"'

new_all_locations_str = re.sub(r'\{\s*id:\s*"([^"]+)",\s*city:\s*"([^"]+)",\s*country:\s*"([^"]+)",\s*name:\s*"([^"]+)"', add_slug, all_locations_str)

new_content = content[:start_index] + new_all_locations_str + content[end_index+2:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated index.js with location slugs.")
