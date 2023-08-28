import { useContext } from 'react';
import { SideBarContext } from '../contexts/SideBarContext';

export const useSidebarController = () => {

  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error("useSideBarContextController should be used inside the SideBarContextControllerProvider.");
  }
  return context;
}