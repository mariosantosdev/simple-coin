import { ethers } from "hardhat";

async function main() {
  const SimpleCoin = await ethers.getContractFactory("SimpleCoin");
  const simpleCoin = await SimpleCoin.deploy();

  await simpleCoin.deployed();

  console.log(`Contract deployed to ${simpleCoin.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
