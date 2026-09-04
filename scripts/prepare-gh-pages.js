const fs = require('fs');
const path = require('path');

const rootDist = path.join(__dirname, '..', 'dist', 'venugopal-app');
const browserSubDist = path.join(rootDist, 'browser');

const targetDirs = [];
if (fs.existsSync(path.join(rootDist, 'index.html'))) {
  targetDirs.push(rootDist);
}
if (fs.existsSync(path.join(browserSubDist, 'index.html'))) {
  targetDirs.push(browserSubDist);
}

if (targetDirs.length === 0) {
  console.error('index.html not found in', rootDist, 'or', browserSubDist);
  process.exit(1);
}

const routes = ['about-me', 'services', 'my-books', 'photography', 'contact', 'admin', 'crm'];

for (const dir of targetDirs) {
  const indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

  // 1. Create 404.html for GitHub Pages SPA routing fallback
  fs.writeFileSync(path.join(dir, '404.html'), indexContent);
  console.log(`Created 404.html in ${dir}`);

  // 2. Create .nojekyll to prevent GitHub Pages from ignoring files
  fs.writeFileSync(path.join(dir, '.nojekyll'), '');
  console.log(`Created .nojekyll in ${dir}`);

  // 3. Create static directories for each SPA route so direct links work seamlessly
  for (const route of routes) {
    const routeDir = path.join(dir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent);
    console.log(`Created route directory: /${route}/index.html in ${dir}`);
  }
}

console.log('🚀 GitHub Pages build preparation completed successfully!');

