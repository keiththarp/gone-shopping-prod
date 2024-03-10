import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

export default function ConfirmDialog(props) {
  const { onConfirm, isOpen } = props;

  const handleClose = (confirmLogout) => {
    console.log(confirmLogout);
    onConfirm(confirmLogout);
  };

  return (
    <Dialog open={isOpen}>
      <Box sx={{ padding: "50px", border: "1px solid blue" }}>
        <DialogTitle sx={{ paddingBottom: "30px" }}>
          Continue with Log out?
        </DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onClick={() => handleClose(true)}>Confirm</Button>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
        </Box>
      </Box>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
