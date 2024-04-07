import { useState, Fragment, useEffect } from "react";

import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import RemoveCircleOutlineOutlined from "@mui/icons-material/RemoveCircleOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Collapse } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import ConfirmDialog from "../components/ConfirmModal";
import SortBar from "../components/SortBar";
import GroceryItem from "../components/GroceryItem";

import { useData } from "../context/DataContext";

const internals = {};

export default function MainListPage() {
  const { ListHeader, DeleteIcon } = internals;

  const { getAllItems, deleteData, mainList } = useData();

  const [expanded, setExpanded] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [sortDrawer, setSortDrawer] = useState(false);
  const [orderedItems, setOrderedItems] = useState(mainList);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCriteria, setCurrentCriteria] = useState("name");
  const [ascendingOrder, setAscendingOrder] = useState("true");

  const handleToggle = async (id, checked) => {
    const docRef = doc(db, "items", id);

    if (!checked) {
      await updateDoc(docRef, {
        isChecked: true,
      });
    } else {
      await updateDoc(docRef, {
        isChecked: false,
      });
    }
    getAllItems();
  };

  const handleAscendingOrder = (criteria) => {
    if (criteria === currentCriteria) {
      setAscendingOrder((prev) => !prev);
    } else {
      setCurrentCriteria(criteria);
      setAscendingOrder(true);
    }

    handleSort(criteria);
  };

  const handleSort = (criteria) => {
    const sortedList = [...mainList].sort((a, b) => {
      if (a[criteria] < b[criteria]) return ascendingOrder ? -1 : 1;
      if (a[criteria] > b[criteria]) return ascendingOrder ? 1 : -1;
      return 0;
    });

    setOrderedItems(sortedList);
  };

  useEffect(() => {
    handleSort(currentCriteria);
  }, [mainList]);

  useEffect(() => {
    if (mainList.length > 0) {
      setIsLoading(false);
    }
  }, [mainList]);

  const handleUpdateItem = async (action, currentVal, id) => {
    const docRef = doc(db, "items", id);

    if (action === "fav") {
      await updateDoc(docRef, {
        isFavorite: !currentVal,
      });
    }
    if (action === "mainList") {
      await updateDoc(docRef, {
        mainList: !currentVal,
        isChecked: false,
      });
    }
    getAllItems();
  };

  const handleClickDelete = (value) => {
    if (value) {
      deleteData("items", deleteItemId);
    }

    getAllItems();
    setShowDeleteModal(false);
  };

  const handleExpand = (itemId) => {
    setExpanded((prev) => (prev === itemId ? -1 : itemId));
  };

  const handleShowSortDrawer = () => {
    setSortDrawer((prev) => !prev);
  };

  return (
    <>
      <ConfirmDialog
        isOpen={showDeleteModal}
        message={"Delete"}
        onConfirm={handleClickDelete}
      />
      <ListHeader>
        <Typography variant="h5">Main List</Typography>
        <Button onClick={handleShowSortDrawer}>
          Sort <SwapVertIcon />
        </Button>
      </ListHeader>
      <SortBar isOpen={sortDrawer} sort={handleAscendingOrder} />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "50px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {orderedItems
              .filter((item) => item.isChecked === false)
              .map((item) => {
                return (
                  <GroceryItem
                    key={item.id}
                    item={item}
                    expanded={expanded}
                    handleToggle={handleToggle}
                    handleUpdateItem={handleUpdateItem}
                    handleExpand={handleExpand}
                    setDeleteItemId={setDeleteItemId}
                    setShowDeleteModal={setShowDeleteModal}
                    color={item.color}
                  />
                );
              })}
          </List>
          <Typography>Completed</Typography>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {orderedItems
              .filter((item) => item.isChecked === true)
              .map((item) => {
                const labelId = `${item.name}`;

                return (
                  <GroceryItem
                    key={item.id}
                    item={item}
                    expanded={expanded}
                    handleToggle={handleToggle}
                    handleUpdateItem={handleUpdateItem}
                    handleExpand={handleExpand}
                    setDeleteItemId={setDeleteItemId}
                    setShowDeleteModal={setShowDeleteModal}
                    color={item.color}
                  />
                );
              })}
          </List>
        </Box>
      )}
    </>
  );
}

internals.ListHeader = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-inline: 8px;
  padding: 10px 8px 0 15px;
`;

internals.DeleteIcon = styled(IconButton)`
  &:hover {
    color: #ff0000;
  }
`;
