import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { clearStorage } from "../utils/storage";

export const useLogout = () => {
   const { logOut} = useContext(AuthContext);

   const logout = () => {
      clearStorage();
      logOut();
   }

   return {
      logout
   }
}