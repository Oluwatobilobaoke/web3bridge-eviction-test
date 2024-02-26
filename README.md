# Sample Hardhat Project

This is my eviction test for hardhat.

## Installation

```bash
npm install
```

## Configuration

copy the .env.example file to .env and add the necessary values

FOR UNISWAP INTERACTIONS:
you only need to add MAINET_ALCHEMY_API_KEY_URL= to the .env file

```bash
cp .env.example .env
```

## Usage

## Start the hardhat node

```bash
npx hardhat node
```

RUN THE SCRIPTS

```bash
npx hardhat run scripts/uniswap-interaction/swapExactTokensForETH.ts
npx hardhat run scripts/uniswap-interaction/swapTokensForExactTokens.ts.ts
```
