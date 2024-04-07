import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/system";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import ConfirmModal from "./ConfirmModal";
import ListMenuItem from "./ListMenuItem";
import { useAuth } from "../context/AuthContext";

const internals = {};

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
      await new Promise((resolve) => setTimeout(resolve, 250));
      // navigate("/signin");
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
        <ListMenuItem link="/" icon="cart" title="Main List" />
      </List>

      <Divider />
      <ListMenuItem link="/all-items" icon="list" title="Pantry" />
      <SectionBox>
        <Typography>Add/Edit</Typography>
      </SectionBox>
      <List>
        <ListMenuItem link="/all-stores" icon="store" title="Stores" />
      </List>
      <List>
        <ListMenuItem link="/all-aisles" icon="store" title="Aisles" />
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

const SectionBox = styled(Box)`
  color: #fff;
  text-align: center;
  background: ${({ theme }) => theme.palette.primary.main};
`;
