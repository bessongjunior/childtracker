
// import PropTypes from "prop-types";
import {ReactNode} from 'react';

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

import Box from '@mui/material/Box';

import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "./components/SidenavStyles";
import { useSidebarController } from "../../hooks/useSidebarContext";

interface SidenavCollapseProps {
    icon: ReactNode;
    name: string;
    active: Boolean;

}

export default function SidenavCollapse({ icon, name, active, ...rest }: SidenavCollapseProps) {
  const [controller] = useSidebarController();
  const { miniSidenav } = controller;

  return (
    <ListItem component="li">
      <Box
        {...rest}
        sx={(theme) => collapseItem(theme, { active }) }
      >
        <ListItemIcon
          sx={(theme) => collapseIconBox(theme, { active }) }
        >
          {typeof icon === "string" ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{ icon }</Icon>) : ( icon)}
        </ListItemIcon>

        <ListItemText
          primary={name}
          sx={(theme) => collapseText(theme, {miniSidenav, active })}
        />
      </Box>
    </ListItem>
  );
}

SidenavCollapse.defaultProps = {
  active: false,
};

