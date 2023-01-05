#!/bin/sh

# Only using the read command to wait for user to press enter
# shellcheck disable=SC2162

set -e

TODAY=$(date --iso-8601)
UNIX_TIME=$(date +%s)
LAST_TAG=$(git describe --tags --abbrev=0 @^)

echo "Last tag was $LAST_TAG, bump ./Cargo.toml version & run 'cargo update'"
read
# Get current version
VERSION=$(sed -n -r 's/version = "(.*)"/\1/p' Cargo.toml | head -n 1)
CHANGES=$(git log --pretty=format:%s "$LAST_TAG..HEAD")
echo "Modify & add to ./com.onlivfe.metainfo.xml changelog"
echo ""
echo "<release version=\"$VERSION\" date=\"$TODAY\" timestamp=\"$UNIX_TIME\">"
echo "	<url>https://github.com/onlivfe/desktop/releases/tag/v$VERSION</url>"
echo "	<description>"
echo "		<ul>"
echo "$CHANGES" | sed "s/\(.*\)/			<li>\\1<\/li>/g"
echo "		</ul>"
echo "	</description>"
echo "</release>"
echo ""
echo "Then run 'git add . && git commit -m \"Release v$VERSION\"', after which I'll create the tag for you"
read
git tag "v$VERSION"

# Build for linux
cargo +stable build --release
# Create sha256 integrity hash
cd target/release && sha256sum onlivfe > onlivfe.sha256 && cd ../..

# Build for windows
cargo +stable build --release --target x86_64-pc-windows-gnu

# Windows AV pseudo-requires code to be signed. 
# So doing that with a self-signed cert.
# Also provide a sha256 hash.
rm "target/x86_64-pc-windows-gnu/release/win-onlivfe.exe" \
	& echo "Signing windows executable" \
	&& osslsigncode sign -h sha256 \
	-in "target/x86_64-pc-windows-gnu/release/onlivfe.exe" \
	-out "target/x86_64-pc-windows-gnu/release/win-onlivfe.exe" \
	-pkcs12 "ljoonal.pfx" -askpass \
	&& cd target/x86_64-pc-windows-gnu/release \
	&& sha256sum win-onlivfe.exe > win-onlivfe.exe.sha256 \
	&& cd ../../..

CHANGES_MARKDOWN=$(echo "$CHANGES" | sed "s/\(.*\)/- \\1/g")
CHANGES_MARKDOWN="$CHANGES_MARKDOWN

[Full changelog](https://github.com/onlivfe/desktop/compare/$LAST_TAG...v$VERSION)"

git push --tags && git push

# Create a gitea release draft
gh release create --draft --target main \
  --title "v$VERSION" --notes "$CHANGES_MARKDOWN" "v$VERSION" \
  target/release/onlivfe \
	target/release/onlivfe.sha256\
  target/x86_64-pc-windows-gnu/release/win-onlivfe.exe \
  target/x86_64-pc-windows-gnu/release/win-onlivfe.exe.sha256

echo "Remember to publish gitea release & update flathub"
