#!/bin/bash

build() {
    echo 'building hackertab...'

    rm -rf dist/*

    vite build
}

build

