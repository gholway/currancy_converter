const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');

const API_KEY = '17bc772c0e7a98732d0def36'; 

async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // API URL for the specific base currency
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rates[to];
            const convertedAmount = (amount * rate).toFixed(2);
            resultText.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
        } else {
            resultText.innerText = "Error fetching rates.";
        }
    } catch (error) {
        console.error("Fetch error:", error);
        resultText.innerText = "Connection failed.";
    }
}

convertBtn.addEventListener('click', convertCurrency);