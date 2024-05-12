require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",

  networks: {
    hardhat: {
      // fork主网
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
      },
      accounts: [{
        privateKey: `${process.env.RUN_KEY}`,
        balance: '10000000000000000000000'  // 提供初始以太坊余额，单位是wei
      }]
    },
  },
};