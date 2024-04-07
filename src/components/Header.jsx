import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import SideBarMenu from "./SideBarMenu";
import AddItemModal from "../components/AddItemModal";
import useIconMaker from "../utils/useIconMaker";

import { useAuth } from "../context/AuthContext";
import { useVisibility } from "../context/VisibilityContext";

export default function MenuAppBar() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const [addItemIsOpen, setAddItemIsOpen] = useState(false);

  const { currentUser, displayName } = useAuth();
  const { handleStoreModalIsOpen, storeModalIsOpen } = useVisibility();
  const iconName = useIconMaker(displayName);

  const handleSideBarMenuClick = (value) => {
    setSideBarIsOpen(value);
  };

  return (
    <>
      <SideBarMenu
        isOpen={sideBarIsOpen}
        toggleDrawer={handleSideBarMenuClick}
      />
      <AddItemModal
        isOpen={addItemIsOpen}
        handleAddItemIsOpen={setAddItemIsOpen}
      />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            {currentUser && (
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
            )}
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Gone Shopping
            </Typography>
            <IconButton onClick={() => setAddItemIsOpen(true)}>
              <AddCircleOutlineOutlinedIcon
                sx={{ fontSize: 50, paddingRight: "10px", color: "#FFF" }}
              />
            </IconButton>

            {displayName ? (
              <Avatar {...iconName} />
            ) : (
              <AccountCircleIcon fontSize="large" />
            )}
          </Toolbar>
        </AppBar>
        <Toolbar>{/* content */}</Toolbar>
      </Box>
    </>
  );
}
