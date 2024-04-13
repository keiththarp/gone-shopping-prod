import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { useData } from "../context/DataContext";

export default function AddStoreSelect({
  handleChangeStoreSelect,
  existingValue,
}) {
  const { allStores } = useData();
  const [selectedStore, setSelectedStore] = useState(existingValue);
  const handleClick = (storeData) => {
    handleChangeStoreSelect(storeData);
  };
  return (
    <FormControl variant="standard" sx={{ minWidth: "255px" }}>
      <InputLabel id="store-select-label">Preferred Store</InputLabel>
      <Select
        value={selectedStore}
        labelId="store-select-label"
        id="store-select"
        label="Preferred Store"
        onChange={(e) => {
          setSelectedStore(e.target.value);
        }}
      >
        <MenuItem value="none" onClick={handleClick}>
          None
        </MenuItem>
        {allStores.length <= 0 && (
          <MenuItem disabled>Add Stores on Stores page</MenuItem>
        )}
        {allStores.length > 0 &&
          allStores.map((store) => (
            <MenuItem
              key={store.id}
              onClick={() => handleClick({ id: store.id, name: store.name })}
              value={store.name}
            >
              {store.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
