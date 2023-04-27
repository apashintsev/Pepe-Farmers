import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import { mnemonic } from "./secrets.json";

import "./tasks/sendTokens";
import "./tasks/addLiquidity";
import "./tasks/addToWL";
import "./tasks/renounceOwnership";
import "./tasks/setFee";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
    },
  },
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: { mnemonic: mnemonic },
    },
    testnetBSC: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
    mainnetBSC: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: process.env.COINMARKET_CAP_KEY,
    token: "BNB",
    gasPriceApi: "https://api.bscscan.com/api?module=proxy&action=eth_gasPrice",
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY,
  },
};

export default config;
