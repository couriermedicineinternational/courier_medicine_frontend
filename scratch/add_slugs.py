import re
import json

path = r'c:\Users\ahaad\OneDrive\Desktop\courier-medicine\src\constants\index.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# We want to replace { code: "XX", name: "Country" } with { code: "XX", name: "Country", slug: "..." }
# We should be careful to only do this for the ALL_COUNTRIES array.
# The ALL_COUNTRIES array starts with: export const ALL_COUNTRIES = [
# and ends with ]

start_index = content.find('export const ALL_COUNTRIES = [')
if start_index == -1:
    print("ALL_COUNTRIES not found")
    exit()

end_index = content.find('];', start_index)
if end_index == -1:
    print("End of ALL_COUNTRIES not found")
    exit()

all_countries_str = content[start_index:end_index+2]

def add_slug(match):
    # match.group(0) is the full match: { code: "XX", name: "..." ... }
    # Let's extract name
    name = match.group(2)
    
    slug = 'india-to-' + name.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('/', '-') + '-medicine-courier-charges.htm'
    slug = re.sub(r'-+', '-', slug)
    
    # insert slug after name
    return f'{{ code: "{match.group(1)}", name: "{name}", slug: "{slug}"'

new_all_countries_str = re.sub(r'\{\s*code:\s*"([^"]+)",\s*name:\s*"([^"]+)"', add_slug, all_countries_str)

new_content = content[:start_index] + new_all_countries_str + content[end_index+2:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated index.js with slugs.")
