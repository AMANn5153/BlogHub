import algoliasearch from 'algoliasearch';

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALOGIA_SEARCH_KEY);

export default client;
