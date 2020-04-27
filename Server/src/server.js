const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config({path: '../.env'});
const Web3 = require("web3");
const AssetManagerContract = require("./contracts/AssetManager.json");
const AssetInterfaceContract = require("./contracts/AssetInterface.json");
const mountEthereum = require('./ethereum');
const npa = require('./npa');
const webScraper = require('./webScraper.js');
const init = require('./initialiseDatabase.js');

const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:7545"
);

const app = express();
app.use(bodyParser.json());
app.use(cors());

//-----------------------------------Database simulation---------------------------------

let counter = 400;
const npaAddress = []
const contractState = {};

//===============================================================================

//-----------------------------  API Calls ---------------------------------------//

app.get('/getAddress',(req,res)=>{
    res.json(npaAddress);
})

app.get('/ping',(req,res)=>{
    npa.getUpdate(contractState)(counter);
    console.log(npaAddress, counter);
})

app.post('/fetchData',(req,res)=>{
    const {address} = req.body;
    npa.fetchData(contractState)(address).then(npa=>res.json(npa));
})

app.listen(3001,()=>{
    mountEthereum(Web3,provider,AssetManagerContract,AssetInterfaceContract)().then(async res=>{
        Object.assign(contractState,res);
        let flag = false;
        do{
            await npa.getUpdate(contractState)(counter).then(res=>{
                if(res.flag){
                    npaAddress.push(res.response);
                    counter++;
                }else {
                    flag = true;
                }
            });
        }while(flag===false)
    }).then(res=>init.initialiseDb(webScraper, npa, npaAddress, fetch, process.env.API_TOKEN, counter, contractState)())

    console.log("Server listening to port 3001");
});

//===============================================================================

// const db = {
//     sitemap: {
//         flag: false,
//         id: 0,
//         name: ''
//     },
//     scraping: {
//         flag: false,
//         id: 0,
//     }
// };
//
// const jobBody = {
//     "sitemap_id": 0,
//     "driver": "fulljs",
//     "page_load_delay": 2000,
//     "request_interval": 2000,
//     "proxy": 0
// }
//
// //===============================================================================
//
// //---------------------------Web Scraper Api calls ------------------------------
//
// const parseToJson = (row) => {
//     const singleChar = row.split('');
//     const filter = singleChar.filter(each=>each!=='\\');
//     const {auction_id, bankName, assetOnAuction, city,date, reservePrice, EMD, eventType} = JSON.parse(filter.reduce((obj,each)=>obj+each));
//     const reduce = {auction_id, bankName, assetOnAuction, city,date, reservePrice, EMD, eventType};
//     return reduce;
// };
//
// const getSitemaps = async () => {
//     const response = await fetch('https://api.webscraper.io/api/v1/sitemaps?api_token='+process.env.API_TOKEN);
//     const sitemaps = await response.json();
//     const bea = await sitemaps.data.find(sitemap=>sitemap.name==='bankeauctions');
//     Object.assign(db.sitemap,{
//         flag: true,
//         id: bea.id,
//         name: bea.name,
//     });
// };
//
// const createScrapingJob = async (id) =>{
//     Object.assign(jobBody,{"sitemap_id": id});
//     const response = await fetch(
//         'https://api.webscraper.io/api/v1/scraping-job?api_token='+process.env.API_TOKEN,
//         {
//             method: 'POST',
//             body: JSON.stringify(jobBody),
//             headers: {'Content-Type': 'application/json'}
//         });
//     const dataId = await response.json();
//     Object.assign(db.scraping,{
//         flag: true,
//         id: dataId.data.id,
//     });
// }
//
// const getScrapingJobStatus = async (id) =>{
//     const response = await fetch('https://api.webscraper.io/api/v1/scraping-job/'+id+'?api_token='+process.env.API_TOKEN);
//     const status = await response.json();
//     return status.data.status;
// };
//
// const getData = async (id) => {
//     const response = await fetch('https://api.webscraper.io/api/v1/scraping-job/'+id+'/json?api_token='+process.env.API_TOKEN);
//     const data = await response.text();
//     const bracket = await data.split('\n');
//     bracket.pop();
//     const parse = await bracket.map(row=>parseToJson(row));
//     Object.assign(db,{npa: parse});
// };
//
// app.get('/init',(req,res) => {
//     initialiseDb().then(reply=>res.json(reply));
// })
//
// app.get('/getData',(req,res) => {
//     webScraper.getData(fetch,process.env.API_TOKEN)(webScraper.db.scraping.id).then(response=>res.json(webScraper.db));
// })
// const initialiseDb = (webScraper, npa, npaAddress, fetch, token, counter, contractState) => async () =>{
//     await webScraper.getSitemaps(fetch,token)();
//     await webScraper.createScrapingJob(fetch,token)(webScraper.db.sitemap.id);
//     const timer = setInterval(async ()=>{
//         console.log("Inside Timer");
//         const response = await webScraper.getScrapingJobStatus(fetch,token)(webScraper.db.scraping.id);
//         console.log(response);
//         if(response==='finished'){
//             console.log("finished");
//             const data = await webScraper.getData(fetch,token)(webScraper.db.scraping.id).then(response=>webScraper.db.npa.forEach((each)=>{
//                 const {bankName,assetOnAuction,
//                     _auction_id,
//                     eventType, city,
//                     _reservePrice, _EMD, bidMultipliers,
//                     _timestamp} = each;
//                 npa.createNPA(contractState, counter)(bankName, assetOnAuction,
//                     _auction_id,
//                     eventType, city,
//                     _reservePrice, _EMD, bidMultipliers,
//                     _timestamp)
//                     .then(result=>{
//                         console.log(result);
//                         npaAddress.push(result.data);
//                     }
//                 );
//                 counter++;
//             }));
//             clearInterval(timer);
//             console.log("Timer closed");
//             return data;
//         }
//     },10000)
// }