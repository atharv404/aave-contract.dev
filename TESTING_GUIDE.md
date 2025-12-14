# Testing Guide - Aave V3 Liquidation Test Suite

This guide provides step-by-step instructions for running the comprehensive Aave V3 liquidation test suite.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Running Tests](#running-tests)
4. [Understanding Test Output](#understanding-test-output)
5. [Troubleshooting](#troubleshooting)
6. [Test Coverage](#test-coverage)

## Prerequisites

Before running the tests, ensure you have:

- ✅ Node.js v16+ installed
- ✅ npm or yarn package manager
- ✅ Git (for version control)
- ✅ Ethereum Stagenet access (optional, for stagenet tests)
- ✅ Test account with stagenet ETH (optional, for stagenet tests)

## Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd aave-contract.dev

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your values (for stagenet testing)
nano .env  # or use your preferred editor
```

Required environment variables for stagenet:
```env
CONTRACT_DEV_RPC=https://rpc-staging.contract.dev/YOUR_API_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
AAVE_POOL=0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9
AAVE_WETH=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
AAVE_DAI=0x6B175474E89094C44Da98b954EedeAC495271d0F
```

### 3. Compile Contracts

```bash
npm run compile
```

Expected output:
```
Compiled 2 Solidity files successfully
```

## Running Tests

### Local Hardhat Network (Recommended for Development)

The comprehensive test suite is designed to run on a local Hardhat network:

```bash
# Run all tests
npm test

# Run only the comprehensive test suite
npm run test:comprehensive

# Run with verbose output
npm run test:verbose
```

### Specific Test Suites

You can run individual test suites by file:

```bash
# Original basic test
npx hardhat test test/test-liquidation-flow.js

# Comprehensive production test suite
npx hardhat test test/comprehensive-liquidation-test.js
```

### Stagenet Testing

**⚠️ Note**: Stagenet tests require real network access and may cost gas fees.

```bash
# Deploy contracts to stagenet
npm run deploy:stagenet

# Run tests on stagenet (if configured)
npx hardhat test --network stagenet
```

## Understanding Test Output

### Successful Test Run

When all tests pass, you'll see output similar to:

```
🚀 COMPREHENSIVE AAVE V3 LIQUIDATION TEST SUITE

  📦 TEST SUITE 1: Setup & Deployment
    🔧 Deploying MockOracle contract...
       👤 Deployer address: 0x...
       ✅ MockOracle deployed at: 0x...
    ✅ 1.1 Should deploy MockOracle contract successfully (XXXms)
    
    🔧 Deploying TestAaveLiquidation contract...
       ✅ TestAaveLiquidation deployed at: 0x...
    ✅ 1.2 Should deploy TestAaveLiquidation contract (XXXms)
    
    [... more tests ...]

  💰 TEST SUITE 2: Supply Collateral
    💼 Checking WETH balance...
       📊 Current WETH balance: 10.0 WETH
    ✅ 2.1 Should get user wallet's WETH balance (XXXms)
    
    [... more tests ...]

================================================================================
🎉 COMPREHENSIVE TEST SUITE COMPLETED SUCCESSFULLY
================================================================================

📊 Test Summary:
   ✅ All 7 test suites executed
   ✅ Smart contract deployment verified
   ✅ Supply/Borrow/Withdraw flows tested
   ✅ Price manipulation tested
   ✅ Health factor tracking verified
   ✅ Error handling validated

🚀 System is production-ready for stagenet deployment!
================================================================================

  31 passing (5s)
```

### Test Metrics

Each test provides detailed metrics:

- **Deployment addresses**: Contract addresses for verification
- **Gas usage**: Transaction gas costs
- **Health factors**: Position health at each stage
- **Balances**: Token balances before/after operations
- **Events**: Emitted events verification

## Test Coverage

### TEST SUITE 1: Setup & Deployment (5 tests)
- ✅ Deploy MockOracle
- ✅ Deploy TestAaveLiquidation
- ✅ Verify contract state
- ✅ Check initial health factor
- ✅ Initialize oracle prices

### TEST SUITE 2: Supply Collateral (6 tests)
- ✅ Check WETH balance
- ✅ Wrap ETH if needed
- ✅ **Explicit approval** (CRITICAL)
- ✅ Supply to Aave
- ✅ Verify health factor
- ✅ Check Supplied event

### TEST SUITE 3: Borrow Against Collateral (4 tests)
- ✅ Check DAI balance
- ✅ Borrow DAI
- ✅ Verify health factor after borrow
- ✅ Check Borrowed event

### TEST SUITE 4: Price Manipulation (5 tests)
- ✅ Calculate price drop
- ✅ Update oracle price
- ✅ Update contract price feed
- ✅ Verify health factor drops
- ✅ Check PriceUpdated event

### TEST SUITE 5: Health Factor History (3 tests)
- ✅ Query history length
- ✅ Loop through entries
- ✅ Verify data integrity

### TEST SUITE 6: Withdrawal (3 tests)
- ✅ Attempt withdrawal
- ✅ Check health factor
- ✅ Verify Withdrawn event

### TEST SUITE 7: Error Handling (5 tests)
- ✅ Insufficient approval
- ✅ Invalid asset address
- ✅ Zero amount borrow
- ✅ Zero price update
- ✅ Owner-only access control

## Troubleshooting

### Common Issues

#### 1. "Cannot find module" Error

**Problem**: Dependencies not installed

**Solution**:
```bash
npm install
```

#### 2. "Transfer failed" Error

**Problem**: Insufficient token approval

**Solution**: The test handles this automatically, but if you see this in custom tests:
```javascript
await wethContract.approve(contractAddress, amount);
await testContract.supply(WETH, amount);
```

#### 3. "Insufficient balance" Error

**Problem**: Not enough WETH in test account

**Solution**: The test automatically wraps ETH. If testing manually:
```javascript
await wethContract.deposit({ value: parseEth("10") });
```

#### 4. Compilation Errors

**Problem**: Solidity compiler issues

**Solution**:
```bash
# Clean and recompile
npx hardhat clean
npm run compile
```

#### 5. Network Connection Issues (Stagenet)

**Problem**: Cannot connect to stagenet RPC

**Solution**:
- Verify `CONTRACT_DEV_RPC` in `.env`
- Check API key is valid
- Ensure network is accessible

#### 6. "Only owner" Errors

**Problem**: Calling owner-only functions from wrong account

**Solution**: Ensure you're using the deployer account for owner functions

### Debug Mode

For additional debugging information:

```bash
# Enable Hardhat verbose mode
npx hardhat test --verbose

# Show stack traces on failures
npx hardhat test --trace

# Run a single test
npx hardhat test --grep "Should deploy MockOracle"
```

## Advanced Testing

### Running Specific Tests

Use Mocha's `--grep` flag to run specific tests:

```bash
# Run only deployment tests
npx hardhat test --grep "Setup & Deployment"

# Run only error handling tests
npx hardhat test --grep "Error Handling"

# Run a specific test by description
npx hardhat test --grep "Should deploy MockOracle"
```

### Gas Reporting

To analyze gas usage:

```bash
# Enable gas reporter (if configured)
REPORT_GAS=true npx hardhat test
```

### Coverage Analysis

To check test coverage:

```bash
# Run coverage (requires solidity-coverage)
npx hardhat coverage
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run compile
      - run: npm test
```

## Best Practices

1. **Always run tests locally before deploying to stagenet**
2. **Review gas costs** in test output
3. **Check health factors** at each stage
4. **Verify all events** are emitted correctly
5. **Test error cases** thoroughly
6. **Keep .env secure** - never commit private keys

## Next Steps

After successful test runs:

1. ✅ Deploy MockOracle to stagenet
2. ✅ Deploy TestAaveLiquidation to stagenet
3. ✅ Run integration tests on stagenet
4. ✅ Monitor health factors in production
5. ✅ Set up automated testing pipeline

## Support

If you encounter issues not covered in this guide:

1. Check the main [README.md](README.md)
2. Review error messages carefully
3. Enable verbose mode for more details
4. Consult Hardhat documentation
5. Review Aave V3 documentation

---

**Remember**: These are production-ready tests designed to work on the first run. Follow the setup steps carefully and all tests should pass! 🚀
