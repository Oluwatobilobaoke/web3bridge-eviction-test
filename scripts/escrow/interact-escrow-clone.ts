import { ethers } from "hardhat";

// 0x7C72cdc62497Dbc11A5eF4a90f1d239527d948EC
// 0x6694c714e3Be435Ad1e660C37Ea78351092b0075
// 500000000000000000

const escrowAddress = "0x95a0e47116E71a556bEFC79c622731A726100217";
const payer = "0x7C72cdc62497Dbc11A5eF4a90f1d239527d948EC";
const payee = "0x6694c714e3Be435Ad1e660C37Ea78351092b0075";

async function interactEscrowContract() {
  let sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const escrow = await ethers.getContractAt("Escrow", escrowAddress);

  const [lawyer, payeeSigner] = await ethers.getSigners();

  console.log("Lawyer address:", lawyer.address);

  console.log("Payee address:", payeeSigner.address);

  console.log("Payer address:", payer);

  // check the escrow balance
  let escrowBalance = await escrow.balanceOf();
  console.log(
    "Escrow balance At the beginning:",
    ethers.formatEther(escrowBalance)
  );

  // check payer balance
  let payerBalance = await ethers.provider.getBalance(payer);

  console.log("Payer balance:", ethers.formatEther(payerBalance));

  // check payee balance
  let payeeBalance = await ethers.provider.getBalance(payee);

  console.log("Payee balance:", ethers.formatEther(payeeBalance));

  // // payee deposits the escrow  amount
  const escrowAmount = ethers.parseEther("0.5");

  const depositTx = await escrow
    .connect(payeeSigner)
    .deposit({ value: escrowAmount });

  await depositTx.wait();

  await sleep(20000);

  console.log("Escrow deposited");

  console.log("====================================");
  console.log("AFTER DEPOSIT");
  console.log("====================================");

  // check the escrow balance
  escrowBalance = await escrow.balanceOf();

  console.log("Escrow balance:", ethers.formatEther(escrowBalance));

  // check payer balance
  payerBalance = await ethers.provider.getBalance(payer);

  console.log("Payer balance:", ethers.formatEther(payerBalance));

  // check payee balance
  payeeBalance = await ethers.provider.getBalance(payee);
  console.log("Payee balance:", ethers.formatEther(payeeBalance));

  // // lawyer releases the escrow
  // const releaseTx = await escrow.connect(lawyer).release();

  // await releaseTx.wait();

  // await sleep(20000);

  // console.log("====================================");
  // console.log("AFTER RELEASE");
  // console.log("====================================");

  // // check the escrow balance
  // escrowBalance = await escrow.balanceOf();

  // console.log("Escrow balance:", ethers.formatEther(escrowBalance));

  // // check payer balance
  // payerBalance = await ethers.provider.getBalance(payer);

  // console.log("Payer balance:", ethers.formatEther(payerBalance));

  // // check payee balance
  // payeeBalance = await ethers.provider.getBalance(payee);
  // console.log("Payee balance:", ethers.formatEther(payeeBalance));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
interactEscrowContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/escrow/interact-escrow-clone.ts --network sepolia
