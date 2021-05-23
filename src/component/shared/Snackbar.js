import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({open, type, message, setOpen}) {
  const classes = useStyles();


  const handleClick = () => {
    setOpen({open: true});
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({open: false});
  };

  return (
    <div className={classes.root}>
      <Snackbar
        // anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity={type} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}



