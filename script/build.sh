#!/bin/bash

build() {
    echo 'Building Hackertab...'
    rm -rf dist
    tsc
    vite build
}

build