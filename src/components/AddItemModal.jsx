import { useRef, useState, useEffect } from "react";

import {
  FormControl,
  TextField,
  InputAdornment,
  Input,
  Button,
  DialogTitle,
  Dialog,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

import AddStoreSelect from "./AddStoreSelect";
import AddAisleSelect from "./AddAisleSelect";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useData } from "../context/DataContext";

export default function AddItemModal({ isOpen, handleAddItemIsOpen, itemId }) {
  const nameRef = useRef();
  const priceRef = useRef();
  const notesRef = useRef();
  const flavorRef = useRef();

  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const { getAllItems, allItems } = useData();
  const itemToEdit = allItems.find((item) => item.id === itemId);
  useEffect(() => {
    if (!!itemToEdit) {
      setFormData((prev) => ({
        ...prev,
        name: itemToEdit.name,
        flavor: itemToEdit.flavor,
        mainList: itemToEdit.mainList,
        price: itemToEdit.price,
        notes: itemToEdit.notes,
      }));
    } else {
      setFormData({});
    }
  }, [itemToEdit]);

  const handleAddItemFormChange = () => {
    setFormData((prev) => ({
      ...prev,
      name: nameRef.current.value,
      flavor: flavorRef.current.value,
      mainList: checked,
      price: priceRef.current.value,
      notes: notesRef.current.value,
    }));
  };

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
    handleAddItemFormChange();
  };

  const handleEdit = async () => {
    const nameSpace = formData.name.trim();
    if (!nameSpace) {
      setShowAlert(true);
      setFormData((prev) => ({
        ...prev,
        name: "",
      }));
      return;
    }
    const itemRef = doc(db, "items", itemToEdit.id);

    await updateDoc(itemRef, formData);
    handleAddItemIsOpen(false);
    getAllItems();
  };

  const handleSave = async () => {
    const nameSpace = formData.name.trim();
    if (!nameSpace) {
      setShowAlert(true);
      setFormData((prev) => ({
        ...prev,
        name: "",
      }));
      return;
    }
    await addDoc(collection(db, "items"), formData);

    handleAddItemIsOpen(false);
    getAllItems();
    setChecked(true);
  };

  const handleChangeStoreSelect = (storeData) => {
    setFormData((prev) => ({
      ...prev,
      preferredStoreId: storeData.id,
      preferredStoreName: storeData.name,
    }));
  };

  const handleChangeAisleSelect = (aisleData) => {
    if (!aisleData) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      aisleName: aisleData.name,
      aisleAccentColor: aisleData.accentColor,
      aisleId: aisleData.id,
    }));
  };

  const handleCancel = () => {
    setShowAlert(false);
    handleAddItemIsOpen(false);
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
          Add an Item
        </DialogTitle>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheckChange} />}
          label="Include in Main List"
        />
        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleAddItemFormChange}
            inputRef={nameRef}
            id="outlined-basic"
            label="Name"
            variant="standard"
            defaultValue={!!itemToEdit ? itemToEdit.name : ""}
          />
        </FormControl>

        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleAddItemFormChange}
            inputRef={flavorRef}
            id="outlined-basic"
            label="Type/Flavor"
            variant="standard"
            defaultValue={!!itemToEdit ? itemToEdit.flavor : ""}
          />
        </FormControl>
        <AddAisleSelect
          existingValue={!!itemToEdit ? itemToEdit.aisleName : ""}
          handleChangeAisleSelect={handleChangeAisleSelect}
        />
        <AddStoreSelect
          existingValue={!!itemToEdit ? itemToEdit.preferredStoreName : ""}
          handleChangeStoreSelect={handleChangeStoreSelect}
        />
        <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
          <Input
            onChange={handleAddItemFormChange}
            inputRef={priceRef}
            id="standard-adornment-amount"
            placeholder="Current Price"
            defaultValue={!!itemToEdit ? itemToEdit.price : ""}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <FormControl>
          <Textarea
            onChange={handleAddItemFormChange}
            ref={notesRef}
            aria-label="empty textarea"
            placeholder="Notes"
            defaultValue={!!itemToEdit ? itemToEdit.notes : ""}
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
          <Button
            disabled={!formData.name}
            onClick={itemToEdit ? handleEdit : handleSave}
            variant="contained"
          >
            SAVE
          </Button>
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
