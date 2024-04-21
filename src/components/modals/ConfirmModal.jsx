import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

import { useVisibility } from "../../context/VisibilityContext";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

export default function ConfirmDialog(props) {
  const {
    showConfirmModal,
    setShowConfirmModal,
    itemToEditId,
    collectionToEdit,
    confirmMessage,
  } = useVisibility();
  const { deleteData, getAllStores, getAllAisles, getAllItems } = useData();
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const handleClose = async (value) => {
    if (value && confirmMessage === "Delete") {
      deleteData(collectionToEdit, itemToEditId);

      switch (collectionToEdit) {
        case "items":
          getAllItems();
          break;
        case "stores":
          getAllStores();
          break;
        case "aisles":
          getAllAisles();
          break;
        default:
          console.log("Unknown collection");
      }
    } else if (value && confirmMessage === "Logout") {
      try {
        await logout();
        navigate("/signin");
      } catch {
        console.log("error", currentUser);
      }
    }
    setShowConfirmModal(false);
  };

  return (
    <Dialog open={showConfirmModal}>
      <Box sx={{ padding: "50px", border: "1px solid blue" }}>
        <DialogTitle sx={{ paddingBottom: "30px" }}>
          Continue with {confirmMessage || "Action"}?
        </DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onClick={() => handleClose(true)}>Confirm</Button>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
        </Box>
      </Box>
    </Dialog>
  );
}
