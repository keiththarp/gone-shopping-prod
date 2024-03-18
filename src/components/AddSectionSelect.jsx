import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useData } from "../context/DataContext";

export default function AddSectionSelect({ handleChangeSectionSelect }) {
  const { allSections } = useData();
  const [selectedSection, setSelectedSection] = useState("");
  const handleClick = (sectionData) => {
    handleChangeSectionSelect(sectionData);
  };
  return (
    <FormControl variant="standard" sx={{ minWidth: "255px" }}>
      <InputLabel id="section-select-label">Section</InputLabel>
      <Select
        value={selectedSection}
        labelId="section-select-label"
        id="section-select"
        label="Section"
        onChange={(e) => {
          setSelectedSection(e.target.value);
        }}
      >
        {allSections.map((section) => (
          <MenuItem
            key={section.id}
            onClick={() => handleClick({ id: section.id, name: section.name })}
            value={section.name}
          >
            {section.name}
          </MenuItem>
        ))}
        <MenuItem onClick={() => console.log("clicked")}>
          <IconButton>
            <AddCircleOutlineOutlinedIcon
              sx={{ fontSize: 30, paddingRight: "10px" }}
            />
          </IconButton>
          Add New Section
        </MenuItem>
      </Select>
    </FormControl>
  );
}
