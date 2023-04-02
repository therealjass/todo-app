import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type IProps = {
  isTokenExpired: boolean;
  homeAllowed: boolean;
  setIsTokenExpired: (val: boolean) => void
}

const ExpireTokenDialog = (props: IProps) => {
  const navigate: any = useNavigate();
  const dispatch: any = useDispatch();

  let g_isTokenExpired: any = useSelector((state: any) => {

    if (props?.homeAllowed) {
      return props?.isTokenExpired;
    }

    return state?.authReducer?.isTokenExpired
  });

  const handleReLogin = () => {
    // if (g_isTokenExpired) {
    //   if (props?.homeAllowed) {
    //     props?.setIsTokenExpired(false);
    //   }
    //   localStorage.clear();
    //   navigate("/");
    //   dispatch(setTokenExpiredStatusAction(false));

    // }
  }

  return (
    <Dialog
      open={g_isTokenExpired}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      sx={{
        zIndex: "9999999"
      }}
    >
      <DialogTitle>Session Expired!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Hey! your session has been expired. Please do Re-login your application.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleReLogin()}>Re-login</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ExpireTokenDialog;