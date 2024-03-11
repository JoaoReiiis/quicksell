
function loadCharts(userData, allData, products) {
    Chart.defaults.font.family = 'Noto sans, sans-serif';
    Chart.defaults.font.size = 14;
    Chart.defaults.font.weight = '600';

    const ppv = document.getElementById('myChart').getContext('2d');
    const ppq = document.getElementById('myChart2').getContext('2d');

    var totalEmVenda = 0;

    for (let sale of userData) {
        totalEmVenda += sale.price;
    }

    document.getElementById("totalEmVendas").textContent += totalEmVenda;

    const userMVP = {};
    const userBestSeller = {};
    const allMVP = {};
    const allBestSeller = {};

    for (let product of products) {
        userMVP[product] = 0
        userBestSeller[product] = 0
        allMVP[product] = 0
        allBestSeller[product] = 0
    }

    for (let sale of userData) {
        userMVP[sale.product.name] += sale.price
        userBestSeller[sale.product.name] += sale.quantity
    }

    for(let sale of allData){
        allMVP[sale.product.name] += sale.price
        allBestSeller[sale.product.name] += sale.quantity
    }

    new Chart(ppv, {
        type: 'bar',
        data: {
            labels: Object.values(products),
            datasets: [{
                label: 'Seu produto mais rentavel',
                data: Object.values(userMVP),
                backgroundColor:'#0A2F59',
            },
            {
                label: 'Produto mais rentavel',
                data: Object.values(allMVP),
                backgroundColor: '#D72638',
            },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100
                    }
                }
            }
        }
    });

    new Chart(ppq, {
        type: 'line',
        data: {
            labels: Object.values(products),
            datasets: [{
                label: 'Seu produto mais vendido',
                data: Object.values(userBestSeller),
                fill: true,
                borderColor: '#D72638',
                borderWidth: 2,
                pointRadius: 6,
                pointBackgroundColor: '#0A2F59',
                pointBorderColor: '#fff',
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#0A2F59',
                pointHoverBorderColor: '#0A2F59',
                lineTension: 0.2
            },
            {
                label: 'Produto mais vendido',
                data: Object.values(allBestSeller),
                fill: true,
                borderColor: '#0A2F59',
                borderWidth: 2,
                pointRadius: 6,
                pointBackgroundColor: '#D72638',
                pointBorderColor: '#fff',
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#D72638',
                pointHoverBorderColor: '#D72638',
                lineTension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100
                    }
                }
            },
            plugins: {
                elements: {
                    line: {
                        borderJoinStyle: 'round'
                    }
                }
            }
        }
    });


}

async function getVendas() {
    let key = "Authorization";

    const userResponse = await fetch("http://3.92.139.182:8080/sale/user", {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    const allResponse = await fetch("http://3.92.139.182:8080/sale", {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });

    const productResponse = await fetch("http://3.92.139.182:8080/product", {
        method: "GET",
        headers: new Headers({
            Authorization: localStorage.getItem(key),
        }),
    });


    var userData = await userResponse.json();
    var allData = await allResponse.json();
    var productsResponse = await productResponse.json();
    var products = [];

    for (let product of productsResponse) {
        products.push(product.name)
    }

    loadCharts(userData, allData, products);
}

getVendas();



