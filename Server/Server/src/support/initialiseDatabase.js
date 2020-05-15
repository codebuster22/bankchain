const initialiseDb = (webScraper, npa, npaAddress, fetch, token, counter, contractState) => async () =>{
    await webScraper.getSitemaps(fetch,token)();
    await webScraper.createScrapingJob(fetch,token)(webScraper.db.sitemap.id);
    const timer = setInterval(async ()=>{
        console.log("Inside Timer");
        const response = await webScraper.getScrapingJobStatus(fetch,token)(webScraper.db.scraping.id);
        console.log(response);
        if(response==='finished'){
            console.log("finished");
            const data = await webScraper.getData(fetch,token)(webScraper.db.scraping.id).then(response=>webScraper.db.npa.forEach((each)=>{
                const {bankName,assetOnAuction,
                    _auction_id,
                    eventType, city,
                    _reservePrice, _EMD, bidMultipliers,
                    _timestamp} = each;
                npa.createNPA(contractState, counter)(bankName, assetOnAuction,
                    _auction_id,
                    eventType, city,
                    _reservePrice, _EMD, bidMultipliers,
                    _timestamp)
                    .then(result=>{
                            console.log(result);
                            if(result.flag) {
                                npaAddress.push(result.data);
                            }
                        }
                    );
                counter++;
            }));
            clearInterval(timer);
            console.log("Timer closed");
            return data;
        }
    },10000)
}

module.exports = {initialiseDb};