console.log(`Command Line Interface (CLI) to simulate an interaction of an ATM with a retail bank.

## Commands

* login[name] - Logs in as this customer and creates the customer if not exist
* deposit[amount] - Deposits this amount to the logged in customer
* withdraw[amount] - Withdraws this amount from the logged in customer
* transfer[target][amount] - Transfers this amount from the logged in customer to the target customer
* logout - Logs out of the current customer`);


var prompt = require("prompt");
const transactionRecord = {}
let loginUser = null

function ask() {
  prompt.get(['command'], function(err, response) {
    if (response.command) {
      let CommandsName = response.command.split(' ');
      if (!loginUser && CommandsName[0] === 'login') {
        //login asheesh
        let balanceAmt = 0;
        loginUser = CommandsName[1];
        if (!transactionRecord[CommandsName[1]]) {
          transactionRecord[CommandsName[1]] = {}
          console.log(`\n Hello, ${CommandsName[1]}! \n Your balance is $0`)
        } else {
          balanceAmt = transactionRecord[CommandsName[1]].balance || 0;
          console.log(`\n Hello, ${CommandsName[1]}! \n Your balance is $${balanceAmt}`)
        }
        ask();
      } else if (loginUser && CommandsName[0] === 'login') {
        console.log(`\n Please logout current user`)
        ask();
      } else if (CommandsName[0] === 'deposit') {
        //deposit 30
        let isbalance = transactionRecord[loginUser]?.balance || 0;
        isbalance = (+isbalance) + (+CommandsName[1]);
        transactionRecord[loginUser] = { 'deposit': CommandsName[1], 'balance': isbalance }
        console.log(`\n Your balance is $${transactionRecord[loginUser]?.balance}`)
        ask();
      } else if (CommandsName[0] === 'logout') {
        //logout
        console.log(`\n Goodbye ${loginUser}`)
        console.log("transactionRecord", transactionRecord)
        loginUser = null
        ask();
      } else if (CommandsName[0] === 'transfer') {
        //transfer Alice 50
        let isbalance = transactionRecord[loginUser]?.balance || 0;
        if (isbalance >= CommandsName[2]) {
          if (transactionRecord[CommandsName[1]]) {
            transactionRecord[loginUser].transfer = CommandsName[2]
            let remainingAmnt = (+transactionRecord[loginUser].balance) - (+CommandsName[2])
            transactionRecord[loginUser].balance = remainingAmnt;
            let transferAmount = transactionRecord[CommandsName[1]]?.balance || 0
            transferAmount = (+transferAmount) + (+CommandsName[2]);
            transactionRecord[CommandsName[1]].balance = transferAmount;
            console.log(`\n Transferred $${CommandsName[2]} to ${CommandsName[1]} \n your balance is $${remainingAmnt}`)
            ask();
          } else {
            console.log(`\n User not exist`)
            ask();
          }
        } else {
          console.log(`\n Insufficient balance`)
          ask();
        }
      } else {
        console.log(`\n command not found enter correct command`)
        ask();
      }
    }
  });
}
ask();