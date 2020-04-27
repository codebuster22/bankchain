const ping = (client) => async () => {
    try{
        const ping = await client.ping();
        console.log("Success", ping);
    }catch (err){
        console.log("Failed", err);
    }
};

const getParsers = (client) => async () => {
    try{
        return await client.getParsers();
    }catch (e) {
        console.log(e);
    }
};

const submitDocument = (client,state) => async (url) => {
    try{
        const response = await client.fetchDocumentFromURL('tjqrcdvnlhfk', url, {remote_id: 'test'});
        return  {
            documentUrl: url,
            documentId: response.id,
            timestamp: new Date(),
        };

    }catch (e) {
        console.log(e);
    }
};

const getResult = (client, state) => async (docId) =>{
    try{
        return await client.getResultsByDocument('tjqrcdvnlhfk', 	docId, {format: 'object'}).then(result=>result[0].table_data);
    }catch (e) {
        console.log(e)
    }
};

module.exports = {ping, getParsers, submitDocument, getResult};