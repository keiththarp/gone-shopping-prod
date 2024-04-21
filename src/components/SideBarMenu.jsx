import { Link } from "react-router-dom";

import { styled } from "@mui/system";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import ListMenuItem from "./ListMenuItem";
import { useData } from "../context/DataContext";
import { useVisibility } from "../context/VisibilityContext";

const internals = {};

export default function SideBarMenu({ isOpen, toggleDrawer }) {
  const { allStores } = useData();
  const { handleConfirmModal } = useVisibility();

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
      <Box
        sx={{
          marginLeft: "55px",
          marginTop: "15px",
          marginBottom: "-5px",
        }}
      >
        <Typography>Lists By Store</Typography>
      </Box>
      <List dense>
        {allStores.map((store) => {
          return (
            <ListItemButton
              key={store.id}
              component={Link}
              to={`/store-list?store=${store.id}&storeName=${store.name}`}
            >
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText>{store.name}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>

      <Divider />
      <SectionBox>
        <Typography>Add/Edit</Typography>
      </SectionBox>
      <List>
        <ListMenuItem link="/all-items" icon="list" title="Pantry" />
        <ListMenuItem link="/all-stores" icon="store" title="Stores" />
        <ListMenuItem link="/all-aisles" icon="store" title="Aisles" />
      </List>

      <Divider />

      <ListItemButton onClick={() => handleConfirmModal(true, "Logout")}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </ListItemButton>
    </Box>
  );

  return (
    <>
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
