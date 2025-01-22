import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function CustomSnackbar ({
  open,
  message,
  severity = "success",
  duration = 6000,
  onClose,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
}){
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
