import { useRef, useState } from "react";
import {
  FormControl,
  TextField,
  IconButton,
  Button,
  DialogTitle,
  Dialog,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SquareIcon from "@mui/icons-material/Square";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useData } from "../../context/DataContext";

const colors = [
  "217, 30, 30",
  "217, 95, 20",
  "217, 164, 20",
  "217, 214, 20",
  "181, 217, 20",
  "99, 217, 20",
  "128,128,0",
  "25, 150, 50",
  "20, 217, 171",
  "19, 125, 133",
  "24, 136, 201",
  "24, 45, 201",
  "112, 24, 201",
  "139,69,19",
  "190, 190, 190",
  "0, 0, 0",
];

export default function AisleModal({
  isOpen,
  handleAisleModalIsOpen,
  aisleId,
}) {
  const nameRef = useRef();
  const notesRef = useRef();

  const [formData, setFormData] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [accentColor, setAccentColor] = useState("rgb(255,255,255)");

  const { getAllAisles, allAisles } = useData();

  const handleAisleFormChange = () => {
    setFormData((prev) => ({
      ...prev,
      name: nameRef.current.value,
      isFavorite: isFavorite,
      accentColor: accentColor,
      notes: notesRef.current.value,
    }));
  };

  const aisleToEdit = allAisles.find((aisle) => aisle.id === aisleId);

  const handleEdit = async () => {
    const storeRef = doc(db, "stores", storeToEdit.id);

    await updateDoc(storeRef, formData);
    handleAisleModalIsOpen(false);
    getAllAisles();
  };

  const handleSave = () => {
    addDoc(collection(db, "aisles"), formData);

    handleAisleModalIsOpen(false);
    setFormData({});
    getAllAisles();
  };

  return (
    <Dialog open={isOpen}>
      <Box sx={{ padding: "50px", border: "1px solid blue" }}>
        <DialogTitle sx={{ paddingBottom: "10px", textAlign: "center" }}>
          Add an Aisle
        </DialogTitle>
        <FormControl size="small" sx={{ minWidth: "255px" }}>
          <TextField
            onChange={handleAisleFormChange}
            inputRef={nameRef}
            id="name-input"
            label="Name"
            variant="standard"
            defaultValue={!!aisleToEdit ? aisleToEdit.name : ""}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "12px",
            marginLeft: "-10px",
          }}
        >
          <IconButton onClick={() => setIsFavorite((prev) => !prev)}>
            {isFavorite ? (
              <StarIcon sx={{ color: "#ff0000" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
          Favorite?
        </Box>
        <Grid container spacing={1}>
          {colors.map((color, index) => (
            <Grid item xs={3} key={index}>
              <SquareIcon
                onClick={() => setAccentColor(color)}
                sx={{
                  color:
                    color === accentColor
                      ? `rgb(${color})`
                      : `rgb(${color}, 0.5)`,
                  cursor: "pointer",
                  border:
                    color === accentColor ? `3px solid rgb(${color})` : "none",
                  "&:hover": {
                    color: `rgba(${color}, 1)`,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <FormControl>
          <Textarea
            onChange={handleAisleFormChange}
            ref={notesRef}
            aria-label="empty textarea"
            placeholder="Notes"
            minRows={3}
            defaultValue={!!aisleToEdit ? aisleToEdit.notes : ""}
          />
        </FormControl>

        <Box
          sx={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {aisleToEdit ? (
            <Button onClick={handleEdit} variant="contained">
              SAVE
            </Button>
          ) : (
            <Button onClick={handleSave} variant="contained">
              SAVE
            </Button>
          )}
          <Button
            onClick={() => handleAisleModalIsOpen(false)}
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
