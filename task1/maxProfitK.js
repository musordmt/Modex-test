// import 'readline' module

const readline = require("readline");

// create an interface

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// prompt the user for input and wait for them to type something

rl.question('Please input the stock sequence array according to the following format: 3,4,3,6,2,7,1\n', (prices) => {
    rl.question('Please input the transaction count: \n', count => {

        // validate the input values

        let input = inputValidation(prices, count);

        if (input) {

            let maxProfit = maxProfitK(input.prices, input.k);
            console.log("maxProfit: ", maxProfit);
        }

        // close interface

        rl.close();
    })
});

// interface close event handler

rl.on("close", function() {
    console.log("\nThank you !!!");
    process.exit(0);
});

// input validation function

function inputValidation(priceString, count) {

    // convert the string to an array with split() method

    let prices = priceString.split(',');

    for (let i = 0; i < prices.length; i ++) {

        // if input value is not a number, return false

        if (!isNumber(prices[i])) {

            console.log('Invalid Input Prices', priceString.split(','));

            return false;
        } else {
            priceNumber = parseInt(prices[i]);
    
            // if input value is not a positive integer, return false

            if (priceNumber.toString() !== prices[i] || priceNumber < 0) {

                console.log('Invalid Input Prices', priceString.split(','));

                return false;
            } else {
                prices[i] = priceNumber;
            }
        }
    }

    // count value validation

    if (!isNumber(count)) {
        console.log('Invalid Input Count', count);

        return false;
    } else {
        countNumber = parseInt(count);

        if (countNumber.toString() !== count || countNumber < 0) {

            console.log('Invalid Input Count', count);

            return false;
        } else {
            count = countNumber;
        }
    }

    console.log("prices:", prices);
    console.log("count: ", count);
    return { prices: prices, k: count };
}

// check if input is numeric

function isNumber(s) {
    try {
        parseInt(s);
        return true;
    } catch (error) {
        return false;
    }
}

// calculate the max profit

function maxProfitK(prices, k) {
    const n = prices.length;

    // if the number of transactions allowed is greater than or equal to half of the days,
    // it can be performed as many transactions as want, thus reducing the problem to the stock buy-sell problem II.

    if (k >= Math.floor(n / 2)) {
        let maxProfit = 0;
        for (let i = 1; i < n; i ++) {
            if (prices[i] > prices [i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        return maxProfit;
    }

    // initializing dp array

    const dp = [];
    for (let i = 0; i <= k; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
            dp[i][j] = 0;
        }
    }

    // dynamic programming approach

    for (let i = 1; i <= k; i++) {
        let maxDiff = -prices[0];
        for (let j = 1; j < n; j++) {

            // maximum profit from the previous transaction and buying on a provious day

            dp[i][j] = Math.max(dp[i][j - 1], prices[j] + maxDiff);

            // maximum profit from the previous transation and the difference between the current price and the price on the previous day

            maxDiff = Math.max(maxDiff, dp[i - 1][j] - prices[j]);
        }
    }

    // the maximum profit achievable with 'k' transactions on the last day

    return dp[k][n - 1];
}