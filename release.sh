#!/bin/sh

# Only using the read command to wait for user to press enter
# shellcheck disable=SC2162

set -e

TODAY=$(date --iso-8601)
UNIX_TIME=$(date +%s)
LAST_TAG=$(git describe --tags --abbrev=0 @^)

echo "Last tag was $LAST_TAG, bump ./package.json version & run 'yarn update && cargo update --manifest-path src-tauri/Cargo.toml'"
read
# Get current version
VERSION=$(jq ".version" -r package.json)
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

CHANGES_MARKDOWN=$(echo "$CHANGES" | sed "s/\(.*\)/- \\1/g")
CHANGES_MARKDOWN="$CHANGES_MARKDOWN

[Full changelog](https://github.com/onlivfe/desktop/compare/$LAST_TAG...v$VERSION)"

git push --tags && git push

# TODO: Build releases

# Create a github release draft
gh release create --draft --target main \
  --title "v$VERSION" --notes "$CHANGES_MARKDOWN" "v$VERSION" #\
#  src-tauri/target/release/onlivfe \
#	src-tauri/target/release/onlivfe.sha256\
#  src-tauri/target/x86_64-pc-windows-gnu/release/win-onlivfe.exe \
#  src-tauri/target/x86_64-pc-windows-gnu/release/win-onlivfe.exe.sha256

echo "Remember to publish github release & update flathub"
