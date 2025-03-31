import { useContext, createContext, useState } from "react";

const context = createContext();

export const useEditorStateContext = () =>{
    return useContext(context);
}

const EditorStateContext = ({children}) => {
    const [editorState, setEditorState] = useState(null);
    return (
        <context.Provider value={{editorState, setEditorState}}>
            {children}
        </context.Provider>
    )
}

export default EditorStateContext;