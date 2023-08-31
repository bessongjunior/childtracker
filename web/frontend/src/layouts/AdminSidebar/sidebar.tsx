import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PeopleIcon from '@mui/icons-material/People';
import Person2Rounded from '@mui/icons-material/Person2Rounded';
import Logout from '@mui/icons-material/Logout';

export const mainListItems = (
  <Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={<NavLink to={'/admin/dashboard'} >Dashboard</NavLink>} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        {/* <Person /> */}
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary={<NavLink to={'/admin/users'} >Users</NavLink>} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Person2Rounded />
      </ListItemIcon>
      <ListItemText primary={<NavLink to={'/admin/profile'} >Profile</NavLink>} />
    </ListItemButton>
  </Fragment>
);

export const secondaryListItems = (
  <Fragment>
    <ListSubheader component="div" inset>
      Sign Out
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        {/* <AssignmentIcon /> */}
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </Fragment>
);