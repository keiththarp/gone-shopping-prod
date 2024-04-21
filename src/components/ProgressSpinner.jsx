import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ProgressSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "50px",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
