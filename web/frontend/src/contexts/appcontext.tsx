// carries - theme context, page layout context, rtl/ltr context, language context, hink more and add. 



// import { FC, ReactNode, createContext, Dispatch, useReducer, useEffect } from 'react';

// interface User {
//   users: {
//     _id: string | number;
//     username: string;
//     email: string;
//   };
//   token: string;
//   // imageUrl: string;
// }

// type AuthState = { user: undefined | User }; //{ user: User | null };

// type AuthAction =
//   | { type: 'LOGIN'; payload: User }
//   | { type: 'LOGOUT' };

// export const AuthContext = createContext<{
//   state: AuthState;
//   dispatch: Dispatch<AuthAction>;
//   }>({
//     state: { user: undefined }, //user: null
//     dispatch: () => { },
//   });

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case 'LOGIN':
//       // return { ...state, user: action.payload };
//       return { ...state, user: action.user };
//     case 'LOGOUT':
//       return { user: null };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, { user: null });

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}') as User;

//     if (user) {
//       dispatch({ type: 'LOGIN', payload: user });
//     }
//   }, []);

//   console.log('AuthContext state:', state);

//   return (
//     <AuthContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useReducer, useEffect, FC, ReactNode } from 'react'
// import PropTypes from "prop-types";

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

