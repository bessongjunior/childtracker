// import { useEffect, ReactNode } from "react";
// import { useLocation } from "react-router-dom";
// import Box from '@mui/material/Box';
// // import {pathname} from 'react-router-dom';
// import { useSidebarController } from "../../hooks/useSidebarContext";
// import { setLayout } from "../../contexts/SideBarContext";

// type PageLayoutProps = {
//   background?: "light" | "white" | "default";
//   children: ReactNode;
// }

// function PageLayout({ background, children }: PageLayoutProps) {
//   const [, dispatch] = useSidebarController();
//   const { pathname } = useLocation();

//   useEffect(() => {
//     setLayout(dispatch, "page");
//   }, [pathname]);

//   return (
//     <Box
//       width="100vw"
//       height="100%"
//       minHeight="100vh"
//       bgColor={background}
//       sx={{ overflowX: "hidden" }}
//     >
//       {children}
//     </Box>
//   );
// }

// // Setting default values for the props for PageLayout
// PageLayout.defaultProps = {
//   background: "default",
// };

// export default PageLayout;



import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Material Dashboard 2 React context
// import {
//   useMaterialUIController,
//   // setMiniSidenav,
//   setTransparentSidenav,
//   setWhiteSidenav,
// } from "context";
import { useSidebarController } from "../../hooks/useSidebarContext";
import { setMiniSidenav } from "../../contexts/SideBarContext";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSidebarController();
  const { miniSidenav } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const textColor='dark';

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    let returnValue;

    

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <Typography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </Typography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider/>
      );
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ miniSidenav }}
    >
      <Box pt={3} pb={1} px={4} textAlign="center">
        <Box
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </Typography>
        </Box>
        <Box component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <Box component="img" src={brand} alt="Brand" width="2rem" />}
          <Box
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <Typography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider/>

      <List>{renderRoutes}</List>

    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
