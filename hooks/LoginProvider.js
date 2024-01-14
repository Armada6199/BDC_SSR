'use client'
import axios from 'axios';
import React, { createContext, useState } from 'react'
const loginInitialValue={isLoggedIn:false,username:'',capabilities:[]}
export  const LoginContext=createContext();
 const LoginContextProvider=({children})=>{
const [loginData,setLoginData]=useState(loginInitialValue);
const login=async (loginCredindtials)=>{
    try {
        const loginResponse=await axios.post(`/app/login`,loginCredindtials);
        if(loginResponse.status===200){
           return loginResponse;
        }else{
            throw new Error('Invalid Login')
        }
    } catch (error) { 
        (error)
    }
}
return(
    <LoginContext.Provider value={{loginData,login}}>
       {children}
    </LoginContext.Provider>
)
}
export default LoginContextProvider