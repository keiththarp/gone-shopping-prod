import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import SideBarMenu from "./SideBarMenu";
import useIconMaker from "../utils/useIconMaker";
import ConfirmModal from "./ConfirmModal";

import { useAuth } from "../context/AuthContext";

export default function MenuAppBar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const { currentUser, displayName, logout } = useAuth();
  const iconName = useIconMaker(displayName);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("#");
  };

  const handleLogoutClick = () => {
    setShowModal(true);
    setAnchorEl(null);
  };

  const handleLogoutModal = async (confirmLogout) => {
    console.log(confirmLogout, " handle logout");
    if (!confirmLogout) {
      setShowModal((prev) => !prev);
      console.log("cancel");
      return;
    }
    try {
      await logout();
      setAnchorEl(null);
      setShowModal((prev) => !prev);
      navigate("/signin");
    } catch {
      console.log("error", currentUser);
    }
    return;
  };

  const handleSideBarMenuClick = (value) => {
    setSideBarIsOpen(value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SideBarMenu
        isOpen={sideBarIsOpen}
        toggleDrawer={handleSideBarMenuClick}
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={() => {
                handleSideBarMenuClick(true);
              }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Gone Shopping {currentUser ? currentUser.displayName : "nobody"}
            </Typography>

            <ConfirmModal isOpen={showModal} onConfirm={handleLogoutModal} />

            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {displayName ? (
                    <Avatar {...iconName} />
                  ) : (
                    <AccountCircleIcon fontSize="large" />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
