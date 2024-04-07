import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useData } from "../context/DataContext";

export default function AddAisleSelect({ handleChangeAisleSelect }) {
  const { allAisles } = useData();
  const [selectedAisle, setSelectedAisle] = useState("");
  const handleClick = (aisleData) => {
    handleChangeAisleSelect(aisleData);
  };
  return (
    <FormControl variant="standard" sx={{ minWidth: "255px" }}>
      <InputLabel id="aisle-select-label">Aisle</InputLabel>
      <Select
        value={selectedAisle}
        labelId="Aisle-select-label"
        id="aisle-select"
        label="Aisle"
        onChange={(e) => {
          setSelectedAisle(e.target.value);
        }}
      >
        {allAisles.map((aisle) => (
          <MenuItem
            key={aisle.id}
            onClick={() =>
              handleClick({
                id: aisle.id,
                name: aisle.name,
                accentColor: aisle.accentColor,
              })
            }
            value={aisle.name}
          >
            {aisle.name}
          </MenuItem>
        ))}
        <MenuItem onClick={() => console.log("clicked")}>
          <IconButton>
            <AddCircleOutlineOutlinedIcon
              sx={{ fontSize: 30, paddingRight: "10px" }}
            />
          </IconButton>
          Add New Aisle
        </MenuItem>
      </Select>
    </FormControl>
  );
}
