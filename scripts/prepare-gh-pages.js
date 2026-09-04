const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, '..', 'dist', 'venugopal-app', 'browser');
const indexPath = path.join(browserDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('index.html not found in', browserDir);
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf8');

// 1. Create 404.html
fs.writeFileSync(path.join(browserDir, '404.html'), indexContent);
console.log('Created 404.html');

// 2. Create .nojekyll
fs.writeFileSync(path.join(browserDir, '.nojekyll'), '');
console.log('Created .nojekyll');

// 3. Create static directories for each SPA route
const routes = ['about-me', 'services', 'my-books', 'photography', 'contact', 'admin'];

for (const route of routes) {
  const routeDir = path.join(browserDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent);
  console.log(`Created route directory: /${route}/index.html`);
}

console.log('GitHub Pages preparation completed successfully!');
