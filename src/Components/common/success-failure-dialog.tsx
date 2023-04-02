import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch, useSelector } from "react-redux";
import { handleDialogAction } from "../../Store/todo/todo-action";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type SFDialogProps = {
  open: boolean;
  title: string;
  content: string;
}

const SuccessFailureDialog = () => {
  const dispatch = useDispatch()
  const props: SFDialogProps = useSelector((state: any) => state?.todoReducer?.dialog?.data)

  return (
    <Dialog
      open={props?.open ? props?.open : false}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      sx={{
        zIndex: "9999999"
      }}
    >
      <DialogTitle>{props?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props?.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          dispatch(handleDialogAction({
            open: false,
            title: "",
            content: ""
          }))

        }}>okay</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SuccessFailureDialog;