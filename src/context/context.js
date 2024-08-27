import { createContext, useState } from "react";
import runChat from "../config/api";
export const Context = createContext();

const ContextProvider = (props)=>
    {
        const [input,SetInput] = useState("");
        const [recentPrompt,SetRecentPrompt] = useState("");
        const [prevPrompt,SetPrevPrompt] = useState([]);
        const [showResult,SetShowResult] = useState(false);
        const [loading,SetLoading] = useState(false);
        const [resultData,SetResultData] = useState("");
        const typingEffect = (index,word)=>
            {
                setTimeout(function (){
                    SetResultData((prev)=> prev+word)
                },75*index);
            }
            const currentchat = ()=>
                {
                    SetLoading(false)
                    SetShowResult(false)
                }
        const onsent = async (prompt)=>
            {
                
                SetLoading(true)
                SetRecentPrompt(input)
                SetShowResult(true);
                SetResultData("")
                let res;
                if(prompt !== undefined)
                    {
                        res = await runChat(prompt);
                        SetRecentPrompt(prompt)
                    }
                    else
                    {
                        SetPrevPrompt(prev => [...prev,prompt])
                        SetRecentPrompt(input);
                        res = await runChat(input)
                    }
                SetLoading(true)
                const response = await runChat(input)
                let responseArray = response.split("*")
                let newArray;
                for(let i=0;i<responseArray.length;i++)
                    {
                            if(i === 0 ||  i%2!==1)
                                {
                                    newArray += responseArray[i]
                                }
                                else
                                {
                                    newArray+= "<b>"+responseArray[i]+"</b>"

                                }
                    }
                    let newResponse = newArray.split('*').join("</br>");
                    let formattedArray = newResponse.split(" ");
                    for(let i=0;i<formattedArray.length;i++)
                        {
                            const nextWord = formattedArray[1];
                            typingEffect(i,nextWord+" ")
                        }
                    SetResultData(newArray)
                    SetLoading(false);
                    SetInput("")
                    
            }
            onsent("hello")
        const contextValue = {
                input,
                SetInput,
                SetPrevPrompt,
                prevPrompt,
                onsent,
                recentPrompt,
                SetRecentPrompt,
                showResult,
                SetShowResult,
                loading,
                resultData,
                SetLoading,
                SetResultData,
                currentchat

        }
        return (
            <Context.Provider value={contextValue}>
                {props.children}
            </Context.Provider>
        )
    }
   
export default ContextProvider