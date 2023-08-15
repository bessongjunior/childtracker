// import { createContext, useReducer, useEffect, ReactNode, FC } from 'react'
// // import PropTypes from "prop-types";

// interface User {
//     token: string;
//     image_url: string,
//     user: {
//         _id: number | string;
//         username: string;
//         email: string;
//     }
//   }

//   export type AuthContextType = {
//     user: User
//   };

// export const AuthContext = createContext<AuthContextType | null>(null) //<AuthContextType>


// export const authReducer = (state: any, action: any) => {
//     switch (action.type) {
//       case 'LOGIN':
//         return { user: action.payload }
//       case 'LOGOUT':
//         return { user: null }
//       default:
//         return state
//     }
//   }

// type Props = {
//     children: ReactNode;
//    };

// export const AuthContextProvider= ({ children }: Props) => {
//     const [state, dispatch] = useReducer(authReducer, { 
//       user: null
//     })
  
//     useEffect(() => {
//       const user  = JSON.parse(localStorage.getItem('user')) //JSON.parse(localStorage.getItem('user'))
  
//       if (user) {
//         dispatch({ type: 'LOGIN', payload: user }) 
//       }
//     }, [])
  
//     console.log('AuthContext state:', state)
    
//     return (
//       <AuthContext.Provider value={{ ...state, dispatch }}>
//         { children }
//       </AuthContext.Provider>
//     )
  
//   }
