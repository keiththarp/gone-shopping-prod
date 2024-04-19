import { useRef, useState, useEffect } from "react";
import {
  FormControl,
  TextField,
  Button,
  DialogTitle,
  Dialog,
  Box,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Alert from "@mui/material/Alert";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useData } from "../../context/DataContext";

export default function StoreModal({
  isOpen,
  handleStoreModalIsOpen,
  storeId,
}) {
  const nameRef = useRef();
  const notesRef = useRef();
  const cityRef = useRef();
  const webRef = useRef();

  const { getAllStores, allStores } = useData();
  const storeToEdit = allStores.find((store) => store.id === storeId);

  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!!storeToEdit) {
      setFormData((prev) => ({
        ...prev,
        name: storeToEdit.name,
        website: storeToEdit.website,
        city: storeToEdit.city,
        notes: storeToEdit.notes,
      }));
    } else {
      setFormData({});
    }
  }, [storeToEdit]);

  const handleStoreFormChange = () => {
    setFormData((prev) => ({
      ...prev,
      name: nameRef.current.value,
      website: webRef.current.value,
      city: cityRef.current.value,
      notes: notesRef.current.value,
    }));
  };

  const handleEdit = async () => {
    const nameSpace = formData.name.trim();
    if (!nameSpace) {
      setShowAlert(true);
      return;
    }
    const storeRef = doc(db, "stores", storeToEdit.id);

    await updateDoc(storeRef, formData);
    handleStoreModalIsOpen(false);
    getAllStores();
  };

  const handleSave = () => {
    const nameSpace = formData.name.trim();
    if (!nameSpace) {
      setShowAlert(true);
      return;
    }
    addDoc(collection(db, "stores"), formData);

    handleStoreModalIsOpen(false);
    setFormData({});
    getAllStores();
  };

  const handleCancel = () => {
    setShowAlert(false);
    handleStoreModalIsOpen(false);
    setFormData({});
  };

  return (
    <Dialog open={isOpen}>
      {showAlert && (
        <Alert
          severity="warning"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          Name field cannot be blank.
        </Alert>
      )}
      <Box sx={{ padding: "50px", border: "1px solid blue" }}>
        <DialogTitle sx={{ paddingBottom: "10px", textAlign: "center" }}>
          {storeToEdit ? "Edit Store" : "Add a Store"}
        </DialogTitle>
        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleStoreFormChange}
            inputRef={nameRef}
            id="name-input"
            label="Name"
            variant="standard"
            defaultValue={!!storeToEdit ? storeToEdit.name : ""}
          />
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleStoreFormChange}
            inputRef={webRef}
            id="website-input"
            label="Website"
            variant="standard"
            defaultValue={!!storeToEdit ? storeToEdit.website : ""}
          />
        </FormControl>

        <FormControl>
          <Textarea
            onChange={handleStoreFormChange}
            ref={notesRef}
            aria-label="empty textarea"
            placeholder="Notes"
            minRows={3}
            defaultValue={!!storeToEdit ? storeToEdit.notes : ""}
          />
        </FormControl>

        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {storeToEdit ? (
            <Button
              disabled={!formData.name}
              onClick={handleEdit}
              variant="contained"
            >
              SAVE
            </Button>
          ) : (
            <Button
              disabled={!formData.name}
              onClick={handleSave}
              variant="contained"
            >
              SAVE
            </Button>
          )}
          <Button onClick={handleCancel} variant="contained">
            CANCEL
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

const FavoriteBox = styled(Box)`
  align-items: center;
  display: flex;
  margin: 10px 0 0px -10px;
  min-width: 255px;
`;

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  margin-top: 20px;
  box-sizing: border-box;
  width: 255px;
  line-height: 1.5;
  padding: 6px;
  border-radius: 6px 6px 0 6px;
  border: 2px solid #C7D0DD;
  font-size: 16px;

  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &:focus {
    outline: 0;
    border-color: ${theme.palette.primary.main};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
