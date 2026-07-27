import {useContext, createContext, useState, useEffect} from "react";
import io from "socket.io-client";
import useAuthContext from "../authContext/useAuthContext";


const SocketContext = createContext();


const useSocket = () => {
    return useContext(SocketContext);
}




export const SocketProvider = ({children}) =>{
    
    const [socket, setSocket] = useState(null);
    const {auth} = useAuthContext();
    

    useEffect(()=>{
        if(auth){

        const newSocket = io(`${process.env.REACT_APP_SERVER_URL}`,{
            query : {
                user : auth._id
            }
        });

        setSocket(newSocket);
        return ()=>{newSocket.close();}
    }else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
    },[auth])


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}


export default useSocket;