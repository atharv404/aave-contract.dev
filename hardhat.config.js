require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { CONTRACT_DEV_RPC, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      // Use hardhat network for local testing
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    contractDevEthereum: {
      url: CONTRACT_DEV_RPC || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 73350, // Ethereum Stagenet Chain ID
      timeout: 60000,
      gasPrice: "auto"
    },
    // Alias for stagenet
    stagenet: {
      url: CONTRACT_DEV_RPC || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 73350,
      timeout: 60000,
      gasPrice: "auto"
    }
  },
  mocha: {
    timeout: 120000 // 2 minutes for tests that interact with stagenet
  }
};
