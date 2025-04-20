const algoliasearch  = require("algoliasearch");


const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_KEY);

const indices = {
    users : client.initIndex("users"),
    blogs : client.initIndex("blogs"),
}



module.exports = {client, indices};