# Max Profit

### Live here: - https://prabhashrai02.github.io/max_profit/

Problem Statement: - 
> User will give the number of days. We can construct 3 different type of buildings, i.e. ***Theatre*** (takes 5 unit of time to construct and
revenue is $1500 per unit time after construction), ***Pub*** (takes 4 unit of time to construct and revenue is $1000 per unit time after construction),
***Commercial Park*** (takes 10 unit of time to construct and revenue is $3000 per unit time after construction). We have to calculate the maximum profit,
user can earn and the count of all the buildings constructed to get this profit.

Approach: -
<ul>
<li> User can give input as the number of days in the input box.</li>
<li> I observed that we will never construct "Commercial Park", instead we can construct 2 "Theatre" to get more profit.</li>
<li> Now we only have 2 buildings to be constructed, and we have reduced one variable from our calculation.</li>
<li> Now we can greedily construct all the "Theatres" first (as much as we can) to get maximum profit.</li>
<li> After constructing the "Theatre", we can build "Pubs" from the remaining days if possible.</li>
<li> I've used Arithmetic Progression to calculate maximum profit from the number of "Theatres" and "Pubs".</li>
</ul>

### Features: -
<ul>
<li>Works in constant time</li>
<li>Responsive</li>
<li>Multiple Output</li>
<li>Supports large input</li>
<li>Validation</li>
<li>Debounce</li>
<li>Skeleton Loader</li>
<ul>

### Screenshot: -
![image](https://user-images.githubusercontent.com/73634195/197609738-7ad98058-60eb-4f6e-b1de-1c47e4ede8b2.png)
