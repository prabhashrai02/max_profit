function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
        func(args);
        }, delay);
    };
}
  
const inputChanged = debounce(() => {
    calculate();
}, 1000)

function calculate() {
    let days = document.getElementById("days").value;
    console.log(days);

    let total_profit = 0, total_theater = 0, total_pub = 0, total_complex = 0;
    let total_count = [];
    
    rec(days);
    console.log(total_count);

    function rec (days, theater=0, pub=0, complex=0, profit=0) {

        let end_profit = 0;

        if (days <= 4) {
            end_profit = profit; 
            if (days > 0) end_profit += ((theater*days*15) + (pub*days*10) + (complex*days*30));

            if (total_profit < end_profit) {
                total_profit = end_profit;
                total_count.splice(0, total_count.length);
            }

            if (total_profit == end_profit && total_profit > 0) total_count.push([theater, pub, complex]);

            return;
        }

        let temp_profit = theater*15 + pub*10 + complex*30;
    
        if (days > 4) rec(days-4, theater, pub+1, complex, profit + temp_profit*4);
        if (days > 5) rec(days-5, theater+1, pub, complex, profit + temp_profit*5);

        /* after carefull observation I found that we will never construct "Commercial Park"
           because we are getting 3k in revenue for 1 park and the revenue will start after
           10 units of time, on the other-hand if we construct 2 theatre instead then also
           we will get 3k after 10 unit of time but here we will have 1 theatre after 5 unit
           of time and it will start giving revenue, so at any time the revenue given by 2
           theatre will be greater then 1 Park, and here in this question it is given that 
           he has infinite land (so we don't have to consider the land required and only focus
           on increasing the profit).
        */

    }

    let printProfit = document.getElementById("profit");
    printProfit.textContent = total_profit*100;

    if (total_count.length) {
        total_theater = total_count[0][0];
        total_pub = total_count[0][1];
        total_complex = total_count[0][2];

        total_count.shift();
    }

    console.log(total_count)

    let theaterElement = document.getElementById("theater");
    theaterElement.textContent = total_theater;

    let pubElement = document.getElementById("pub");
    pubElement.textContent = total_pub;

    let complexElement = document.getElementById("complex");
    complexElement.textContent = total_complex;
}
