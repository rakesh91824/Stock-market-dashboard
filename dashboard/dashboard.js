async function fetchStockData(symbol) {
    const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`);
    const data = await response.json();
    const timeSeries = data['Monthly Time Series'];
    
    const labels = [];
    const prices = [];
    
    for (let date in timeSeries) {
        labels.push(date);
        prices.push(timeSeries[date]['4. close']);
    }
    
    return { labels: labels.reverse(), prices: prices.reverse() };
}

async function createStockChart() {
    const stockData = await fetchStockData('AAPL');
    
    const data = {
        labels: stockData.labels,
        datasets: [{
            label: 'Stock Price',
            data: stockData.prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1
        }]
    };

    const ctx = document.getElementById('stockChart').getContext('2d');
    const stockChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

createStockChart();
