const path = require('path');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "Server/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    // ganache: {
    //   provider: () => (new HDWalletProvider(process.env.MNEMONIC,"http://127.0.0.1:7545", AccountIndex)),
    //   network_id: 5777
    // },
    // goreli_infura: {
    //   provider: () => (new HDWalletProvider(process.env.MNEMONIC,"http://goerli.infura.io/v3/7b5e2bccbcf0474e934050677bda48ac", AccountIndex)),
    //   network_id: 5
    // },
    // ropsten_infura: {
    //   provider: () => (new HDWalletProvider(process.env.MNEMONIC,"https://ropsten.infura.io/v3/7b5e2bccbcf0474e934050677bda48ac", AccountIndex)),
    //   network_id: 3
    // },

  },
  compilers: {
    solc: {
      version: "0.6.0"
    }
  }
};
