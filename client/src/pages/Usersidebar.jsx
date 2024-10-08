import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import SellIcon from "@mui/icons-material/Sell";
import PersonIcon from "@mui/icons-material/Person";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const drawerWidth = 240;

function PermanentDrawerLeft(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [activeIndex, setActiveIndex] = useState(null);
  console.log("URL ", currentUrl);

  React.useEffect(() => {
    if (currentUrl == "/users") {
      setActiveIndex(0);
    } else if (currentUrl == "/product") {
      setActiveIndex(1);
    } else if (currentUrl == "/pricing") {
      setActiveIndex(2);
    } else if (currentUrl == "/profile") {
      setActiveIndex(3);
    }
    else if(currentUrl[1]==='v'&&currentUrl[2]==='i'&&currentUrl[3]==='s'&&currentUrl[4]==='i'&&currentUrl[5]==='t')
    {
      setActiveIndex(2);
    }
  }, []);

  const handleClick = (index) => {
    // Set the clicked index to activeIndex
    if (index === 0) {
      navigate("/users");
    //  window.location.assign("/users");
      setActiveIndex(0);
    } else if (index === 1) {
      navigate("/product")
      setActiveIndex(1);
     // window.location.assign("/product"); // This will navigate and reload the page
    } else if (index == 2) {
       navigate("/pricing")
     setActiveIndex(2);
     // window.location.assign("/pricing");
    } else if (index == 3) {
      navigate("/profile")
      setActiveIndex(3);
     // window.location.assign("/profile");
    }
  };

  function Icon({ index }) {
    if (index == 0) {
      return (
        <ListItemIcon>
          <HomeIcon></HomeIcon>
        </ListItemIcon>
      );
    } else if (index == 1) {
      return (
        <ListItemIcon>
          <SchoolIcon></SchoolIcon>
        </ListItemIcon>
      );
    } else if (index == 2) {
      return (
        <ListItemIcon>
          <AutoStoriesIcon></AutoStoriesIcon>
        </ListItemIcon>
      );
    } else if (index == 3) {
      return (
        <ListItemIcon>
          <PersonIcon></PersonIcon>
        </ListItemIcon>
      );
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <img src="https://picsum.photos/200/30" alt="Logo" style={{ width: '', margin: 'auto', display: 'block' }} /> */}

        <List sx={{ p: 2 }}>
          {["Home", "Explore Courses", "My Courses", "My Profile"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={{
                    backgroundColor:
                      activeIndex === index ? "#1976d2" : "transparent", // Conditional bg color
                    color: activeIndex === index ? "white" : "inherit",
                    "&:hover": {
                      color: "black",
                    }, // Optional: change bg on hover
                  }}
                  onClick={() => handleClick(index)}
                >
                  <Icon index={index} />
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 1 }}
      >
        <Typography sx={{ marginBottom: 2 }}>{props.content}</Typography>
      </Box>
    </Box>
  );
}

export default PermanentDrawerLeft;
