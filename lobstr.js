let trustedAssets = document.getElementsByClassName('trusted-asset-list');

function allAssetsCount() {
  return trustedAssets[0].children.length;
}

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

let names = {
  allAssetsCount: `Total Assets: ${allAssetsCount()}`,
  filledAssetsCount: `Total Filled Assets: ${filledAssetsCount()}`,
  unfilledAssetsCount: `Total Uncharted Assets: ${unfilledAssetsCount()}`
}

let namesArray = [
  'allAssetsCount',
  'filledAssetsCount',
  'unfilledAssetsCount'
]

function createEl(content) {
  console.log(content.name)
  let el = document.createElement('span');
  el.style.display = 'block';
  el.textContent = names[content];
  document.getElementsByClassName('title-extra')[1].append(el)
}

namesArray.forEach((fnName) => {
  createEl(fnName);
})


console.log(
  `Total Assets: ${allAssetsCount()}`,
  `\nTotal Filled Assets: ${filledAssetsCount()}`,
  `\nTotal Uncharted Assets: ${unfilledAssetsCount()}`
)