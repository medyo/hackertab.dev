echo 'building extension for Firefox...'

# install jq if not installed
if ! command -v jq &> /dev/null
then
    echo "jq command not found. attempting to download jq binary"
    pth=$(pwd)
    export PATH=$PATH:$pth
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        curl -L https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -o jq
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        curl -L https://github.com/stedolan/jq/releases/download/jq-1.6/jq-osx-amd64 -o jq
    else
        echo "Unsupported OS type. Exiting..."
        exit 1
    fi
    chmod +x jq
fi

# Merge base and Firefox jsons
if [ -n "$version" ]; then
    echo "Change manifest version to ${version}"
    jq ".version = \"$version\"" ./public/base.manifest.json > base.manifest.temp.json
    echo 'Generate Firefox manifest'
    jq -s '.[0] * .[1]' base.manifest.temp.json ./public/firefox.manifest.json > ./public/manifest.json
    rm -f base.manifest.temp.json
else
    echo 'Generate Firefox manifest'
    jq -s '.[0] * .[1]' ./public/base.manifest.json ./public/firefox.manifest.json > ./public/manifest.json
fi

# Remove previous artifacts
echo 'Remove previous zipped extension and sourcecode'
rm -f source_code.zip
rm -f firefox_extension.zip

# Merge base and firefox jsons
echo 'Generate Firefox manifest'
jq -s '.[0] * .[1]' ./public/base.manifest.json ./public/firefox.manifest.json > ./public/manifest.json

# Install dependencies
echo 'Install dependencies'
yarn build

# Copy generated build to distrubution folder
echo 'Copy generated build to distrubution folder'
mkdir -p dist
cp -r build/* dist

# Zip the distribution folder
echo 'Zip the extension'
cd dist/ && zip -r ../firefox_extension.zip * -x "*.DS_Store" && cd ..

#
echo 'Zip the source code'
zip -r source_code.zip 'public/' 'script/' 'src' 'LICENSE' 'package.json' 'yarn.lock' 'README.md' 'craco.config.js' '.env' 'tsconfig.json' -x "*.DS_Store"
