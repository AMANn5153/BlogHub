import { createContext, useContext, useState} from 'react';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userAuth, setUserAuth] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const [auth, setAuth] = useState(localStorage.getItem("at") ? JSON.parse(localStorage.getItem("at")) : null);


    return <AuthContext.Provider value={{auth, setAuth, userAuth, setUserAuth}}>{children}</AuthContext.Provider>

}

const useAuthContext = () => {
    return useContext(AuthContext);
}

export default useAuthContext;
