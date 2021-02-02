// using fetch to collect data from database or third party called API
// make function calculate and inside 2 function, fetch to get our json file
// .then means what to do next? res.json means data comes in json format
// # traditional way of wrting function
// function calculate() {
//     fetch('items.json').then(function(res) {
//         res.json().then(function(data) {
//             console.log(data);
//         })
//     })
// }
//  demo of using fetch
// function calculate() {
//     fetch('items.json')
//         .then(res => res.json()
//             .then(data => console.log(data)));

// }
// calculate();

const bitCurr = document.getElementById('bit-currency');
const bitAmount = document.getElementById('bit-amount');
const bitInput = document.getElementById('bit-input');
const bitset = document.getElementById('set');
const bitRate = document.getElementById('bit-rate');
const currOnePick = document.getElementById('currency-one');
const currTwoPick = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipButton = document.getElementById('flip');
const set = document.getElementById('reset');
const rate = document.getElementById('rate');

// fetch exchange currency rate from 3rd party API and update DOM

function calculate() {
    const currencyOneCode = currOnePick.value;
    const currencyTwoCode = currTwoPick.value;
    // console.log(currencyOneCode, currencyTwoCode);
    fetch(`https://v6.exchangerate-api.com/v6/c35cdffeed210f6aee44b2e8/latest/${currencyOneCode}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);

            //  Get the exchange rate from API data
            const exchangeRate = data.conversion_rates[currencyTwoCode];
            // console.log(exchangeRate);

            // display conversion rate
            rate.innerText = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`;

            // Apply conversion rate and update amount of currency two
            currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);


        });
}

//  flip function for the Flip button to reverse currency exchange

function flip() {
    // temporary constant to save currency 1 value
    const temp = currOnePick.value;
    currOnePick.value = currTwoPick.value;
    // updating curr two value
    currTwoPick.value = temp;

    //  updating numbers
    calculate();
};

//  function to reset exchange currency
function reset() {
    currOnePick.value = 'USD';
    currOneAmount.value = '1';
    currTwoPick.value = 'USD';

    calculate();
}

// funtion to reset bitcoin currency
function bitReset() {
    bitCurr.value = 'USD';
    bitInput.value = '1';
    // bitAmount.value = '0';

    bitcoinCalculate();
}

// 4 - Function to fetch Bitcoin rate from https://api.coindesk.com/v1/bpi/currentprice.json and Exchange Currency by https://api.exchangerate.host/latest and UPDATE DOM
function bitcoinCalculate() {
    // 1 - Read Codes From DOM Element (Select)
    // const targetFlagCode = targetBitcoinCountry.value.split('-')[0];
    const targetBitcoinCurrencyCode = bitCurr.value;
    // 2 - Update Flags
    // targetBitcoinFlag.src = `https://www.countryflags.io/${targetFlagCode}/shiny/64.png`
    // 3 - Fetch Data from www.exchangerate-api.com according to DOM Codes
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json()
            .then(data => {
                const oneBitcoinRateInEuro = data.bpi.EUR.rate_float;
                fetch('https://api.exchangerate.host/latest')
                    .then(res => res.json()
                        .then(data => {


                            const oneBitcoinInRequiredCurrency = oneBitcoinRateInEuro * data.rates[targetBitcoinCurrencyCode];
                            console.log(oneBitcoinInRequiredCurrency);
                            // display conversion rate
                            bitRate.innerText = `1 ${targetBitcoinCurrencyCode} = ${oneBitcoinInRequiredCurrency}`;


                            // Apply conversion rate and update amount of bit Amount
                            bitAmount.value = (bitInput.value * oneBitcoinInRequiredCurrency).toFixed(2);


                        }));
            }));
}



// event listeners
currOnePick.addEventListener('change', calculate);
currTwoPick.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipButton.addEventListener('click', flip);
set.addEventListener('click', reset);
bitCurr.addEventListener('change', bitcoinCalculate);
bitInput.addEventListener('input', bitcoinCalculate);
bitAmount.addEventListener('input', bitcoinCalculate);
bitset.addEventListener('click', bitReset);