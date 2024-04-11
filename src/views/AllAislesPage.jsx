import { useState, Fragment } from "react";

import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SquareIcon from "@mui/icons-material/Square";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import Tooltip from "@mui/material/Tooltip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import ConfirmDialog from "../components/ConfirmModal";
import AisleModal from "../components/modals/AisleModal";

import { useData } from "../context/DataContext";

const internals = {};

export default function AllAislesPage() {
  const { ListHeader, DeleteIcon } = internals;

  const { getAllAisles, allAisles, deleteData } = useData();

  const [expanded, setExpanded] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAisleModal, setShowAisleModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");
  const [aisleId, setAisleId] = useState("");

  const handleUpdateFavorite = async (currentFav, id) => {
    const docRef = doc(db, "aisles", id);

    await updateDoc(docRef, {
      isFavorite: !currentFav,
    });
    getAllAisles();
  };

  const handleClickDelete = (value) => {
    if (value) {
      deleteData("aisles", deleteItemId);
    }

    setShowDeleteModal(false);
    getAllAisles();
  };

  const handleAisleModal = (id) => {
    setAisleId(id);
    setShowAisleModal(true);
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
      <AisleModal
        isOpen={showAisleModal}
        handleAisleModalIsOpen={setShowAisleModal}
        aisleId={aisleId}
      />
      <ListHeader>
        <IconButton onClick={handleAisleModal}>
          Add Aisle
          <AddCircleOutlineOutlinedIcon sx={{ marginLeft: "10px" }} />
        </IconButton>
      </ListHeader>

      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {allAisles.map((aisle) => {
          const labelId = `${aisle.name}`;

          return (
            <Fragment key={aisle.id}>
              <ListItem
                key={aisle.name}
                disablePadding
                sx={{ borderTop: "1px solid #c4c4c4" }}
              >
                <Tooltip title={"delete"}>
                  <DeleteIcon
                    onClick={() => {
                      setDeleteItemId(aisle.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <HighlightOffIcon />
                  </DeleteIcon>
                </Tooltip>
                <ListItemButton
                  role={undefined}
                  aria-label="comments"
                  onClick={handleExpand(aisle.id)}
                  dense={true}
                >
                  <ListItemText id={labelId} primary={aisle.name} />
                </ListItemButton>
                <IconButton
                  onClick={() =>
                    handleUpdateFavorite(aisle.isFavorite || false, aisle.id)
                  }
                >
                  {aisle.isFavorite ? (
                    <StarIcon sx={{ color: "#ff0000" }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
                <IconButton onClick={handleExpand(aisle.id)}>
                  <CommentIcon />
                </IconButton>
              </ListItem>
              <Collapse in={expanded === aisle.id} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    background: "#f3f3f3",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    position: "relative",
                  }}
                >
                  <Tooltip title={"edit"}>
                    <IconButton
                      onClick={() => handleAisleModal(aisle.id)}
                      sx={{ position: "absolute", top: "5px", right: "5px" }}
                    >
                      <EditIcon sx={{ color: "000", fontSize: "23px" }} />
                    </IconButton>
                  </Tooltip>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Accent Color:{"  "}
                    <SquareIcon
                      sx={{
                        color: `rgb(${aisle.accentColor})`,
                        marginLeft: "10px",
                      }}
                    />
                  </Box>
                  <p>Notes: {aisle.notes}</p>
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
