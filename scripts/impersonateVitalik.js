//Homework 17

const {ethers} = require("hardhat");

// Get Vitalik account - address 0x220866B1A2219f40e72f5c628B65D54268cA3A9D
async function runBlockchain() {
    console.log("Before transfer...");
    console.log("-------------------------------------")
    const vitalikAccount = await ethers.getImpersonatedSigner("0x220866B1A2219f40e72f5c628B65D54268cA3A9D");
    const vitalikBalance = await vitalikAccount.getBalance();
    console.log("Vitalik balance :", vitalikBalance);
    // get my own account balance
    const myAccount = await ethers.getImpersonatedSigner("0x4d4f35a291A835E84Ed6B30542E3032E42284561");
    const myAccountBalance = await myAccount.getBalance();
    console.log("my balance: ", myAccountBalance);
    // transfer
    const transactionResponse = await vitalikAccount.sendTransaction(
        {to: myAccount.address,
        value: ethers.utils.parseEther("289000"),
        });
    console.log("Transferring...")
    await transactionResponse.wait(1);
    console.log("------------------------------------")
    console.log("New balances after transfer...")
    const newVitalikBalance = await vitalikAccount.getBalance();
    const newMyBalance = await myAccount.getBalance();
    console.log("Vitalik new balance: ", newVitalikBalance);
    console.log("My new balance: ", newMyBalance);

}

runBlockchain()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })