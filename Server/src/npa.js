const createNPA = (contractState, counter) => async (
    _bankName, _assetOnAuction,
    _auctionID,
    _eventType, _city,
    _reservePrice, _EMD, _bidMultiplier,
    _timestamp
    ) =>{
    try{
        if(!contractState.isMounted){
            throw new Error("Ethereum network not mounted");
        }else {
            return await contractState.assetManagerInstance.methods
                .addNPA(_bankName, _assetOnAuction,
                    _auctionID,
                    _eventType, _city,
                    _reservePrice, _EMD, _bidMultiplier,
                    _timestamp)
                .send({
                    from: contractState.accounts[0],
                    gasLimit: 900000
                })
                .then(res=>{
                    return getUpdate(contractState)(counter).then(res=> (
                        {
                            flag: true,
                            data: {
                                id: counter,
                                address: res.response.address,
                            }
                        }
                    ));
                });
        }
    }catch (e) {
        console.log(e);
        return {
            flag: false,
            data: e,
        }
    }
}

const getUpdate = (contractState) => async(id) => {
    const result = await contractState.assetManagerInstance.methods.getNPA(id).call({
        from: contractState.accounts[0],
    });
    if(result.add!=='0x0000000000000000000000000000000000000000'){
        return {
            flag: true,
            response: {id: Number(result.id), address: result.add},
        };
    }else {
        return {
            flag: false,
            error: 'No such entry found'
        }
    }
};

fetchData = (contractState) => async (address) => {
    try{
        contractState.assetInterfaceInstance.options.address=address;
        const npa = {};
        const {_EMD,_NPA_ID,_assetOnAuction,_auctionID,_bankName,_bidMultipliers,_city,_eventType,_reservePrice,_timeStamp} = await contractState.assetInterfaceInstance.methods.getNPADetails().call();
        Object.assign(npa,{_NPA_ID,_auctionID,_bankName,_assetOnAuction,_city,_timeStamp,_reservePrice,_EMD,_bidMultipliers,_eventType})
        console.log(npa);
        return {
            flag: true,
            Data: npa
        };
    }catch(e){
        console.log(e);
        return {
            flag: false,
            Data: e
        };
    }
}

module.exports = {createNPA, getUpdate, fetchData};