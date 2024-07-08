import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const deploy = import.meta.env.VITE_DEPLOY_URL;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const checkUser = async () => {
    try {
      const responseClient = await axios.get(`${deploy}/clients/me`, {
        withCredentials: true,
      });

      if (
        responseClient.data &&
        responseClient.data._id &&
        responseClient.data.data.role === "client"
      ) {
        console.log(responseClient);
        setIsLoggedIn(true);
        setUserData(responseClient.data);
        return;
      }

      const responsePro = await axios.get(`${deploy}/pros/me`, {
        withCredentials: true,
      });

      if (
        responsePro.data &&
        responsePro.data._id &&
        responsePro.data.data.role === "pro"
      ) {
        console.log(responseClient);
        setIsLoggedIn(true);
        setUserData(responsePro.data);
        return;
      }

      setIsLoggedIn(false);
      setUserData({});
    } catch (error) {
      setIsLoggedIn(false);
      setUserData({});
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      checkUser();
    }
  }, []);

  const values = {
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    checkUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
