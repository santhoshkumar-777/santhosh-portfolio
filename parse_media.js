const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const result = [];
let re = /@media \([^\{]+\{\s*([\s\S]*?})\s*}/g;
let match;
while(match = re.exec(css)) {
    let inner = match[1];
    if(inner.includes('.resume-btn {')) {
        let mq = css.substring(match.index, match.index + match[0].indexOf('{') + 1);
        let btnMatch = inner.match(/\.resume-btn\s*\{([^}]+)\}/);
        if(btnMatch) {
            let rules = btnMatch[1].trim().split('\n').map(l => l.trim());
            let topRule = rules.find(r => r.startsWith('top:'));
            let wRule = rules.find(r => r.startsWith('width:'));
            if(topRule || wRule) {
               console.log(mq.trim());
               if(topRule) console.log(`  .social-fab-container { ${topRule} left: ${rules.find(r => r.startsWith('right:')) ? rules.find(r => r.startsWith('right:')).replace('right:', '').replace(';', '').trim() : '30px'}; }`);
               if(wRule) {
                 console.log(`  .social-fab-toggle { ${wRule} ${rules.find(r => r.startsWith('height:')) || ''} }`);
                 // Also scale icons proportionally, baseline is toggle 60px -> icon 28px (approx 46%). 
                 // If 50px -> 24px.
               }
               let svgMatch = inner.match(/\.resume-btn\s+svg\s*\{([^}]+)\}/);
               if(svgMatch) {
                 console.log(`  .social-fab-toggle svg { ${svgMatch[1].trim()} }`);
               }
               console.log("}\n");
            }
        }
    }
}
