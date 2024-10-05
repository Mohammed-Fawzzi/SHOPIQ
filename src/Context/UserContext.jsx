import { createContext, useEffect, useState } from "react"

export const UserContext = createContext(null);

export default function UserContextProvider({children}) {
    // Token
    const [userToken, setUserToken] = useState(null);
    // User Name
    const [isLogin, setIsLogin] = useState(null);

    // User Data
    const [userData, setUserData] = useState(null);

    // Retrieve data from localStorage
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const user = localStorage.getItem("userData");
        if (token && user) {
            setUserToken(token);
            setUserData(JSON.parse(user)); 
            setIsLogin(JSON.parse(user).name); 
        }
    }, []);

    return <UserContext.Provider value={{userToken,setUserToken , isLogin,setIsLogin , userData,setUserData}}>
        {children}
    </UserContext.Provider>
}