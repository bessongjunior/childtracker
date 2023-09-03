

import { FC, ReactNode, createContext, Dispatch, useReducer, useEffect } from 'react';

interface User {
  users: {
    _id: string | number;
    username: string;
    email: string;
  };
  token: string;
  success: boolean;
  // imageUrl: string;
}
 
type AuthState = { user: User | null}; //{ user: User | null};

type AuthAction =
  // | { type: 'LOGIN'; payload: User; user: User | null}
  | { type: 'LOGIN', payload: User} // | null
  | { type: 'LOGOUT' };

// type AuthContextType = AuthState & {
//     dispatch: Dispatch<AuthAction>,
//    };
//  // remov from here
// const initialState = {
//     user: undefined,
//    };

// export const AuthContext = createContext<AuthContextType>({
//       state: { user: User }, //user: undefined
//       dispatch: () => { },
//     });
// end here to use the authcontext commented below

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  }>({
    state: { user: null}, //user: undefined
    dispatch: () => { },
  });

// : AuthState =add to infer return type is state
const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { state, user: action.payload };
      // return { ...state, user: action.user };
    case 'LOGOUT':
      return { user: null};
    default:
      return state;
  }
};

export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [user, dispatch] = useReducer(authReducer, { ...initialState });
  // const [state, dispatch] = useReducer(authReducer, { ...initialState });
  const [state, dispatch] = useReducer(authReducer, { user: null });

  console.log('user state b4 get localstorage:', state)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || ''); //as User;
    console.log(user)

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      console.log('User is stored in local storage', user)
    }
    if (user === undefined) {
      // User is not stored in local storage
      dispatch({type: 'LOGOUT'});
      console.log('User is not stored in local storage')
    }
  }, []);

  // console.log('AuthContext state:', user);
  console.log('AuthContext state:', state);

  return ( //value={{ ...state, dispatch }}
    <AuthContext.Provider value={{ state, dispatch }}> 
      {children}
    </AuthContext.Provider>
  );
};

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

// export const AuthContext = createContext<AuthContextType | undefined>(undefined) //<AuthContextType>


// export const authReducer = (state: any, action: any) => {
//     switch (action.type) {
//       case 'LOGIN':
//         return { user: action.payload }
//       case 'LOGOUT':
//         return { user: null}
//       default:
//         return state
//     }
//   }

// type Props = {
//     children: ReactNode;
//    };

// export const AuthContextProvider= ({ children }: Props) => {
//     const [state, dispatch] = useReducer(authReducer, { 
//       user: undefined
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

