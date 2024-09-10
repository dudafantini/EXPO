$(document).ready(function() {
    $('#mobile-bnt').on('click', function() {
        $('#mobile-menu').toggleClass('active');
        $('#mobile-bnt').find('i').toggleClass('fa-x');
    });
});
















async function fetchRates() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,CAD-BRL,GBP-BRL,JPY-BRL');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar taxas de câmbio:', error);
        return null;
    }
}

async function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');
    
    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = 'Digite um valor válido!';
        return;
    }

    const rates = await fetchRates();
    if (!rates) {
        resultElement.textContent = 'Erro ao buscar taxas de câmbio.';
        return;
    }

    let fromRate, toRate;

    // Acessar a taxa de câmbio do par selecionado
    if (fromCurrency === 'BRL') {
        fromRate = 1;
    } else {
        fromRate = rates[`${fromCurrency}BRL`].bid;
    }

    if (toCurrency === 'BRL') {
        toRate = 1;
    } else {
        toRate = rates[`${toCurrency}BRL`].bid;
    }

    const convertedAmount = amount * (toRate / fromRate);
    resultElement.textContent = convertedAmount.toFixed(2);
}
