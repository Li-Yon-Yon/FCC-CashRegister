interface CurrencyUnit {
  [key:string]:number
}


const currency: CurrencyUnit= {
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


interface CashRegisterInterface{
    checkCashRegister:Function;
}

class CashRegister implements CashRegisterInterface{
    checkCashRegister(price:number, cash:number, cid: any[][]) {
        
    let result:any[] = [];
    let status = "";
    const change:number = cash - price;
    let extra: number = change;
    let totalChange = 0;
  
    let changeHave = 0;
    //if change == have exact amount then return cid
    // if change < cid or no exact amount return []
    // return open and only match cid
   
  
    cid.forEach((element: any[]) => {
      const cidKey:string = element[0];
      const cidAmount:number = element[1];
      const cidValue:number = currency[cidKey];
  
      const cidCount = Math.floor(cidAmount/cidValue);
      let amount = 0;
      let newArr = [];
      if(cidAmount > 0)
      {
        const quo = Math.floor(extra/cidValue);
        if(quo > 0){
          if(quo > cidCount){
            amount = cidValue * cidCount;
            extra = (extra - cidAmount);
          }
          else{
            amount = quo * cidValue;
            extra = (extra - amount);
          }    
        } 
      }
      newArr = [cidKey,amount];
      result.unshift(newArr);
      totalChange += cidAmount;
      changeHave+= amount;
  
    });
    if(totalChange < change || changeHave.toFixed(2) != change.toFixed(2) ){
      status = "INSUFFICIENT_FUNDS";
      result = [];
    }
    else if(totalChange == change){
      status = "CLOSED";
    }
    else{
      const newArr:any[] = [];
      for(let i=0 ; i < result.length; i++){
        
        if(result[i][1] != 0){
          newArr.unshift(result[i]);
        }
      }
      result = newArr;
      status = "OPEN";
    }
    console.log( {status: status, change: result});
    }
}

const cashReg = new CashRegister();
cashReg.checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

  
  