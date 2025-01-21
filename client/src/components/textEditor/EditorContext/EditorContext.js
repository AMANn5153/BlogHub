import { useContext, createContext, useMemo } from "react";
import useAuthContext from "../../../context/authContext/useAuthContext";
import extensions from "../EditorExtension/EditorExtension";
import {useEditor} from "@tiptap/react";




const context = createContext();


export const EditorContextProvider = ({children, purpose}) => {
    const { auth } = useAuthContext();
    
    const content = useMemo(()=>{
        if(purpose === "blog"){
            return JSON.parse(localStorage.getItem(`user-${auth._id}-Blog-1`))?.html;
        }

        else if(purpose === "comment"){
            return  "";
        }

        else if(purpose === "reply"){
            return "";
        }
    }, [purpose])


     
    const editor = useEditor({
        extensions,
        content,
    });

    return <context.Provider value={{editor}}>{children}</context.Provider>

}


const useEditorContext = () =>{
    return useContext(context);
}

export default useEditorContext;