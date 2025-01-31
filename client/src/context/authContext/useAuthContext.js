import { createContext, useContext, useState} from 'react';
import useRefreshToken from '../../hooks/refreshToken/useRefreshToken';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState(null);
    const {refreshToken} = useRefreshToken();
    
    if(!auth){
        console.log(auth);
       const accessToken = refreshToken();
       setAuth(accessToken);
    }


    return <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>

}

const useAuthContext = () => {
    return useContext(AuthContext);
}

export default useAuthContext;
