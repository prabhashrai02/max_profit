// this function is used to get the input enterd by user
let total_profit = 0, total_theater = 0, total_pub = 0, total_complex = 0;
let total_count = [], currentIndex = 0, days;
const inputChanged = debounce(() => {
    days = document.getElementById("days").value;

    loader(false);
    if (days.trim() === '') {
        total_profit = 0;
        total_count.push([0, 0, 0]);
        printCount();
        days = null;
        return;
    }

    days = Number(days);

    if (Number.isNaN(days)) {
        window.alert("Please Enter valid number!!!");
        return;
    }

    calculate(days);

}, 1000);

// this function is used to check the valid input and perfom calculation
function calculate(days) {

    total_count = [];
    total_profit = 0;
    getProfit(days);
    printCount();
}

// this function is used to calculate the max profit and the count of different buildings
function getProfit (days) {

    if (days < 5) {
        total_count.push([0, 0, 0]);
        printCount();
        return;
    }

    let remainder = days % 5, cntTheatre = Math.floor(days/5), cntPub = 0, totalDays = days;
    
    if (remainder < 2) cntTheatre--;
    if (remainder < 2) cntPub++;

    // store first ans in array
    total_count.push([cntTheatre, cntPub, 0]);

    // calculate profit
    total_profit = calculateProfit(days, cntTheatre, cntPub);

    // check for second possibility
    const prevTheatre = cntTheatre, prevPub = cntPub;
    totalDays = days;

    cntTheatre = Math.floor((totalDays/5) - 1);
    totalDays -= cntTheatre*5;
    cntPub = Math.floor(totalDays/4);

    if (totalDays % 4 === 0 && cntPub) cntPub--;
    
    // calculate profit for second possible answer
    const checkProfit = calculateProfit(days, cntTheatre, cntPub);

    // add second option if profit matches with max profit and the count of theatre and pub is different
    if (checkProfit === total_profit && (prevTheatre !== cntTheatre || prevPub !== cntPub)) total_count.push([cntTheatre, cntPub, 0]);

    /* after observation I found that there are only two possible answer in this problem, 
       so I have checked for two possibilities only 
    */

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

function calculateProfit(totalDays, cntTheatre, cntPub) {
    const firstTheatre = totalDays - 5;
    const lastTheatre = totalDays - (5*cntTheatre);

    const theatreProfit = (cntTheatre/2)*(firstTheatre + lastTheatre)*15;

    totalDays-= 5*cntTheatre;
    const firstPub = totalDays - 4;
    const lastPub = totalDays - (4*cntPub);

    const pubProfit = (cntPub/2)*(firstPub + lastPub)*10;

    return theatreProfit + pubProfit;
}

// this function is used to print the answer calculated by above functions
function printCount(currentIndex = 0) {
    const printProfit = document.getElementById("profit");
    printProfit.textContent = total_profit*100;

    if (total_count.length) {
        total_theater = total_count[currentIndex][0];
        total_pub = total_count[currentIndex][1];
        total_complex = total_count[currentIndex][2];
    }

    const theaterElement = document.getElementById("theatre");
    theaterElement.textContent = total_theater;

    const pubElement = document.getElementById("pub");
    pubElement.textContent = total_pub;

    const complexElement = document.getElementById("complex");
    complexElement.textContent = total_complex;
}

// this function will iterate to all the possible solutions of given days
function otherSolution() {
    const possibleAnswers = total_count.length;

    if (possibleAnswers === 1 && days !== null) {
        window.alert("There is only one solution!!!");
        return;
    }

    currentIndex = (currentIndex + 1) % possibleAnswers;

    printCount(currentIndex);
}

/* Util functions */

// this is used to take input after some delay after user stops entering data
function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
        func(args);
        }, delay);
    };
}

// this is used to show skeleton loader while calculation is not complete
function loader (show) {
    const skeletonLoaders = document.querySelectorAll(".skeleton");
    for (skeleton of skeletonLoaders) {
        if (show) skeleton.style.display = "block";
        else skeleton.style.display = "none";
    }

    const loadingData = document.querySelectorAll(".data");
    for (data of loadingData) {
        if (show) data.style.display = "none";
        else data.style.display = "block";
    }
}