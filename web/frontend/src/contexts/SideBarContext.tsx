import { createContext, Dispatch, useReducer, ReactNode, useMemo } from "react";
// import PropTypes from "prop-types";
//useMemo,
type SidebarContextState = {
  miniSidenav: boolean;
  layout: string;
};

type SidebarContextAction =
  | { type: "MINI_SIDENAV"; value: boolean }
  | { type: "LAYOUT"; value: string };

export const SideBarContext =  createContext<[SidebarContextState, Dispatch<SidebarContextAction>] | null>(null);

const sidebarReducer = (state: SidebarContextState, action: SidebarContextAction) => {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    default: {
    //   throw new Error(`Unhandled action type: ${action.type}`);
         throw new Error(`Unhandled action type: Error`);
    }
  }
}

type SidebarControllerProviderProps = {
  children: ReactNode
}

export const SidebarControllerProvider = ({ children }: SidebarControllerProviderProps) => {
  const initialState = {
    miniSidenav: false,
    layout: "dashboard",
  };

  const [controller, dispatch] = useReducer(sidebarReducer, initialState);
  // const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <SideBarContext.Provider value={useMemo(() => [controller, dispatch], [controller, dispatch])}> {/* // value={value} ///  [controller, dispatch] */}
              {children}
          </SideBarContext.Provider>;
}


// SidebarControllerProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// }; // not needed since a type is defined above!

// export const setMiniSidenav = (dispatch: Dispatch<SidebarContextAction>, value: boolean) => dispatch({ type: "MINI_SIDENAV", value });
// export const setLayout = (dispatch: Dispatch<SidebarContextAction>, value: string) => dispatch({ type: "LAYOUT", value });


// type SidebarContext = {
//   sidebarToggle: any;
//   toggleSidebar: () => void;
//   closeSidebar: () => void;
// };

// eslint-disable-next-line @typescript-eslint/no-redeclare
// export const SidebarContext = createContext<SidebarContext>({} as SidebarContext);

// type SidebarProviderProps = {
//   children: ReactNode;
  
//   }

// export const SidebarProvider = ({ children }: SidebarProviderProps) => {
//   const [sidebarToggle, setSidebarToggle] = useState(false);
//   const toggleSidebar = () => {
//     setSidebarToggle(!sidebarToggle);
//   };
//   const closeSidebar = () => {
//     setSidebarToggle(false);
//   };

//   return (
//     <SidebarContext.Provider
//       value={{ sidebarToggle, toggleSidebar, closeSidebar }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   );
// };
