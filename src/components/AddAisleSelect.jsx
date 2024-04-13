import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { useData } from "../context/DataContext";

export default function AddAisleSelect({
  handleChangeAisleSelect,
  existingValue,
}) {
  const { allAisles } = useData();
  const [selectedAisle, setSelectedAisle] = useState(existingValue);

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
        <MenuItem value="none" onClick={handleClick}>
          None
        </MenuItem>
        {allAisles.length <= 0 && (
          <MenuItem disabled>Add aisles on aisles page</MenuItem>
        )}
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
      </Select>
    </FormControl>
  );
}
