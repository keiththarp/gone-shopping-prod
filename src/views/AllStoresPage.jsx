import { useState, Fragment } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RemoveCircleOutlineOutlined from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import ConfirmDialog from "../components/ConfirmModal";
import StoreModal from "../components/modals/StoreModal";

import { useData } from "../context/DataContext";

const internals = {};

export default function AllStoresPage() {
  const { ListHeader, DeleteIcon } = internals;

  const { getAllStores, allStores, deleteData } = useData();

  const [expanded, setExpanded] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [storeId, setStoreId] = useState("");

  const handleUpdateFavorite = async (currentFav, id) => {
    const docRef = doc(db, "stores", id);

    await updateDoc(docRef, {
      isFavorite: !currentFav,
    });
    getAllStores();
  };

  const handleClickDelete = (value) => {
    if (value) {
      deleteData("stores", deleteItemId);
    }

    setShowDeleteModal(false);
    getAllStores();
  };

  const handleEditStore = (id) => {
    setStoreId(id);
    setShowStoreModal(true);
  };

  const handleExpand = (itemId) => () => {
    setExpanded((prev) => (prev === itemId ? -1 : itemId));
  };

  return (
    <>
      <ConfirmDialog
        isOpen={showDeleteModal}
        message={"Delete"}
        onConfirm={handleClickDelete}
      />
      <StoreModal
        isOpen={showStoreModal}
        handleStoreModalIsOpen={setShowStoreModal}
        storeId={storeId}
      />
      <ListHeader>
        <IconButton onClick={() => setShowStoreModal(true)}>
          Add Store
          <AddCircleOutlineOutlinedIcon sx={{ marginLeft: "10px" }} />
        </IconButton>
      </ListHeader>

      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {allStores.map((store) => {
          const labelId = `${store.name}`;

          return (
            <Fragment key={store.id}>
              <ListItem
                key={store.name}
                disablePadding
                sx={{ borderTop: "1px solid #c4c4c4" }}
              >
                <ListItemButton
                  role={undefined}
                  aria-label="comments"
                  onClick={handleExpand(store.id)}
                  dense={true}
                >
                  <ListItemIcon>
                    <CommentIcon />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={store.name} />
                </ListItemButton>
                <IconButton
                  onClick={() =>
                    handleUpdateFavorite(store.isFavorite, store.id)
                  }
                >
                  {store.isFavorite ? (
                    <StarIcon sx={{ color: "#ff0000" }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
                <DeleteIcon
                  onClick={() => {
                    setDeleteItemId(store.id);
                    setShowDeleteModal(true);
                  }}
                >
                  <RemoveCircleOutlineOutlined />
                </DeleteIcon>
              </ListItem>
              <Collapse in={expanded === store.id} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    background: "#f3f3f3",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    position: "relative",
                  }}
                >
                  <IconButton
                    onClick={() => handleEditStore(store.id)}
                    sx={{ position: "absolute", top: "5px", right: "5px" }}
                  >
                    <EditIcon sx={{ color: "000", fontSize: "23px" }} />
                  </IconButton>
                  <p>Abbreviation: {store.abbr}</p>
                  <p>
                    Website:{" "}
                    {store.website ? (
                      <Link
                        to={store.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {store.name}
                      </Link>
                    ) : (
                      "--"
                    )}
                  </p>
                  <p>City: {store.city || "--"}</p>
                  <p>Notes: {store.notes || "--"}</p>
                </Box>
              </Collapse>
            </Fragment>
          );
        })}
      </List>
    </>
  );
}

internals.ListHeader = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-inline: 8px;
  margin-top: 18px;
`;

internals.DeleteIcon = styled(IconButton)`
  &:hover {
    color: #ff0000;
  }
`;
