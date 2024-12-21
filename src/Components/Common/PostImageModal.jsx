import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SelectImage from "./SelectImage";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PostImageModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // // console.log(props.previewImg);
  return (
    <div>
      <div onClick={handleOpen} style={{ margin: props.cropShape === "round" ? "40px 0 0 0" : 0 }}>
        {props.previewImg ? (
          <img
            src={props.previewImg}
            height="100px"
            alt="imag"
            style={{ borderRadius: props.cropShape === "round" ? "50%" : 0 }}
          />
        ) : (
          <props.image style={{ fontSize: "5rem" }} />
        )}
        <p style={{ margin: 0, fontSize: "0.7rem", textAlign: "center" }}>Tap to change</p>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <SelectImage {...props} closeModal={handleClose} />
        </Fade>
      </Modal>
    </div>
  );
}
