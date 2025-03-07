import {createContext, useContext, useState} from "react";

const TokenContext = createContext();

export const TokenContextProvider = ({children}) =>{

    const [token, setToken] = useState(sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null);
    return <TokenContext.Provider value={{token, setToken}}>{children}</TokenContext.Provider>
}

const useTokenContext = () =>{
    return useContext(TokenContext);
}

export default useTokenContext;


