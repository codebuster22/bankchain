const icici = (parserFunctions, client, state) => async (docId) =>{
    const response = await parserFunctions.getResult(client,state)(docId);
    const EMD = response[response.length-1].key_0;
    const trimmedResponse = response.filter(npa=>npa.key_1!=='');
    const iciciBankNpa = trimmedResponse.map(npa=>{
        return {
            bankName: 'ICICI',
            sectorName: 'Real Estate',
            borrowerName: npa.key_1,
            reservePrice: npa.key_3,
            EMD: EMD,
            bidMultiplier: npa.key_4,
        };
    });
    return iciciBankNpa;
}

module.exports = {icici};