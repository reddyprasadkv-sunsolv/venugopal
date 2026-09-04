const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const browserDir = path.join(__dirname, '..', 'dist', 'venugopal-app', 'browser');
const indexPath = path.join(browserDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('index.html not found in', browserDir);
  process.exit(1);
}

// Helper to recursively find all .js files
function getAllJsFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllJsFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// 1. Obfuscate all JavaScript output bundles
console.log('🔒 Starting military-grade JavaScript code obfuscation...');
const jsFiles = getAllJsFiles(browserDir);

const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.35,
  identifierNamesGenerator: 'hexadecimal',
  numbersToExpressions: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 8,
  stringArray: true,
  stringArrayEncoding: ['rc4'],
  stringArrayThreshold: 0.8,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
};

jsFiles.forEach((filePath) => {
  const relativePath = path.relative(browserDir, filePath);
  console.log(`  ⚡ Obfuscating: ${relativePath}...`);
  try {
    const rawCode = fs.readFileSync(filePath, 'utf8');
    const obfuscatedResult = JavaScriptObfuscator.obfuscate(rawCode, obfuscationOptions);
    fs.writeFileSync(filePath, obfuscatedResult.getObfuscatedCode(), 'utf8');
  } catch (err) {
    console.warn(`  ⚠️ Could not obfuscate ${relativePath}, keeping original:`, err.message);
  }
});
console.log('✅ All JavaScript bundles obfuscated and secured successfully!');

const indexContent = fs.readFileSync(indexPath, 'utf8');

// 2. Create 404.html
fs.writeFileSync(path.join(browserDir, '404.html'), indexContent);
console.log('Created 404.html');

// 3. Create .nojekyll
fs.writeFileSync(path.join(browserDir, '.nojekyll'), '');
console.log('Created .nojekyll');

// 4. Create static directories for each SPA route
const routes = ['about-me', 'services', 'my-books', 'photography', 'contact', 'admin'];

for (const route of routes) {
  const routeDir = path.join(browserDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent);
  console.log(`Created route directory: /${route}/index.html`);
}

console.log('🚀 GitHub Pages build & security preparation completed successfully!');

