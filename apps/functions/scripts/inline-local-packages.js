#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Firebase Functionsデプロイ用にローカルパッケージのインポートをインライン化
 * distディレクトリ内のrequire文をローカルパッケージのビルド済みコードに置換
 */

const distDir = path.join(__dirname, '..', 'dist');
const packagesDir = path.join(__dirname, '..', '..', '..', 'packages');

// キャッシュを使って同じファイルを何度も読まないようにする
const moduleCache = {};

function getModuleExports(packageName, modulePath = 'index') {
  const cacheKey = `${packageName}/${modulePath}`;
  if (moduleCache[cacheKey]) {
    return moduleCache[cacheKey];
  }

  const packagePath = path.join(packagesDir, packageName.replace('@rippingyard/', ''), 'dist', 'cjs');
  const filePath = path.join(packagePath, modulePath === 'index' ? 'index.js' : `${modulePath}.js`);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: Could not find ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  moduleCache[cacheKey] = content;
  return content;
}

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // @rippingyard/schemas の処理
  const schemasMatches = content.match(/require\(["']@rippingyard\/schemas(?:\/([^"']+))?["']\)/g);
  if (schemasMatches) {
    schemasMatches.forEach(match => {
      const moduleMatch = match.match(/require\(["']@rippingyard\/schemas(?:\/([^"']+))?["']\)/);
      const modulePath = moduleMatch[1] || 'index';
      
      // 相対パスを計算（dist内にコピーしたpackagesを参照）
      const relativePath = path.relative(
        path.dirname(filePath),
        path.join(distDir, 'packages', 'schemas', 'dist', 'cjs', modulePath === 'index' ? 'index.js' : `${modulePath}.js`)
      ).replace(/\\/g, '/');
      
      content = content.replace(match, `require('./${relativePath}')`);
      modified = true;
    });
  }
  
  // @rippingyard/utils の処理
  const utilsMatches = content.match(/require\(["']@rippingyard\/utils(?:\/([^"']+))?["']\)/g);
  if (utilsMatches) {
    utilsMatches.forEach(match => {
      const moduleMatch = match.match(/require\(["']@rippingyard\/utils(?:\/([^"']+))?["']\)/);
      const modulePath = moduleMatch[1] || 'index';
      
      // 相対パスを計算（dist内にコピーしたpackagesを参照）
      const relativePath = path.relative(
        path.dirname(filePath),
        path.join(distDir, 'packages', 'utils', 'dist', 'cjs', modulePath === 'index' ? 'index.js' : `${modulePath}.js`)
      ).replace(/\\/g, '/');
      
      content = content.replace(match, `require('./${relativePath}')`);
      modified = true;
    });
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed imports in: ${path.relative(process.cwd(), filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.js')) {
      processFile(filePath);
    }
  });
}

// パッケージのビルド済みファイルもfunctionsのdistにコピー
function copyPackages() {
  console.log('\nCopying package dist files...');
  
  // schemasパッケージをコピー
  const schemasSource = path.join(packagesDir, 'schemas', 'dist');
  const schemasTarget = path.join(distDir, 'packages', 'schemas', 'dist');
  
  if (fs.existsSync(schemasSource)) {
    fs.mkdirSync(path.dirname(schemasTarget), { recursive: true });
    fs.cpSync(schemasSource, schemasTarget, { recursive: true });
    console.log('✓ Copied schemas package');
  }
  
  // utilsパッケージをコピー
  const utilsSource = path.join(packagesDir, 'utils', 'dist');
  const utilsTarget = path.join(distDir, 'packages', 'utils', 'dist');
  
  if (fs.existsSync(utilsSource)) {
    fs.mkdirSync(path.dirname(utilsTarget), { recursive: true });
    fs.cpSync(utilsSource, utilsTarget, { recursive: true });
    console.log('✓ Copied utils package');
  }
}

console.log('Inlining local package imports in dist directory...\n');

// まずパッケージをコピー
copyPackages();

// その後インポートを修正
console.log('\nFixing import paths...');
walkDir(distDir);

console.log('\n✅ Done!');