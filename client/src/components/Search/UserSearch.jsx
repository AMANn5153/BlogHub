import { InstantSearch, SearchBox, useInstantSearch,  } from "react-instantsearch-dom";
import client from "../../config/algolia";
import { Link } from "react-router-dom";



const Hit = ({hit})=>{
    return(
        <div  className=" flex w-full p-1 gap-2 shadow-md overflow-auto rounded-md bg-slate-300 items-center">
        <div className="rounded-full w-10 h-10 bg-white">
          <img src={hit.profilePic} alt="profile pic" className="rounded-full w-10 h-10"/>
        </div>
        <div>
        <Link to={`/profile/${hit._id}`}>
          <h1 className="text-gray-800 hover:underline hover:text-cyan-800">{hit.name}</h1>
        </Link>
        </div>
      </div>
    )
}

const Results = () => {
    const {results, indexUiState} = useInstantSearch();
    const hasQuery = indexUiState.query && indexUiState.query.trim() !== "";

    if(!hasQuery || results.hits.length === 0) return null;

    return (
        <div className=" dropdown dropdown-bottom w-full max-w-md bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {results.hits.map((hit) => (
                <Hit key={hit.objectID} hit={hit} />
            ))}
        </div>
    );
};



const UserSearch = () => {
    return(
        <InstantSearch indexName="users" searchClient={client}>
            <SearchBox 
                className="w-full"
                placeholder="Search Users"
                classNames={{
                    input: "w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500",
                    submit: "hidden",
                    reset: "absolute right-3 top-1/2 transform -translate-y-1/2",
                }}
            />
            <div className="absolute top-14 "><Results/></div>
        </InstantSearch>
    )
}


export default UserSearch;