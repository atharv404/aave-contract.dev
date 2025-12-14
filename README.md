# Aave V3 Liquidation Testing Suite

Production-ready test suite for Aave V3 liquidation testing on Ethereum Stagenet (Chain ID: 73350).

## 🎯 Overview

This project provides comprehensive tests for the Aave V3 liquidation flow:
- Supply collateral (WETH)
- Borrow against collateral (DAI)
- Price manipulation via MockOracle
- Health factor tracking
- Liquidation trigger scenarios

## 📋 Prerequisites

- Node.js v16 or higher
- npm or yarn
- Ethereum Stagenet access (Contract.dev)
- Test account with stagenet ETH

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
CONTRACT_DEV_RPC=https://rpc-staging.contract.dev/YOUR_API_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Run Tests

#### Local Network (Hardhat)
```bash
npx hardhat test
```

#### Specific Test File
```bash
npx hardhat test test/comprehensive-liquidation-test.js
```

#### With Verbose Output
```bash
npx hardhat test --verbose
```

#### On Stagenet
```bash
npx hardhat test --network stagenet
```

## 📁 Project Structure

```
.
├── contracts/
│   ├── TestAaveLiquidation.sol    # Main liquidation test contract
│   └── MockOracle.sol              # Mock price oracle for testing
├── test/
│   ├── test-liquidation-flow.js    # Basic flow test
│   └── comprehensive-liquidation-test.js  # Full production test suite
├── scripts/
│   └── deploy.js                   # Deployment script
├── hardhat.config.js               # Hardhat configuration
├── .env.example                    # Environment variables template
└── package.json                    # Dependencies
```

## 🧪 Test Suites

### TEST SUITE 1: Setup & Deployment
- Deploy MockOracle contract
- Deploy TestAaveLiquidation contract
- Verify contract state
- Initialize oracle prices

### TEST SUITE 2: Supply Collateral
- Check WETH balance
- Wrap ETH if needed
- **Explicit approval of WETH spending**
- Supply 5 WETH to Aave
- Verify health factor

### TEST SUITE 3: Borrow Against Collateral
- Borrow 100 DAI using variable rate
- Verify health factor remains healthy
- Store baseline health factor

### TEST SUITE 4: Price Manipulation & Liquidation Trigger
- Crash WETH price by 50% ($2400 → $1200)
- Update oracle and contract
- Verify health factor drops
- Check liquidation risk

### TEST SUITE 5: Health Factor History Tracking
- Query health history length
- Loop through all history entries
- Verify data integrity

### TEST SUITE 6: Withdrawal
- Attempt to withdraw 1 WETH
- Check health factor after withdrawal

### TEST SUITE 7: Error Handling
- Test insufficient approval
- Test invalid asset address
- Test zero amount borrow
- Test zero price update
- Test owner-only access control

## 📊 Test Output

The test suite provides detailed logging:

```
🚀 COMPREHENSIVE AAVE V3 LIQUIDATION TEST SUITE

  📦 TEST SUITE 1: Setup & Deployment
    🔧 Deploying MockOracle contract...
       👤 Deployer address: 0x...
       ✅ MockOracle deployed at: 0x...
    ✅ 1.1 Should deploy MockOracle contract successfully
    
  💰 TEST SUITE 2: Supply Collateral
    💼 Checking WETH balance...
       📊 Current WETH balance: 5.0 WETH
    ✅ 2.1 Should get user wallet's WETH balance
    
  ... (continued)
```

## 🔧 Configuration

### Hardhat Networks

The project supports multiple networks:

- **hardhat**: Local Hardhat network (default)
- **stagenet**: Ethereum Stagenet (Chain ID: 73350)
- **contractDevEthereum**: Alias for stagenet

### Contract Addresses (Stagenet)

```javascript
AAVE_POOL: 0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9
WETH: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
DAI: 0x6B175474E89094C44Da98b954EedeAC495271d0F
USDC: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
```

## 🎓 Key Concepts

### Health Factor
- **> 1.0**: Position is healthy
- **< 1.0**: Position can be liquidated
- **MAX_UINT256**: No position (no debt)

### Aave Interest Rate Modes
- **1**: Stable rate
- **2**: Variable rate (used in tests)

### Token Decimals
- WETH: 18 decimals
- DAI: 18 decimals
- Oracle prices: 8 decimals (Chainlink format)

## ⚠️ Important Notes

### ERC20 Approvals
**CRITICAL**: Before supplying tokens, you must explicitly approve the contract:

```javascript
await wethContract.approve(contractAddress, amount);
await testContract.supply(WETH, amount);
```

### MockOracle vs Real Oracle
- **MockOracle**: Used for testing price manipulation
- **Chainlink Oracle**: Real price feeds (not controlled in tests)
- TestAaveLiquidation uses MockOracle for `setPriceFeedValue()`

### Stagenet Specifics
- Replicates Ethereum mainnet
- Free test tokens available via faucets
- Aave V3 protocol fully deployed
- Chain ID: 73350

## 🐛 Troubleshooting

### "Transfer failed" Error
Make sure you have approved the contract before supplying:
```javascript
await wethContract.approve(contractAddress, amount);
```

### "Insufficient balance" Error
Wrap ETH to WETH:
```javascript
await wethContract.deposit({ value: amount });
```

### "Only owner" Error
Some functions are owner-only. Ensure you're calling from the deployer account.

### Network Connection Issues
Check your RPC endpoint in `.env`:
```env
CONTRACT_DEV_RPC=https://rpc-staging.contract.dev/YOUR_KEY
```

## 📝 Scripts

### Deploy Contracts
```bash
npx hardhat run scripts/deploy.js --network stagenet
```

### Run Specific Test
```bash
npx hardhat test test/comprehensive-liquidation-test.js
```

### Clean Artifacts
```bash
npx hardhat clean
```

## 🔒 Security

- **NEVER** commit `.env` file with real credentials
- Use test accounts only for stagenet
- Keep private keys secure
- Review all transactions before signing

## 📚 Resources

- [Aave V3 Documentation](https://docs.aave.com/developers/v/2.0/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js v6 Documentation](https://docs.ethers.org/v6/)
- [Contract.dev Platform](https://contract.dev)

## 🤝 Contributing

This is a production-ready test suite. When making changes:
1. Maintain comprehensive test coverage
2. Follow existing code style
3. Update documentation
4. Test on local network first
5. Validate on stagenet before deploying

## 📄 License

MIT

## 🎉 Success Criteria

All tests should pass with output similar to:

```
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
```

---

**Built with ❤️ for Aave V3 liquidation testing on Ethereum Stagenet**
