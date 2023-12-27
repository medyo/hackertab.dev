echo 'building extension for Firefox...'

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
yarn build:ext

# Zip the distribution folder
echo 'Zip the extension'
cd dist/ && zip -r ../firefox_extension.zip * -x "*.DS_Store" "web_manifest.json" "screenshots/*" "images/*" "favicon.ico" "robots.txt" "base.manifest.json" "chrome.manifest.json" "firefox.manifest.json" && cd ..

#
echo 'Zip the source code'
zip -r source_code.zip 'public/' 'script/' 'src' 'LICENSE' 'package.json' 'yarn.lock' 'README.md' 'vite.config.js' '.env' 'tsconfig.json' -x "*.DS_Store"
