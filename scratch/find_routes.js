const fs = require('fs');
const path = require('path');

const searchPaths = ['"/about"', '"/popular-countries"', '"/popular-locations"', '"/blog"', '"/faq"', '"/contact"', '"/track"'];
const searchPaths2 = ["'/about'", "'/popular-countries'", "'/popular-locations'", "'/blog'", "'/faq'", "'/contact'", "'/track'"];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.jsx') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('src');
for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const sp of searchPaths) {
        if (content.includes(sp)) {
            console.log(file, 'contains', sp);
        }
    }
    for (const sp of searchPaths2) {
        if (content.includes(sp)) {
            console.log(file, 'contains', sp);
        }
    }
}
