function inputChanged() {
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
        if (days > 10) rec(days-10, theater, pub, complex+1, profit + temp_profit*10);
    }

};
