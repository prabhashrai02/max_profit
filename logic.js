function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
        func(args);
        }, delay);
    };
}
  
const inputChanged = () => {
    loader(true);

    debounce(() => {
        calculate();
    }, 1000)();
}

function loader (show) {
    const skeletonLoaders = document.querySelectorAll(".skeleton");
    for (skeleton of skeletonLoaders) {
        if (show) skeleton.style.display = "block";
        else skeleton.style.display = "none";
    }

    const loadingData = document.querySelectorAll(".data");
    for (data of loadingData) {
        console.log(data)
        if (show) data.style.display = "none";
        else data.style.display = "block";
    }
}

function calculate() {
    let days = document.getElementById("days").value;

    let total_profit = 0, total_theater = 0, total_pub = 0, total_complex = 0;
    let total_count = [];
    
    getProfit(days);

    function getProfit (days) {
        if (days < 5) return;

        let rem = days % 5, cntTheatre = Math.floor(days/5), cntPub = 0, totalDays = days;
        
        if (rem < 2) cntTheatre--;
        if (rem < 2) cntPub++;
        
        // store ans in array
        total_count.push([cntTheatre, cntPub, 0]);

        // calculate profit
        let countBuilding = 1;
        totalDays = days;

        while (countBuilding <= cntTheatre) {
            total_profit += (totalDays - (countBuilding*5))*15;
            countBuilding++;
        }

        totalDays -= cntTheatre*5;
        countBuilding = 1;
        while (countBuilding <= cntPub) {
            total_profit += (totalDays - (countBuilding*4))*10;
            countBuilding++;
        }

        totalDays -= (Math.floor(days/5) - 1)*5;
        cntPub = Math.floor(totalDays/4);
        if (totalDays % 4 == 0) cntPub--;

        // check for second possibility
        let checkProfit = 0;
        cntTheatre = Math.floor(days/5) - 1;
        cntPub = Math.floor(days / 4);
        if (days % 4 === 0) cntPub--;

        countBuilding = 1;
        totalDays = days;

        while (countBuilding <= cntTheatre) {
            checkProfit += (totalDays - (countBuilding*5))*15;
            countBuilding++;
        }

        totalDays -= cntTheatre*5;
        countBuilding = 1;

        while (countBuilding <= cntPub) {
            checkProfit += (totalDays - (countBuilding*4))*10;
            countBuilding++;
        }

        // add second option if profit matches with max profit
        if (checkProfit === total_profit) total_count.push([cntTheatre, cntPub, 0]);


        /* after careful observation I found that we will never construct "Commercial Park"
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
    }

    console.log(total_count)

    const theaterElement = document.getElementById("theater");
    theaterElement.textContent = total_theater;

    const pubElement = document.getElementById("pub");
    pubElement.textContent = total_pub;

    const complexElement = document.getElementById("complex");
    complexElement.textContent = total_complex;


    loader(false);
}
