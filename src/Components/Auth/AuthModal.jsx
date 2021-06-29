import React from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Auth from "./Auth";
import AuthModelStore from "../../Store/authModal";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    outline: "none",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: 18,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  span: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

function AuthModal() {
  const classes = useStyles();
  const { authModal, setAuthModel } = AuthModelStore.useContainer();
  const { push } = useHistory();
  const handleClick = () => {
    setAuthModel(false);
    push("/auth/true");
  };
  return (
    <Modal
      open={authModal}
      className={classes.modal}
      onClose={() => setAuthModel(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={authModal}>
        <div className={classes.paper}>
          <Auth modal={true} />
          <p>
            Don't have an account?{" "}
            <span className={classes.span} onClick={handleClick}>
              create an account
            </span>
          </p>
        </div>
      </Fade>
    </Modal>
  );
}

export default AuthModal;
