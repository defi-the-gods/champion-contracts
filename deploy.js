const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const Box = await ethers.getContractFactory("Champion");
  const instance = await upgrades.deployProxy(Box, {kind: 'uups'});
  await instance.deployed();
  console.log("Champion deployed to:", instance.address);
  // remove for deployment
  
  // Upgrading
//   const BoxV2 = await ethers.getContractFactory("BoxV2");
//   const upgraded = await upgrades.upgradeProxy(instance.address, BoxV2);
}
main();