#!/bin/bash

stores_build() {
    echo 'building app for Chrome & Firefox Stores'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    mkdir -p dist
    cp -r build/* dist
    cd dist 
    echo 'zipping the dist'
    zip -r extension.zip * -x "*.DS_Store"
    cd ..
    rm source_code.zip
    echo 'zipping the source code for Firefox'
    zip -r source_code.zip 'public/' 'src' 'LICENCE' 'package.json' 'yarn.lock' 'README.md'
}

stores_build