const mountEthereum =  (Web3, provider, AssetManagerContract, AssetInterfaceContract) => async () => {
    try{
        const web3 = await new Web3(provider);
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();

        const assetManager = new web3.eth.Contract(       //create instance of assetManager
            AssetManagerContract.abi,
            AssetManagerContract.networks[networkId] && AssetManagerContract.networks[networkId].address,
        );

        const assetInterface = new web3.eth.Contract(
            AssetInterfaceContract.abi,
            AssetInterfaceContract.networks[networkId] && AssetInterfaceContract.networks[networkId].address,
        );

        console.log('Asset Manager Contract Address:-',AssetManagerContract.networks[networkId].address);

        return{
            isMounted: true,
            web3:web3,
            accounts: accounts,
            networkId: networkId,
            assetManagerInstance: assetManager,
            assetInterfaceInstance: assetInterface,
            assetManagerAddress: AssetManagerContract.networks[networkId].address,
        }
    }catch (e) {
        console.error(e);
    }
};

module.exports = mountEthereum;