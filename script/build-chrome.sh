echo 'building extension for Chrome...'

# Merge base and chrome jsons
if [ -n "$version" ]; then
    echo "Change manifest version to ${version}"
    jq ".version = \"$version\"" ./public/base.manifest.json > base.manifest.temp.json
    echo 'Generate Chrome manifest'
    jq -s '.[0] * .[1]' base.manifest.temp.json ./public/chrome.manifest.json > ./public/manifest.json
    rm -f base.manifest.temp.json
else
    echo 'Generate Chrome manifest'
    jq -s '.[0] * .[1]' ./public/base.manifest.json ./public/chrome.manifest.json > ./public/manifest.json
fi

# Remove previous artifacts
echo 'Remove previous zipped extension'
rm -f chrome_extension.zip

# Install dependencies
echo 'Install dependencies'
yarn build:ext

# Zip the distribution folder
echo 'Zip the extension'
cd dist/ && zip -r ../chrome_extension.zip * -x "*.DS_Store" "web_manifest.json" "screenshots/*" "images/*" "favicon.ico" "robots.txt" "base.manifest.json" "chrome.manifest.json" "firefox.manifest.json" && cd ..