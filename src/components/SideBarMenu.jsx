import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";

import ConfirmModal from "./ConfirmModal";
import { useAuth } from "../context/AuthContext";

export default function SideBarMenu({ isOpen, toggleDrawer }) {
  const [showModal, setShowModal] = useState(false);
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowModal(true);
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
      setShowModal((prev) => !prev);
      navigate("/signin");
    } catch {
      console.log("error", currentUser);
    }
    return;
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => {
        toggleDrawer(false);
      }}
    >
      <List>
        <Link to={"/"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText>Main List</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText>Favorites</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <ListItemButton onClick={handleLogoutClick}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </ListItemButton>
    </Box>
  );

  return (
    <>
      <ConfirmModal isOpen={showModal} onConfirm={handleLogoutModal} />
      <Drawer
        open={isOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
