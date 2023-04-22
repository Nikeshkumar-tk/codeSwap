import { ISessionUser } from "@/lib/interfaces/user";
import { useSession } from "next-auth/react";
import { createContext, useState, useEffect } from "react";

interface IUserContext {
    username: string | undefined
    email: string | undefined
    role: string | undefined
}

interface IUserContextProvider {
    children: React.ReactNode
}
const INITIAL_STATE:IUserContext = {
username:"",
email:"",
role:""
}
export const UserContext = createContext<IUserContext>({...INITIAL_STATE})


// export const UserContextProvider = ({children}:IUserContextProvider) => {

// return (
//     <UserContext.Provider value={user}>
//         {children}
//     </UserContext.Provider>
// )
// }