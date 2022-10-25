require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({path: ".env"});

const PRIVATE_KEY = process.env.PRIVATE_KEY
const RPC_URL = process.env.RPC_URL;

if(!PRIVATE_KEY) {
  console.error("Missing PRIVATE_KEY environment variable");
}

if(!RPC_URL) {
  console.error("Missing RPC_URL environment variable");
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    alfajores: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
