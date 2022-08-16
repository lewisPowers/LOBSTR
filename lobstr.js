let trustedAssetsList = document.getElementsByClassName('trusted-asset-list')[0];
let assetsArray = Array.from(trustedAssetsList.children);
let currencyAmountsArray = Array.from(trustedAssetsList.getElementsByClassName('alternative_currency')).map(amount => {
  return amount.textContent;
})

let formattedNamesAndCodes = formatArrays(getAssetData('namesCodesDomains'));
let formattedAmounts = formatArrays(getAssetData());
let issuers = getAssetIssuersArray();

function mergeAllAssetsInfoIntoCSVString() {
  let len = allAssetsCount();
  let array = [];
  array[0] = `name,code,asset_amount,currency_amount,domain,asset_issuer`;
  for (let i = 0; i < len; i++) {
    array.push(mergeInfoIntoCSVFormat(i))
  }
  let result = array.join(`\n`);
  console.log(result);
}

function mergeInfoIntoCSVFormat(index) {
  let name = getNamesArray()[index];
  let code = getCodesArray()[index];
  let tokens = getAmountsInToken()[index];
  let currencyAmount = currencyAmountsArray[index];
  let domain = getDomainsArray()[index];
  let issuer = issuers[index] || null;
  return `${name},${code},${tokens},${currencyAmount},${domain},${issuer}`;
}

function allAssetsCount() {
  return assetsArray.length;
}

function filledAssetsCount() {
  return assetsArray.filter((asset) => {
    if (!asset.children[1].textContent.includes(' 0 ')) return asset;
  }).length;
}

function unfilledAssetsCount() {
  return assetsArray.filter((asset) => {
    if (asset.children[1].textContent.includes(' 0 ')) return asset;
  }).length;
}

function getAssetData(context) {
  return assetsArray.map(asset => {
    asset = context === 'namesCodesDomains' ? asset.children[0].children[0].children[1] : asset.children[1];
    return asset.textContent
    .trim()
    .split(' ')
    .filter(str => {
      if (str !== '' && str !== '\n') return str;
    });
  })
}

function formatArrays(namesCodesDomainsArray) {
  return namesCodesDomainsArray.map(assetArray => {
    if (!assetArray[assetArray.length - 1].includes('.')) assetArray.push(null);
    while (assetArray.length > 3 && !assetArray[1].includes('(')) {
      assetArray[0] = `${assetArray[0]} ${assetArray.splice(1, 1)}`;
    }
    let sliced =  assetArray[1].slice(1, -1);
    assetArray[1] = sliced;
    return assetArray;
  })
}

function getNamesArray() {
  return formattedNamesAndCodes.map(array => {
    return array[0];
  })
}

function getCodesArray() {
  return assetsArray.map(asset => {
    return asset.dataset.assetCode;
  })
}

function getDomainsArray() {
  return formattedNamesAndCodes.map(array => {
    return array[2] === null ? 'No Domain' : array[2];
  })
}

function getAmountsInToken() {
  return assetsArray.map(asset => {
    return asset.dataset.raw_amount;
  })
}

function getAmountsInCurrency() {
  return formattedAmounts.map( (array, i) => {
    return array[2];
  })
}

function getAssetIssuersArray() {
  return assetsArray.map(asset => {
    return asset.dataset.assetIssuer;
  })
}

function displayTotals() {
  let names = {
    allAssetsCount: `Total Assets: ${allAssetsCount()}`,
    filledAssetsCount: `Total Filled Assets: ${filledAssetsCount()}`,
    unfilledAssetsCount: `Total Uncharted Assets: ${unfilledAssetsCount()}`
  }

  let namesArray = Object.keys(names);
  namesArray.forEach((fnName) => {
    createEl(fnName);
  })

  function createEl(content) {
    let el = document.createElement('span');
    el.style.display = 'block';
    el.textContent = names[content];
    document.getElementsByClassName('title-extra')[1].append(el)
  }
}

console.log(
  `Total Assets: ${allAssetsCount()}`,
  `\nTotal Filled Assets: ${filledAssetsCount()}`,
  `\nTotal Uncharted Assets: ${unfilledAssetsCount()}`
)

displayTotals();
mergeAllAssetsInfoIntoCSVString();
