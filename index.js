var currency = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100
};
var CashRegister = /** @class */ (function () {
    function CashRegister() {
    }
    CashRegister.prototype.checkCashRegister = function (price, cash, cid) {
        var result = [];
        var status = "";
        var change = cash - price;
        var extra = change;
        var totalChange = 0;
        var changeHave = 0;
        //if change == have exact amount then return cid
        // if change < cid or no exact amount return []
        // return open and only match cid
        cid.forEach(function (element) {
            var cidKey = element[0];
            var cidAmount = element[1];
            var cidValue = currency[cidKey];
            var cidCount = Math.floor(cidAmount / cidValue);
            var amount = 0;
            var newArr = [];
            if (cidAmount > 0) {
                var quo = Math.floor(extra / cidValue);
                if (quo > 0) {
                    if (quo > cidCount) {
                        amount = cidValue * cidCount;
                        extra = (extra - cidAmount);
                    }
                    else {
                        amount = quo * cidValue;
                        extra = (extra - amount);
                    }
                }
            }
            newArr = [cidKey, amount];
            result.unshift(newArr);
            totalChange += cidAmount;
            changeHave += amount;
        });
        if (totalChange < change || changeHave.toFixed(2) != change.toFixed(2)) {
            status = "INSUFFICIENT_FUNDS";
            result = [];
        }
        else if (totalChange == change) {
            status = "CLOSED";
        }
        else {
            var newArr = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i][1] != 0) {
                    newArr.unshift(result[i]);
                }
            }
            result = newArr;
            status = "OPEN";
        }
        console.log({ status: status, change: result });
    };
    return CashRegister;
}());
var cashReg = new CashRegister();
cashReg.checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
