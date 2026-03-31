const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const nextDir = path.join(outDir, '_next');
const assetsDir = path.join(outDir, 'assets');

// 1. Rename _next to assets
if (fs.existsSync(nextDir)) {
  try {
    fs.cpSync(nextDir, assetsDir, { recursive: true, force: true });
    
    // Robust removal with retries
    let removed = false;
    for (let i = 0; i < 5; i++) {
        try {
            fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
            removed = true;
            console.log('Copied and removed _next');
            break;
        } catch (err) {
            console.log(`Failed to remove _next (attempt ${i+1}), waiting 500ms...`);
            require('child_process').execSync('ping 127.0.0.1 -n 1 -w 500 > nul'); // synchronous wait
        }
    }
    
    if (!removed) {
        console.warn("Could not remove _next after retries! Attempting forceful powershell remove...");
        require('child_process').execSync(`powershell.exe -Command "Remove-Item -LiteralPath '${nextDir}' -Recurse -Force"`, { stdio: 'inherit' });
    }
  } catch(e) {
    console.warn("Could not process _next folder completely.", e);
  }
}

// 2. Replace all instances of "/_next/" with "./assets/" in html and js files
function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else {
      if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Match /_next/ and also encoded occurrences if any
        if (content.includes('/_next/') || content.includes('\\/_next\\/')) {
          content = content.replace(/\/_next\//g, './assets/');
          content = content.replace(/\\\/_next\\\//g, '\\/assets\\/');
        }

        // If it's an HTML file, we MUST extract inline scripts to comply with Manifest V3 CSP
        if (fullPath.endsWith('.html')) {
          let inlineScripts = '';
          content = content.replace(/<script>([\s\S]*?)<\/script>/gi, (match, code) => {
            inlineScripts += code + '\n';
            return '';
          });
          
          if (inlineScripts) {
            fs.writeFileSync(path.join(assetsDir, 'inline.js'), inlineScripts, 'utf8');
            content = content.replace('</body>', '<script src="./assets/inline.js"></script></body>');
          }
        }

        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated paths and CSP in ${file}`);
      }
    }
  }
}

if (fs.existsSync(outDir)) {
  replaceInDir(outDir);
}

// 3. Copy public files into out since export doesn't always handle extension specific files perfectly if they're not in Next.js structure
function copyPublicFilesToOut(src, dest) {
    if (!fs.existsSync(src)) return;
    const files = fs.readdirSync(src);
    for (const file of files) {
        const fullPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }
            copyPublicFilesToOut(fullPath, destPath);
        } else {
            fs.copyFileSync(fullPath, destPath);
            console.log(`Copied ${file} to out directory`);
        }
    }
}

copyPublicFilesToOut(path.join(__dirname, 'public'), outDir);

console.log('Extension build post-processing complete.');
