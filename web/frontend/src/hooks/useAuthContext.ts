import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react"

// export const useAuthContext = () => {
//   const context = useContext(AuthContext)

//   if(!context) {
//     throw Error('useAuthContext must be used inside an AuthContextProvider')
//   }

//   return context
// }

// further destructuring!

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  const { state: { user }, dispatch } = context;
  return { user, dispatch };
}
