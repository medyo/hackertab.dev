#!/bin/bash

build() {
    echo 'building app for web'

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    craco --max_old_space_size=4096 build
    
    rm -rf dist
    mkdir -p dist
    cp -r build/* dist/
}

build