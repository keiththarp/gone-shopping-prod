import { useRef, useState } from "react";
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

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useData } from "../context/DataContext";

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

export default function StoreModal({ isOpen, handleStoreModalIsOpen }) {
  const nameRef = useRef();
  const abbrRef = useRef("treat");
  const notesRef = useRef();
  const cityRef = useRef();

  const [abbrValue, setAbbrValue] = useState();
  const [formData, setFormData] = useState({});
  const { getAllStores } = useData();

  let abv;

  const handleStoreFormChange = () => {
    setFormData((prev) => ({
      ...prev,
      name: nameRef.current.value,
      abbr: abbrRef.current.value,
      city: cityRef.current.value,
      notes: notesRef.current.value,
    }));

    abv = abbrMaker(nameRef.current.value);
    setAbbrValue(abv);
  };

  const handleSave = () => {
    addDoc(collection(db, "stores"), formData);

    handleStoreIsOpen(false);
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
            id="outlined-basic"
            label="Name"
            variant="standard"
          />
        </FormControl>

        <FormControl
          size="small"
          sx={{ paddingTop: "17px", minWidth: "255px" }}
        >
          <TextField
            id="abbr-input"
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
            label="Abbreviation"
            placeholder="Abbreviation"
            value={abbrValue}
          />
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleStoreFormChange}
            inputRef={cityRef}
            id="outlined-basic"
            label="City"
            variant="standard"
          />
        </FormControl>

        <FormControl>
          <Textarea
            onChange={handleStoreFormChange}
            ref={notesRef}
            aria-label="empty textarea"
            placeholder="Notes"
            minRows={3}
          />
        </FormControl>

        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button onClick={handleSave} variant="contained">
            SAVE
          </Button>
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
