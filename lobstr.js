let trustedAssetsList = document.getElementsByClassName('trusted-asset-list');
let allAssets =  trustedAssetsList[0].children;
let assetsArray = Array.from(allAssets);

let formattedNamesAndCodes = formatArrays(getAssetNamesCodesDomainsArrays());
let formattedAmounts = formatArrays(getTokenAmountAndCurrencyArrays());
let issuers = getAssetIssuersArray()

function allAssetsCount() {
  return trustedAssetsList[0].children.length;
}

function filledAssetsCount() {
  return Array.from(trustedAssetsList[0].children).filter((asset) => {
    if (!asset.children[1].textContent.includes(' 0 ')) return asset;
  }).length;
}

function unfilledAssetsCount() {
  return Array.from(trustedAssetsList[0].children).filter((asset) => {
    if (asset.children[1].textContent.includes(' 0 ')) return asset;
  }).length;
}

function mergeAllAssetsInfoIntoCSVString() {
  let len = allAssetsCount();
  let array = [];
  array[0] = `name,code,asset_amount,currency_amount,domain,asset_issuer`;
  for (let i = 0; i < len; i++) {
    array.push(mergeInfoIntoCSVFormat(i))
  }
  // let result = array.join(` CRLF `);
  let result = array.join(`\n`);
  console.log(result);
  // return result;
}

function mergeInfoIntoCSVFormat(index) {
  let name = getNamesArray()[index];
  let code = getCodesArray()[index];
  let tokens = getAmountsInToken()[index];
  let currencyAmount = getAmountsInCurrency()[index];
  let domain = getDomainsArray()[index];
  let issuer = issuers[index];
  return `${name},${code},${tokens},${currencyAmount},${domain},${issuer}`;
}


function getAssetNamesCodesDomainsArrays() {
  return assetsArray.map(asset => {
    return asset.children[0].children[0].children[1].textContent
    .trim()
    .split(' ')
    .filter(str => {
      if (str !== '' && str !== '\n') return str;
    });
  })
}

function getTokenAmountAndCurrencyArrays() {
  return assetsArray.map(asset => {
    return asset.children[1].textContent
    .trim()
    .split(' ')
    .filter(str => {
      if (str !== '' && str !== '\n') return str;
    });
  })
}

function getAssetIssuersArray() {
  return assetsArray.map(asset => {
    return asset.dataset.assetIssuer;
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
  return formattedNamesAndCodes.map(array => {
    return array[1];
  })
}

function getDomainsArray() {
  return formattedNamesAndCodes.map(array => {
    return array[2] === null ? 'No Domain' : array[2];
  })
}

// takes formatted array from formattedAmounts array
function getAmountsInToken() {
  return formattedAmounts.map(array => {
    return array[0];
  })
}

function getAmountsInCurrency() {
  return formattedAmounts.map(array => {
    return array[2];
  })
}

function displayTotals() {
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
    let el = document.createElement('span');
    el.style.display = 'block';
    el.textContent = names[content];
    document.getElementsByClassName('title-extra')[1].append(el)
  }

  namesArray.forEach((fnName) => {
    createEl(fnName);
  })
}

console.log(
  `Total Assets: ${allAssetsCount()}`,
  `\nTotal Filled Assets: ${filledAssetsCount()}`,
  `\nTotal Uncharted Assets: ${unfilledAssetsCount()}`
)

displayTotals();
mergeAllAssetsInfoIntoCSVString();
// delayCSVDelivery();

function delayCSVDelivery() {
  setTimeout(() => {
    mergeAllAssetsInfoIntoCSVString();
  }, 5000)
}