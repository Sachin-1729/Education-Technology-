import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { logoutDone } from "../Redux/loginfucntion";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openMemberships, setOpenMemberships] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState("");
  const dispatch = useDispatch();
  // Extract the full URL of the current page
  const location = useLocation();
  const currentUrl = location.pathname;

  console.log("URL ", currentUrl);

  // Generic click handler
  const handleNavigation = (buttonName, route) => {
    setActiveButton(buttonName);
    setTimeout(() => {
      navigate(route);
    }, 0);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleClick = (index) => {
    if (index === 0) {
      navigate("/");
    } else if (index === 1) {
      setOpenMemberships(!openMemberships);
    } else if (index == 2) {
      dispatch(logoutDone());
    } else {
      navigate("/");
    }
  };

  function getIcon(index) {
    if (index === 0) {
      return <PeopleIcon />;
    } else if (index === 1) {
      return <StarIcon />;
    } else if (index === 2) {
      return <LogoutIcon />;
    } else if (index === 3) {
      return <DraftsIcon />;
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Users", "Memberships", "Logout"].map((text, index) => (
          <div key={text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleClick(index)}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <ListItemIcon>{getIcon(index)}</ListItemIcon>
                <ListItemText primary={text} />
                {index === 1 ? (
                  openMemberships ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>
            {index === 1 && !openMemberships && (
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor:
                      currentUrl === "/memberships" ? "#1976d2" : "transparent",
                    color: currentUrl === "/memberships" ? "white" : "inherit",
                    "&:hover": {
                      backgroundColor: "rgb(193 193 193)",
                      color: 'black',
                    },
                  }}
                  onClick={() =>
                    handleNavigation("memberships", "/memberships")
                  }
                >
                  <ListItemText primary="Memberships" />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor:
                      currentUrl === "/subscriptions"
                        ? "#1976d2"
                        : "transparent",
                    color:
                      currentUrl === "/subscriptions" ? "white" : "inherit",
                    "&:hover": {
                      backgroundColor: "rgb(193 193 193)",
                      color: 'black',
                    },
                  }}
                  onClick={() => navigate("/subscriptions")}
                >
                  <ListItemText primary="Subscriptions" />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    pl: 4,

                    backgroundColor:
                      currentUrl === "/transactions"
                        ? "#1976d2"
                        : "transparent",
                    color:
                      currentUrl === "/transactions" ? "white" : "inherit",
                    "&:hover": {
                      backgroundColor: "rgb(193 193 193)",
                      color: 'black',
                    },
                  }}
                  onClick={() => navigate("/transactions")}
                >
                  <ListItemText primary="Transactions" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 ,
                    backgroundColor: currentUrl === '/content' ? '#1976d2' : 'transparent',
                 color: currentUrl === '/content' ? 'white' : 'inherit',
                 '&:hover': {
                  backgroundColor: 'rgb(193 193 193)',
                   color: 'black',
                 },
                 



                  }}
                  onClick={() => navigate("/content")}
                >
                  <ListItemText primary="Content" />
                </ListItemButton>
              </List>
            )}
          </div>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography sx={{ marginBottom: 2 }}>{props.content}</Typography>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default ResponsiveDrawer;
