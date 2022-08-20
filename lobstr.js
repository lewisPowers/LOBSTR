/* FILTER FEATURE REQUIREMENTS
*
*  IT SHOULD READ THE INPUT EACH TIME THE UNPUT VALUE CHANGES
*
*  IT SHOULD USE THE CURRENT INPUT AND CHECK IF ANY ASSETS INCLUDE THE STRING INPUT
*
*  RETURN/SHOW ALL ASSETS THAT INCLUDE STRING
*
*  AKA: HIDE ALL ASSET ELEMENTS THAT DO NOT INCLUDE STRING IN NAME
*
*  SEARCH PARAMS: SEARCH BY NAME, TOKEN SYMBOL, DOMAIN, ISSUER ADDRESS
*    EXAMPLE INPUTS: 'XLM', 'LUMENS', 'ULTRASTELLAR.COM', AUGH5SHAV...5TDAA4SG
*
* HOW TO DO IT?
*  - CHECK INPUT ON EACH ARRAY: NAMES, CODES, DOMAINS, ISSUERS
*  - filterArrays = [ namesArray, codesArray,domainsArray, issuersArray ] ==> filterArrays.forEach(array)
*  - event listener on input: onchange ==> filterArrays.forEach( array, i => {check for and return each asset from trustedAssets if input on change is included in any array})
*    - return trustedAssets list[i]
*    - multiple checks are possible: should we add a prop to ensure its been filtered already?
*/

let trustedAssetsList = document.querySelector('.trusted-asset-list');
let assetsArray = Array.from(trustedAssetsList.children);
let currencyAmountsArray = Array.from(trustedAssetsList.getElementsByClassName('alternative_currency'))
.map( amount =>  amount.textContent );
let formattedNamesAndCodesArray = formatArrays(getAssetData());
let namesArray = formattedNamesAndCodesArray.map( array => array[0] );
let codesArray = assetsArray.map(asset => asset.dataset.assetCode );
let tokensArray = assetsArray.map(asset => asset.dataset.raw_amount );
let domainsArray = formattedNamesAndCodesArray.map( array => {
  return array[2] === null ? 'No Domain' : array[2];
});
let issuersArray = assetsArray.map( asset => asset.dataset.assetIssuer );

let symbol;
let totalBalance = currencyAmountsArray.reduce( (total, nextVal) => {
  symbol = nextVal.slice(0, 1);
  nextVal = Number(nextVal.slice(1));
  return total + nextVal;
}, 0 ).toFixed(2);

function mergeAllAssetsInfoIntoCSVString() {
  let len = assetsArray.length;
  let array = [];
  array[0] = `name,code,asset_amount,currency_amount,domain,asset_issuer`;
  for (let i = 0; i < len; i++) array.push(mergeInfoIntoCSVFormat(i));
  let result = array.join(`\n`);
  console.log(result);
}

function mergeInfoIntoCSVFormat(index) {
  let name = namesArray[index];
  let code = codesArray[index];
  let tokenCount = tokensArray[index];
  let currencyAmount = currencyAmountsArray[index];
  let domain = domainsArray[index];
  let issuer = issuersArray[index] || null;
  return `${name},${code},${tokenCount},${currencyAmount},${domain},${issuer}`;
}

function getAssetData() {
  return assetsArray.map( asset => {
    return asset.children[0].children[0].children[1].textContent
    .trim()
    .split(' ')
    .filter(str => {
      if (str !== '' && str !== '\n') return str;
    });
  })
}

function formatArrays(namesCodesDomainsArray) {
  return namesCodesDomainsArray.map( assetArray => {
    if (!assetArray[assetArray.length - 1].includes('.')) assetArray.push(null);
    while (assetArray.length > 3 && !assetArray[1].includes('(')) {
      assetArray[0] = `${assetArray[0]} ${assetArray.splice(1, 1)}`;
    }
    let sliced =  assetArray[1].slice(1, -1);
    assetArray[1] = sliced;
    return assetArray;
  })
}

function displayTotals() {
  let filledAssetsCount = assetsArray.filter( asset => {
    if (!asset.children[1].textContent.includes(' 0 ')) return asset;
  }).length;

  let unfilledAssetsCount = assetsArray.filter( asset => {
    if (asset.children[1].textContent.includes(' 0 ')) return asset;
  }).length;

  let names = {
    allAssetsCount: `Total Assets: ${assetsArray.length}`,
    filledAssetsCount: `Total Filled Assets: ${filledAssetsCount}`,
    unfilledAssetsCount: `Total Uncharted Assets: ${unfilledAssetsCount}`,
    totalBalance: `Total Balance: ${symbol}${totalBalance}`
  }

  let namesArray = Object.keys(names);
  namesArray.forEach((fnName) => {
    createEl(fnName);
  })

  function createEl(content) {
    let el = document.createElement('span');
    el.style.display = 'block';
    el.style.lineHeight = '2em';
    el.style.fontWeight = 'bold';
    el.textContent = names[content];
    document.getElementsByClassName('title-extra')[1].append(el)
  }
}

displayTotals();
mergeAllAssetsInfoIntoCSVString();
filterSystem();

function filterSystem() {
  let div = document.createElement('div');
  div.classList.add('main-text');
  div.innerText = 'Filter: '
  let filterInput = document.createElement('input');
  filterInput.type = 'text';
  filterInput.placeholder = 'Search by asset name, code, domain or issuer'
  filterInput.addEventListener('input', e => {
    let text = e.target.value.trim().toLowerCase();
    e.preventDefault();
    console.log('Change: ', text);
    assetsArray.filter( (asset, i) => {
      if (namesArray[i].toLowerCase().includes(text) ||
      codesArray[i].toLowerCase().includes(text) ||
      domainsArray[i].toLowerCase().includes(text) ||
      issuersArray[i].toLowerCase().includes(text)
      ) {
        asset.style.display = 'flex';
      } else {
        asset.style.display = 'none';
      }
    })
  });
  div.append(filterInput)
  document.getElementsByClassName('title-extra')[1].append(div);
}
