#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Firebase Functionsのデプロイ時にローカルパッケージが解決できない問題を修正する
 * distディレクトリ内のrequire文を相対パスに書き換える
 */

const distDir = path.join(__dirname, '..', 'dist');

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // @rippingyard/schemas を相対パスに置換
  if (content.includes("require(\"@rippingyard/schemas")  || content.includes("require('@rippingyard/schemas")) {
    const relativePath = path.relative(path.dirname(filePath), path.join(__dirname, '..', '..', '..', 'packages', 'schemas', 'dist', 'cjs'));
    content = content.replace(
      /require\(["']@rippingyard\/schemas["']\)/g,
      `require('${relativePath.replace(/\\/g, '/')}')`
    );
    modified = true;
  }
  
  // @rippingyard/utils を相対パスに置換
  if (content.includes("require(\"@rippingyard/utils") || content.includes("require('@rippingyard/utils")) {
    const relativePath = path.relative(path.dirname(filePath), path.join(__dirname, '..', '..', '..', 'packages', 'utils', 'dist', 'cjs'));
    content = content.replace(
      /require\(["']@rippingyard\/utils["']\)/g,
      `require('${relativePath.replace(/\\/g, '/')}')`
    );
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in: ${filePath}`);
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
      replaceInFile(filePath);
    }
  });
}

console.log('Fixing local package imports in dist directory...');
walkDir(distDir);
console.log('Done!');