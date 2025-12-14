# 🚀 Quick Start Guide

Get the Aave V3 Liquidation Test Suite running in 5 minutes!

## ⚡ Fast Setup

```bash
# 1. Install dependencies
npm install

# 2. Run tests (local Hardhat network)
npm test

# That's it! ✨
```

## 📊 Expected Output

```
🚀 COMPREHENSIVE AAVE V3 LIQUIDATION TEST SUITE

  📦 TEST SUITE 1: Setup & Deployment
    ✅ 1.1 Should deploy MockOracle contract successfully
    ✅ 1.2 Should deploy TestAaveLiquidation contract
    ✅ 1.3 Should verify contract deployed successfully
    ✅ 1.4 Should verify initial health factor is MAX_UINT256
    ✅ 1.5 Should initialize MockOracle with WETH and DAI prices

  💰 TEST SUITE 2: Supply Collateral
    ✅ 2.1 Should get user wallet's WETH balance
    ✅ 2.2 Should wrap ETH if WETH balance is insufficient
    ✅ 2.3 Should EXPLICITLY approve contract to spend 5 WETH
    ✅ 2.4 Should call supply(WETH, 5e18) successfully
    ✅ 2.5 Should query health factor after supply
    ✅ 2.6 Should verify Supplied event was emitted

  💸 TEST SUITE 3: Borrow Against Collateral
    ✅ 3.1 Should check contract's DAI balance
    ✅ 3.2 Should call borrow(DAI, 100e18, 2) successfully
    ✅ 3.3 Should query health factor after borrow
    ✅ 3.4 Should verify Borrowed event was emitted

  📉 TEST SUITE 4: Price Manipulation & Liquidation Trigger
    ✅ 4.1 Should calculate new WETH price (50% drop)
    ✅ 4.2 Should update MockOracle with lower WETH price
    ✅ 4.3 Should call setPriceFeedValue on TestAaveLiquidation
    ✅ 4.4 Should query health factor after price crash
    ✅ 4.5 Should verify PriceUpdated event was emitted

  📜 TEST SUITE 5: Health Factor History Tracking
    ✅ 5.1 Should query getHealthHistoryLength()
    ✅ 5.2 Should loop through health history and log all entries
    ✅ 5.3 Should verify timestamps and block numbers

  💳 TEST SUITE 6: Withdrawal
    ✅ 6.1 Should call withdraw(WETH, 1e18) successfully
    ✅ 6.2 Should query health factor after withdrawal
    ✅ 6.3 Should verify Withdrawn event if withdrawal succeeded

  ⚠️ TEST SUITE 7: Error Handling
    ✅ 7.1 Should fail to supply with insufficient approval
    ✅ 7.2 Should fail to supply with invalid asset address
    ✅ 7.3 Should fail to borrow with invalid amount (0)
    ✅ 7.4 Should fail to set price with zero value
    ✅ 7.5 Should fail onlyOwner functions from non-owner

================================================================================
🎉 COMPREHENSIVE TEST SUITE COMPLETED SUCCESSFULLY
================================================================================

  31 passing (5s)
```

## 🎯 What This Tests

✅ **Smart Contract Deployment** - Both MockOracle and TestAaveLiquidation  
✅ **Collateral Supply** - With explicit ERC20 approval handling  
✅ **Borrowing** - Variable rate borrowing against collateral  
✅ **Price Manipulation** - Simulating market crashes  
✅ **Health Factor Tracking** - Monitoring position health  
✅ **Liquidation Scenarios** - Triggering liquidation conditions  
✅ **Error Handling** - Comprehensive failure cases  

## 🔧 Additional Commands

```bash
# Run only the comprehensive test suite
npm run test:comprehensive

# Run with verbose output
npm run test:verbose

# Compile contracts
npm run compile

# Deploy contracts (requires .env setup)
npm run deploy

# Deploy to stagenet (requires .env setup)
npm run deploy:stagenet
```

## 🌐 Stagenet Testing

To test on Ethereum Stagenet:

1. Create `.env` file:
```bash
cp .env.example .env
```

2. Add your credentials:
```env
CONTRACT_DEV_RPC=https://rpc-staging.contract.dev/YOUR_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

3. Deploy and test:
```bash
npm run deploy:stagenet
npx hardhat test --network stagenet
```

## 📚 Documentation

- [README.md](README.md) - Full project documentation
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Detailed testing instructions

## 🆘 Need Help?

If tests don't pass immediately:

1. ✅ Check you ran `npm install`
2. ✅ Ensure Node.js v16+ is installed
3. ✅ Review error messages - they're descriptive
4. ✅ Check [TESTING_GUIDE.md](TESTING_GUIDE.md) for troubleshooting

## ✨ Features

- 🎯 **Production-Ready**: Works on first run
- 📊 **Comprehensive**: 31 tests across 7 suites
- 🔍 **Detailed Logging**: Every step is visible
- ⚡ **Fast**: Completes in ~5 seconds
- 🛡️ **Error Handling**: Tests failure scenarios
- 📈 **Health Tracking**: Full history logging
- 🎨 **Beautiful Output**: Color-coded and formatted

## 🎉 Success!

If all tests pass, you're ready for production deployment to Ethereum Stagenet!

---

**Built with ❤️ for Aave V3 liquidation testing**
