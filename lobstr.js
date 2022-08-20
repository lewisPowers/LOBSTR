let util = {
  getAssetData: () => {
    return assetsArray.map( asset => {
      return asset.children[0].children[0].children[1].textContent
      .trim()
      .split(' ')
      .filter(str => {
        if (str !== '' && str !== '\n') return str;
      });
    })
  },
  formatArrays: (namesCodesDomainsArray) => {
    return namesCodesDomainsArray.map( assetArray => {
      if (!assetArray[assetArray.length - 1].includes('.')) assetArray.push('No Domain');
      while (assetArray.length > 3 && !assetArray[1].includes('(')) {
        assetArray[0] = `${assetArray[0]} ${assetArray.splice(1, 1)}`;
      }
      let sliced =  assetArray[1].slice(1, -1);
      assetArray[1] = sliced;
      return assetArray;
    })
  }
};

let trustedAssetsList = document.querySelector('.trusted-asset-list');
let assetsArray = Array.from(trustedAssetsList.children);
let formattedNamesAndCodesArray = util.formatArrays(util.getAssetData());
let namesArray = formattedNamesAndCodesArray.map( array => array[0] );
let codesArray = assetsArray.map(asset => asset.dataset.assetCode );
let tokensArray = assetsArray.map(asset => asset.dataset.raw_amount );
let domainsArray = formattedNamesAndCodesArray.map( array => array[2] );
let issuersArray = assetsArray.map( asset => asset.dataset.assetIssuer || ' ' );
let currencyAmountsArray = Array.from(trustedAssetsList.getElementsByClassName('alternative_currency'))
.map( amount =>  amount.textContent );
let symbol;
let totalBalance = currencyAmountsArray.reduce( (total, nextVal) => {
  symbol = nextVal.slice(0, 1);
  nextVal = Number(nextVal.slice(1));
  return total + nextVal;
}, 0 ).toFixed(2);

function csv() {
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
    let issuer = issuersArray[index] || ' ';
    return `${name},${code},${tokenCount},${currencyAmount},${domain},${issuer}`;
  }
  mergeAllAssetsInfoIntoCSVString();
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
    filledAssetsCount: `Filled Assets: ${filledAssetsCount}`,
    unfilledAssetsCount: `Uncharted Assets: ${unfilledAssetsCount}`,
    totalBalance: `Balance: ${symbol}${totalBalance}`
  }

  let namesArray = Object.keys(names);
  let titleEl = document.getElementsByClassName('title-extra')[1];
  let assetInfoDiv = document.createElement('div');
  assetInfoDiv.style.display = 'flex';
  assetInfoDiv.style.justifyContent = 'space-around';
  assetInfoDiv.style.marginTop = '8px';
  titleEl.append(assetInfoDiv);
  namesArray.forEach((fnName) => {
    if (fnName === 'totalBalance') {
      let el = createEl(fnName);
      el.style.fontSize = '1.8em';
      titleEl.append(el);
    } else {
      assetInfoDiv.append(createEl(fnName));
    }
  })

  function createEl(content) {
    let el = document.createElement('span');
    el.style.display = 'block';
    el.style.lineHeight = '2em';
    el.style.fontSize = '1.5em';
    el.textContent = names[content];
    return el;
  }
}

function filterSystem() {
  document.getElementsByClassName('title-extra')[1].style.marginBottom = '0';
  let div = document.createElement('div');
  div.classList.add('main-text');
  div.style.marginTop = '20px';
  div.innerText = 'Filter Your Assets List';
  let filterInput = document.createElement('input');
  let assetCountElement = document.createElement('span');
  let count = assetsArray.length;
  assetCountElement.innerText = `Listed Assets: ${count}`;
  filterInput.type = 'text';
  filterInput.style.width = '100%';
  filterInput.style.margin = '11px 0';
  filterInput.setAttribute('placeholder', 'Filter by asset name, code, domain or issuer address');
  filterInput.addEventListener('input', e => {
    count = 0;
    let text = e.target.value.trim().toLowerCase();
    e.preventDefault();
    assetsArray.filter( (asset, i) => {
      if (textIsIncluded(text, i)) {
        asset.style.display = 'flex';
        count++;
      } else {
        asset.style.display = 'none';
      }
    })
    assetCountElement.innerText = `Listed Assets: ${count}`;
  });
  document.querySelector('.form-group').style.display = 'none';
  div.append(filterInput, assetCountElement)
  document.getElementsByClassName('title-extra')[1].append(div);
  function textIsIncluded(inputText, idx) {
    return namesArray[idx].toLowerCase().includes(inputText) ||
    codesArray[idx].toLowerCase().includes(inputText) ||
    domainsArray[idx].toLowerCase().includes(inputText) ||
    issuersArray[idx].toLowerCase().includes(inputText);
  }
}
displayTotals();
filterSystem();
csv();