#!/bin/bash

chrome_build() {
    echo 'building app for Chrome'

    rm -rf dist/*
    rm -f chrome_extension.zip

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false
    
    yarn build

    mkdir -p dist
    cp -r build/* dist
    echo 'zipping the dist'
    cd dist/ && zip -r ../chrome_extension.zip * -x "*.DS_Store" && cd ..
}

firefox_build() {
    echo 'building app for Firefox'

    rm -rf dist/*
    rm -f source_code.zip
    rm -f firefox_extension.zip

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    yarn global add @craco/craco
    craco build

    mkdir -p dist
    cp -r build/* dist
    echo 'zipping the dist'
    cd dist/ && zip -r ../firefox_extension.zip * -x "*.DS_Store" && cd ..

    echo 'zipping the source code for Firefox'
    zip -r source_code.zip 'public/' 'script/' 'src' 'LICENSE' 'package.json' 'yarn.lock' 'README.md' 'craco.config.js' '.env' -x "*.DS_Store"
}
chrome_build
firefox_build