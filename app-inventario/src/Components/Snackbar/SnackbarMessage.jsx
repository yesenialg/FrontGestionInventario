import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarMessage = (props) => {

    const { openSnackbar, handleSnackbarClose, snackbarMessage, snackbarSeverity } = props;
    
  return (
    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarMessage;