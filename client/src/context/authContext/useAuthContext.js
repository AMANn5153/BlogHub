import { createContext, useContext, useState} from 'react';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null);
    return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>   
}

const useAuthContext = () => {
    return useContext(AuthContext);
}

export default useAuthContext;
