const { ethers } = require("hardhat");
require("dotenv").config();
const { ORACLE_PRICES } = require("../constants");

/**
 * Deploy MockOracle for testing price manipulation scenarios
 */
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying MockOracle with account:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy MockOracle
  console.log("\nDeploying MockOracle...");
  const MockOracle = await ethers.getContractFactory("MockOracle");
  const mockOracle = await MockOracle.deploy();
  await mockOracle.waitForDeployment();

  const oracleAddress = await mockOracle.getAddress();
  console.log("✅ MockOracle deployed to:", oracleAddress);

  // Set initial prices using shared constants
  console.log("\nSetting initial prices...");
  
  const wethAddress = process.env.AAVE_WETH || "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const daiAddress = process.env.AAVE_DAI || "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  
  const setWethTx = await mockOracle.setPrice(wethAddress, ORACLE_PRICES.WETH);
  await setWethTx.wait();
  console.log("✅ WETH price set to $2400");

  const setDaiTx = await mockOracle.setPrice(daiAddress, ORACLE_PRICES.DAI);
  await setDaiTx.wait();
  console.log("✅ DAI price set to $1");

  console.log("\n📝 Save this MockOracle address to your .env file:");
  console.log(`MANUAL_ORACLE=${oracleAddress}`);
  
  console.log("\n✅ Deployment complete!");
  
  return oracleAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
