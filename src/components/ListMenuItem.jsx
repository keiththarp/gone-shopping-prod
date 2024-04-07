import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChecklistIcon from "@mui/icons-material/Checklist";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ListItemButton from "@mui/material/ListItemButton";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

export default function ListMenuItem({ link, icon, title }) {
  const mapItemToIcon = () => {
    let itemIcon;

    switch (icon) {
      case "fav":
        itemIcon = <FavoriteIcon />;
        break;
      case "cart":
        itemIcon = <LocalGroceryStoreIcon />;
        break;
      case "list":
        itemIcon = <ChecklistIcon />;
        break;
      case "store":
        itemIcon = <StorefrontIcon />;
        break;
      default:
        itemIcon = <ChecklistIcon />;
    }
    return itemIcon;
  };

  return (
    <Link to={link} style={{ textDecoration: "none", color: "#757575" }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{mapItemToIcon(icon)}</ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
