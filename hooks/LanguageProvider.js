'use client'
import React, { createContext,  useState } from "react";
export const  LanguageContext=createContext();
const LanguageContextProvider=({children})=>{
    const [currentLanguage,setCurrentLanguage]=useState('en');
    const changeLanguage=(lang)=>{
        setCurrentLanguage(lang);
    }
return (
    <LanguageContext.Provider value={{currentLanguage,changeLanguage}} >
        {children}
    </LanguageContext.Provider>
)
}
export default LanguageContextProvider;