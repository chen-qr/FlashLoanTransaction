const hre = require("hardhat");

async function main() {
  const doFlashLoan = await hre.ethers.deployContract("DoFlashLoan");

  await doFlashLoan.waitForDeployment();
  console.log(
    `RouletteGame deployed to ${doFlashLoan.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});