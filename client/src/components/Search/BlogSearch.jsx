import client from "../../config/algolia";
import { InstantSearch, Pagination, SearchBox, useInstantSearch } from "react-instantsearch";
import parse from "html-react-parser";
import {Link} from "react-router-dom";



const Hit = ({ hit }) => (
<Link to={{pathname:`/blog/${hit.slug}`}} className="flex flex-col">
  <div className="flex w-full flex-row justify-between items-center p-3 bg-white hover:bg-gray-50 transition">
    <div className="flex flex-col">
      <h1 className="text-md font-bold text-gray-800">{hit.heading}</h1>
      <p className="text-sm text-gray-600">{parse(hit.content?.substring(0, 100))}...</p>
    </div>
  </div>
</Link>
);

const Results = () => {
  const { results, indexUiState } = useInstantSearch();
  const hasQuery = indexUiState.query && indexUiState.query.trim() !== "";

  if (!hasQuery || results.hits.length === 0) return null;

  return (
    <div className="  w-full max-w-md bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {results.hits.map((hit) => (
            <Hit key={hit.objectID} hit={hit} />
      ))}
    </div>
  );
};

const BlogSearch = () => {
  return (
    <InstantSearch
      indexName="blogs"
      searchClient={client}
      className="flex flex-col items-center "
    >
    <div className=" relative flex flex-col">   
        <SearchBox
          className="w-full"
          placeholder="Search"
          classNames={{
            input: "w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500",
            submit: "hidden",
            reset: "absolute right-3 top-1/2 transform -translate-y-1/2",
          }}
        />
      <div className="absolute top-14 w-full "><Results /></div>
    </div>
    </InstantSearch>
  );
};

export default BlogSearch;