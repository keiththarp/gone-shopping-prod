import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Input,
  Button,
  DialogTitle,
  Dialog,
  Box,
} from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useData } from "../../context/DataContext";

const abbrMaker = (input) => {
  const words = input.trim().split(" ");
  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  } else {
    return words
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
};

export default function StoreModal({
  isOpen,
  handleStoreModalIsOpen,
  storeId,
}) {
  const nameRef = useRef();
  const notesRef = useRef();
  const cityRef = useRef();
  const webRef = useRef();
  const abbrRef = useRef();

  const [abbrValue, setAbbrValue] = useState("");
  const [formData, setFormData] = useState({});
  const { getAllStores, allStores } = useData();

  const handleStoreFormChange = () => {
    if (!storeId) {
      setAbbrValue(abbrMaker(nameRef.current.value));
    }
    setFormData((prev) => ({
      ...prev,
      name: nameRef.current.value,
      abbr: abbrValue,
      website: webRef.current.value,
      city: cityRef.current.value,
      notes: notesRef.current.value,
    }));
    if (!!storeId) {
      setFormData((prev) => ({
        ...prev,
        abbr: abbrRef.current.value.toUpperCase(),
      }));
    }
  };

  const storeToEdit = allStores.find((store) => store.id === storeId);

  const handleEdit = async () => {
    const storeRef = doc(db, "stores", storeToEdit.id);

    await updateDoc(storeRef, formData);
    handleStoreModalIsOpen(false);
    getAllStores();
  };

  const handleSave = () => {
    addDoc(collection(db, "stores"), formData);

    handleStoreModalIsOpen(false);
    setFormData({});
    setAbbrValue("");
    getAllStores();
  };

  return (
    <Dialog open={isOpen}>
      <Box sx={{ padding: "50px", border: "1px solid blue" }}>
        <DialogTitle sx={{ paddingBottom: "10px", textAlign: "center" }}>
          Add a Store
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
            id="abbr-input"
            onChange={storeId ? handleStoreFormChange : null}
            inputRef={abbrRef}
            variant="standard"
            InputProps={
              !storeToEdit
                ? {
                    readOnly: true,
                  }
                : null
            }
            label="Abbreviation"
            placeholder="Abbreviation"
            defaultValue={!!storeToEdit ? storeToEdit.abbr : abbrValue}
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

        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleStoreFormChange}
            inputRef={cityRef}
            id="city-input"
            label="City"
            variant="standard"
            defaultValue={!!storeToEdit ? storeToEdit.city : ""}
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
            <Button onClick={handleEdit} variant="contained">
              SAVE
            </Button>
          ) : (
            <Button onClick={handleSave} variant="contained">
              SAVE
            </Button>
          )}
          <Button
            onClick={() => handleStoreModalIsOpen(false)}
            variant="contained"
          >
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
