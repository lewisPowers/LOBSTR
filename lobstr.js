let trustedAssets = document.getElementsByClassName('trusted-asset-list');

let allAssetsCount = trustedAssets[0].children.length;

function filledAssetsCount() {
  return Array.from(trustedAssets[0].children).filter((asset) => {
    if (!asset.children[1].textContent.includes(' 0 ')) return asset;
  }).length;
}

function unfilledAssetsCount() {
  return Array.from(trustedAssets[0].children).filter((asset) => {
    if (asset.children[1].textContent.includes(' 0 ')) return asset;
  }).length;
}

console.log(
  `Total Assets: ${allAssetsCount}`,
  `\nTotal Filled Assets: ${filledAssetsCount()}`,
  `\nTotal Uncharted Assets: ${unfilledAssetsCount()}`
)