import { createContext, useContext, useState} from 'react';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [userLoading, setUserLoading] = useState(false);
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem("token"))? JSON.parse(sessionStorage.getItem("token")) : null);
    
    console.log(auth);
    return <AuthContext.Provider value=
    {
        {
            auth,
            setAuth, 
            token, 
            setToken,
            userLoading,
            setUserLoading
        }
    }>{children}</AuthContext.Provider>   
}

const useAuthContext = () => {
    return useContext(AuthContext);
}

export default useAuthContext;
