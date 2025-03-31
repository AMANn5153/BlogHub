import client  from "../../config/algolia";
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'

const Hit = ({hit}) => {
    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold">{hit.heading}</h1>
                    <p className="text-sm">{hit.content}</p>
                </div>
                <div className="flex flex-row items-center">
                    <img src={hit.profilePic} alt="" className="w-10 h-10 rounded-full"/>
                    <h1 className="text-sm ml-2">{hit.name}</h1>
                </div>
            </div>
        </>
    )
}

const BlogSearch = () => {
    return(
        <InstantSearch
        indexName="blogs"
        searchClient={client}
        className= "w-full"
        >
            <SearchBox />
            <Hits hitComponent={Hit} />
        </InstantSearch>
    )
}

export default BlogSearch;