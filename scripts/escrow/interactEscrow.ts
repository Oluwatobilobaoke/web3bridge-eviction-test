import { ethers } from "hardhat";

// 0x7C72cdc62497Dbc11A5eF4a90f1d239527d948EC
// 0x6694c714e3Be435Ad1e660C37Ea78351092b0075
// 500000000000000000

const escrowFactoryAddress = "0x9D51E0D4426e6fF018630930ad7Da6481D3ed57e";
const payer = "0x7C72cdc62497Dbc11A5eF4a90f1d239527d948EC";
const payee = "0x6694c714e3Be435Ad1e660C37Ea78351092b0075";
async function interactEscrow() {
  const escrow = await ethers.getContractAt("EscrowFactory", escrowFactoryAddress);

  const [lawyer, payeeSigner] = await ethers.getSigners();

  console.log("Lawyer address:", lawyer.address);

  console.log("Payee address:", payeeSigner.address);

  // lawyer creates the escrow
  const escrowAmount = ethers.parseEther("0.5");

  const createTx = await escrow
    .connect(lawyer)
    .createEscrow(payer, payee, escrowAmount);

  await createTx.wait();

  let sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(30000);

  console.log("Escrow created");

  // Get the escrow clones

  const escrowClone = await escrow.getEscrowClones();

  console.log("Escrow clone:", escrowClone);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
interactEscrow().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/interactEscrow.ts --network sepolia

// Transaction successful with hash: 0x0b7148189f0ee9993ae95647a40ed4b7bbc910c9023486339fcfc70981d04d36
// https://sepolia.etherscan.io/tx/0x0b7148189f0ee9993ae95647a40ed4b7bbc910c9023486339fcfc70981d04d36

// Transaction successful with hash: 0x0b7148189f0ee9993ae95647a40ed4b7bbc910c9023486339fcfc70981d04d36
// https://sepolia.etherscan.io/tx/0x7c6d6fd8d71e09969df2efaec2ed701d766004d0f3a981e8456a947357a6d4d8
