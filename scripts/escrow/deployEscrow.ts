import { ethers } from "hardhat";

async function main() {
  const escrowFactory = await ethers.deployContract("EscrowFactory");

  await escrowFactory.waitForDeployment();

  console.log(`Escrow Factory contract deployed to ${escrowFactory.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/deployEscrow.ts --network sepolia

// Escrow Factory contract deployed to 0x9D51E0D4426e6fF018630930ad7Da6481D3ed57e

// npx hardhat verify --network sepolia 0x9D51E0D4426e6fF018630930ad7Da6481D3ed57e 

// Successfully verified contract EscrowFactory on the block explorer.
// https://sepolia.etherscan.io/address/0x9D51E0D4426e6fF018630930ad7Da6481D3ed57e#code

