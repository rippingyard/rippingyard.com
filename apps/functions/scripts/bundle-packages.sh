#!/bin/bash

# Firebase Functionsデプロイ用にローカルパッケージをnode_modulesにコピー

echo "Bundling local packages for Firebase deployment..."

# node_modules/@rippingyard ディレクトリを作成
mkdir -p node_modules/@rippingyard/schemas
mkdir -p node_modules/@rippingyard/utils

# schemasパッケージをコピー
echo "Copying @rippingyard/schemas..."
cp -r ../../packages/schemas/package.json node_modules/@rippingyard/schemas/
cp -r ../../packages/schemas/dist node_modules/@rippingyard/schemas/

# utilsパッケージをコピー
echo "Copying @rippingyard/utils..."
cp -r ../../packages/utils/package.json node_modules/@rippingyard/utils/
cp -r ../../packages/utils/dist node_modules/@rippingyard/utils/

# 依存関係もコピー（utilsのdompurify等）
echo "Installing dependencies for utils..."
cd node_modules/@rippingyard/utils
npm install --production --no-save
cd ../../..

echo "Bundle complete!"