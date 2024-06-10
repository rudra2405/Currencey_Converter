const BASE_URL = 'https://2024-03-06.currency-api.pages.dev/v1/currencies';



const dropdowns = document.querySelectorAll('.dropdown select');

let btn = document.querySelector('button');

let fromCurr = document.querySelector('.from select');
let toCurr = document.querySelector('.to select');
let message = document.querySelector('.msg');

const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };

  window.addEventListener('load',()=>{
    updateExchangeRate();
  });

  for(let select of dropdowns){
    for(let currCode in countryList){
        let options = document.createElement('option');

        options.innerText = currCode;
        options.value = currCode;

        if(select.name === 'From' && currCode === 'USD'){
          options.selected = 'selected';
        }
        else if(select.name === 'To' && currCode === 'INR'){
          options.selected = 'selected';
        }
        select.append(options);
      }   
      
      select.addEventListener('change', (evet)=>{
        updateFlag(evet.target);
    })    
}


const updateFlag = (element)=>{
    //  console.log(element);
     let currCode = element.value;
    //  console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

const updateExchangeRate = async()=>{
  let amnt = document.querySelector('.amount input');
  let amntValue = amnt.value;
  if(amntValue === '' || amntValue < 1){
    amnt.value = '1';
  }

  const fromCurrency = fromCurr.value.toLowerCase();
  // const toCurrency = toCurr.value.toLowerCase();

  // console.log(fromCurr.value, toCurr.value)
  const URL = `${BASE_URL}/${fromCurrency}.json` 
  let response = await fetch(URL);

  let data =  await response.json();

  let rate = data[fromCurrency];
  // console.log(rate);

  let convertedAmount = amntValue * rate;

  // console.log(convertedAmount);

  message.innerText = `${amntValue} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;

}


btn.addEventListener('click',(event)=>{
  // console.log(fromCurr.value);
    event.preventDefault();
    updateExchangeRate();
})

