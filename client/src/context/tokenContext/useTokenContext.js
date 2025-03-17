import { createContext, useContext, useState, useEffect, useCallback } from "react";
import useAuthContext from "../authContext/useAuthContext";
import useAuthFetch from "../../utils/authFetch";

const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const { auth, setAuth, token, setToken, userLoading, setUserLoading } = useAuthContext();
  const { authFetch } = useAuthFetch();
  const [isFetching, setIsFetching] = useState(false);

  const generateNewToken = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);
    
    try {
      const response = await fetch(`http://localhost:3001/api/v1/auth/newToken`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Token generation failed");
      
      const responseData = await response.json();
      sessionStorage.setItem("token", JSON.stringify({ token: responseData.token }));
      setToken(responseData.token);
      setAuth(responseData.user)
    } catch (error) {
      console.error("Token generation error:", error);
      sessionStorage.removeItem("token");
      setToken(undefined);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    const checkToken = async () => {
      if (token === null) {
        await generateNewToken();
      }
    };

    checkToken();
  }, [token, generateNewToken]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) return;
      if(auth)return;
      setUserLoading(true)
      try {
        const response = await authFetch(`http://localhost:3001/api/v1/auth/getUserInfo`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Authorization": `Bearer ${token.token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch user info");
        
        const responseData = await response.json();
        setAuth(responseData.user);
      } catch (error) {
        console.error("User info fetch error:", error);
        sessionStorage.removeItem("token");
        setToken(null);
      }
      finally {
        setUserLoading(false);
      }
    };

    fetchUserInfo();
  }, [auth]);

  return (
    <TokenContext.Provider value={{  generateNewToken }}>
      {children}
    </TokenContext.Provider>
  );
};

const useTokenContext = () => {
  return useContext(TokenContext)
};

export default useTokenContext;