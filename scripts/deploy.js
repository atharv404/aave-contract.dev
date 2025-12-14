const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

  // Deploy MockOracle if MANUAL_ORACLE is not set
  let oracleAddress = process.env.MANUAL_ORACLE;
  
  if (!oracleAddress) {
    console.log("⚠️  MANUAL_ORACLE not set, deploying new MockOracle...");
    const MockOracle = await ethers.getContractFactory("MockOracle");
    const mockOracle = await MockOracle.deploy();
    await mockOracle.waitForDeployment();
    
    oracleAddress = await mockOracle.getAddress();
    console.log("✅ MockOracle deployed at:", oracleAddress);
    
    // Set initial prices
    const wethPrice = 240000000000n; // $2400
    const daiPrice = 100000000n; // $1
    const wethAddress = process.env.AAVE_WETH || "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const daiAddress = process.env.AAVE_DAI || "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    
    await (await mockOracle.setPrice(wethAddress, wethPrice)).wait();
    await (await mockOracle.setPrice(daiAddress, daiPrice)).wait();
    console.log("✅ Initial prices set (WETH: $2400, DAI: $1)\n");
  }

  const pool = process.env.AAVE_POOL;
  const collateral = process.env.AAVE_WETH;
  const debt = process.env.AAVE_DAI;

  if (!pool || !oracleAddress || !collateral || !debt) {
    throw new Error("Missing required env vars: AAVE_POOL, AAVE_WETH, AAVE_DAI. MANUAL_ORACLE will auto-deploy if not set.");
  }

  console.log("Deploying TestAaveLiquidation with:");
  console.log("  Pool:", pool);
  console.log("  Oracle:", oracleAddress);
  console.log("  Collateral:", collateral);
  console.log("  Debt:", debt);

  const TestAaveLiquidation = await ethers.getContractFactory("TestAaveLiquidation");
  const test = await TestAaveLiquidation.deploy(pool, oracleAddress, collateral, debt);
  await test.waitForDeployment();

  const testAddress = await test.getAddress();
  console.log("\n✅ TestAaveLiquidation deployed at:", testAddress);
  
  if (!process.env.MANUAL_ORACLE) {
    console.log("\n📝 Add this to your .env file:");
    console.log(`MANUAL_ORACLE=${oracleAddress}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
