var AssetManager = artifacts.require("./AssetManager.sol");

module.exports = function(deployer) {
  deployer.deploy(AssetManager);
};
