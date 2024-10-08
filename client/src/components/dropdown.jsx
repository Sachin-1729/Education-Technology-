import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { People as PeopleIcon, Mail as MailIcon } from '@mui/icons-material';

function Sidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  // Handle opening main menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing all menus
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSubMenuAnchorEl(null);
    setOpenSubMenu(false);
  };

  // Handle opening submenu
  const handleSubMenuClick = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
    setOpenSubMenu(true);
  };

  // Handle closing submenu
  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
    setOpenSubMenu(false);
  };

  return (
    <div>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </ListItem>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSubMenuClick}>Memberships</MenuItem>
        <MenuItem onClick={handleMenuClose}>Send Email</MenuItem>
        <MenuItem onClick={handleMenuClose}>Drafts</MenuItem>

        {/* Submenu */}
        <Menu
          anchorEl={subMenuAnchorEl}
          open={openSubMenu}
          onClose={handleSubMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleSubMenuClose}>Submenu Item 1</MenuItem>
          <MenuItem onClick={handleSubMenuClose}>Submenu Item 2</MenuItem>
          <MenuItem onClick={handleSubMenuClose}>Submenu Item 3</MenuItem>
        </Menu>
      </Menu>
    </div>
  );
}

export default Sidebar;
