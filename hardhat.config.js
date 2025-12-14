// require("dotenv").config();
// require("@nomicfoundation/hardhat-toolbox");

// const { CONTRACT_DEV_RPC, PRIVATE_KEY } = process.env;


// module.exports = {
//   solidity: {
//     version: "0.8.19",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   networks: {
//     hardhat: {
//       // Use hardhat network for local testing
//       chainId: 31337,
//       allowUnlimitedContractSize: true
//     },
//     contractDevEthereum: {
//       url: CONTRACT_DEV_RPC || "",
//       accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
//       chainId: 73350, // Ethereum Stagenet Chain ID
//       timeout: 60000,
//       gasPrice: "auto"
//     },
//     // Alias for stagenet
//     stagenet: {
//       url: CONTRACT_DEV_RPC || "",
//       accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
//       chainId: 73350,
//       timeout: 60000,
//       gasPrice: "auto"
//     }
//   },
//   mocha: {
//     timeout: 120000 // 2 minutes for tests that interact with stagenet
//   }
// };



// hardhat.config.js
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

// ✅ RPC URL - Hardcoded (public info, safe to share)
const RPC_URL = "https://rpc-staging.contract.dev/4e3ed7fa81960cae991378767b15abfe";

// ⚠️ Private Key - From .env file (NEVER hardcode this!)
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

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
      url: RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 73350, // Ethereum Stagenet Chain ID
      timeout: 60000,
      gasPrice: "auto"
    },
    // Alias for stagenet
    stagenet: {
      url: RPC_URL,
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

