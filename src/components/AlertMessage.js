import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const AlertMessage = ({handleClose, open = false, message = '', severity = 'success', autoHideDuration = 6000, variant = 'filled'}) => {
  return (
    <>
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert onClose={handleClose} variant={variant} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
    </>
  );
}
  
  export default AlertMessage;