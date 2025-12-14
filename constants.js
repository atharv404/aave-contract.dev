/**
 * Shared Constants for Aave V3 Liquidation Testing
 * 
 * This file contains constants used across deployment scripts and tests
 * to ensure consistency and avoid duplication.
 */

// Oracle Price Constants (8 decimals for USD price, Chainlink format)
const ORACLE_PRICES = {
  WETH: BigInt(2400 * 10**8), // $2400 USD = 240000000000 (8 decimals)
  DAI: BigInt(1 * 10**8),     // $1 USD = 100000000 (8 decimals)
};

// Ethereum Stagenet Configuration
const STAGENET_CONFIG = {
  CHAIN_ID: 73350,
  AAVE_POOL: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  CHAINLINK_ORACLE: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
};

// Token Decimals
const TOKEN_DECIMALS = {
  WETH: 18,
  DAI: 18,
  USDC: 6,
  ORACLE: 8 // Chainlink price feed format
};

// Test Configuration
const TEST_CONFIG = {
  PRICE_DROP_PERCENTAGE: 50n, // For liquidation testing
  SUPPLY_AMOUNT_WETH: "5",    // Amount to supply as collateral
  BORROW_AMOUNT_DAI: "100",   // Amount to borrow
  WITHDRAW_AMOUNT_WETH: "1",  // Amount to withdraw in tests
  INTEREST_RATE_MODE: {
    STABLE: 1,
    VARIABLE: 2
  }
};

module.exports = {
  ORACLE_PRICES,
  STAGENET_CONFIG,
  TOKEN_DECIMALS,
  TEST_CONFIG
};
