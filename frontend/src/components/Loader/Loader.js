import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function Loader() {


  return (
    <div>
     
      <Backdrop
        sx={{ color: '#fff', background:'#ddd', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
       
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}