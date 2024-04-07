import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

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
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

import AddStoreSelect from "./AddStoreSelect";
import AddAisleSelect from "./AddAisleSelect";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useData } from "../context/DataContext";

export default function AddItemModal({ isOpen, handleAddItemIsOpen }) {
  const nameRef = useRef();
  const priceRef = useRef();
  const notesRef = useRef();
  const flavorRef = useRef();

  const [formData, setFormData] = useState({ key: "value" });
  const [isFavorite, setIsFavorite] = useState(false);
  const { getAllItems } = useData();

  const onMainList = useLocation().pathname === "/";

  const handleAddItemFormChange = () => {
    setFormData((prev) => ({
      ...prev,
      name: nameRef.current.value,
      flavor: flavorRef.current.value,
      isFavorite: isFavorite,
      mainList: onMainList,
      price: priceRef.current.value,
      notes: notesRef.current.value,
    }));
  };

  const handleSave = () => {
    addDoc(collection(db, "items"), formData);

    handleAddItemIsOpen(false);
    getAllItems();
  };

  const handleChangeStoreSelect = (storeData) => {
    setFormData((prev) => ({
      ...prev,
      storeData,
    }));
  };

  const handleChangeAisleSelect = (aisleData) => {
    setFormData((prev) => ({
      ...prev,
      aisleData,
    }));
  };

  return (
    <Dialog open={isOpen}>
      <Box sx={{ padding: "50px", border: "1px solid blue" }}>
        <DialogTitle sx={{ paddingBottom: "10px", textAlign: "center" }}>
          Add an Item
        </DialogTitle>
        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleAddItemFormChange}
            inputRef={nameRef}
            id="outlined-basic"
            label="Name"
            variant="standard"
          />
        </FormControl>
        <FavoriteBox onClick={() => setIsFavorite((prev) => !prev)}>
          <IconButton>
            {isFavorite ? (
              <StarIcon sx={{ color: "#ff0000" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
          <Typography> Mark as Favorite! </Typography>
        </FavoriteBox>

        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleAddItemFormChange}
            inputRef={flavorRef}
            id="outlined-basic"
            label="Type/Flavor"
            variant="standard"
          />
        </FormControl>
        <AddAisleSelect handleChangeAisleSelect={handleChangeAisleSelect} />
        <AddStoreSelect handleChangeStoreSelect={handleChangeStoreSelect} />
        <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
          <Input
            onChange={handleAddItemFormChange}
            inputRef={priceRef}
            id="standard-adornment-amount"
            placeholder="Current Price"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <FormControl>
          <Textarea
            onChange={handleAddItemFormChange}
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
            onClick={() => handleAddItemIsOpen(false)}
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
