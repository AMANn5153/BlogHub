import { useState } from "react";
import { useContext, createContext, useMemo } from "react";
import useAuthContext from "../../../context/authContext/useAuthContext";
import extensions from "../EditorExtension/EditorExtension";
import {useEditor} from "@tiptap/react";
import {useEditorStateContext} from "../../../context/editorStateContext/EditorStateContext";




const context = createContext();


export const EditorContextProvider = ({children, purpose}) => {
    const { auth } = useAuthContext();

    const {editorState} = useEditorStateContext();


    const content = useMemo(()=>{
        if(purpose === "blog"){
          return editorState?.html || JSON.parse(localStorage.getItem(`user-${auth._id}-Blog-1`))?.html;
        }

        else if(purpose === "comment"){
            return "";
        }

        else if(purpose === "reply"){
            return "";
        }

        else if(purpose === "commentEdit"){
            return editorState|| "";
        }

    }, [purpose])

    const editor = useEditor({
        extensions,
        content,
    });

    return <context.Provider value={{editor}}>{children}</context.Provider>;

}


const useEditorContext = () =>{
    return useContext(context);
}

export default useEditorContext;