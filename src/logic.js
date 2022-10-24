// this function is used to get the input enterd by user
const inputChanged = debounce(() => {
    calculate();
}, 1000);

let total_profit = 0, total_theater = 0, total_pub = 0, total_complex = 0;
let total_count = [], currentIndex = 0;

// this function is used to check the valid input and perfom calculation
function calculate() {
    loader(false);
    let days = document.getElementById("days").value;

    if (isNaN(days)) {
        window.alert("Please Enter valid number!!!");
        return;
    }

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

// this function is used to print the answer calculated by above functions
function printCount(currentIndex = 0) {
    let printProfit = document.getElementById("profit");
    printProfit.textContent = total_profit*100;

    if (total_count.length) {
        total_theater = total_count[currentIndex][0];
        total_pub = total_count[currentIndex][1];
        total_complex = total_count[currentIndex][2];
    }

    const theaterElement = document.getElementById("theater");
    theaterElement.textContent = total_theater;

    const pubElement = document.getElementById("pub");
    pubElement.textContent = total_pub;

    const complexElement = document.getElementById("complex");
    complexElement.textContent = total_complex;
}

// this function will iterate to all the possible solutions of given days
function otherSolution() {
    const possibleAnswers = total_count.length;

    if (possibleAnswers === 1) {
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