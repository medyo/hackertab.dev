#!/bin/bash

stores_build() {
    echo 'building app for Chrome & Firefox Stores'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    rm -f source_code.zip
    rm -f extension.zip
    
    yarn global add @craco/craco
    craco build

    mkdir -p dist
    cp -r build/* dist
    echo 'zipping the dist'
    cd dist/ && zip -r ../extension.zip * -x "*.DS_Store" && cd ..

    echo 'zipping the source code for Firefox'
    zip -r source_code.zip 'public/' 'script/' 'src' 'LICENSE' 'package.json' 'yarn.lock' 'README.md' 'craco.config.js' '.env' -x "*.DS_Store"
}

stores_build