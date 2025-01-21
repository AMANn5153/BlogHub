import { createContext, useState , useContext} from "react";

export const SignupContext = createContext();

export const useSignupContext = () => {
    return useContext(SignupContext);
}

export const SignupProvider = ({children}) => {
    const [registerUser, setRegisterUser] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: ""
    });
    return <SignupContext.Provider value={{registerUser, setRegisterUser}}>{children}</SignupContext.Provider>
}

