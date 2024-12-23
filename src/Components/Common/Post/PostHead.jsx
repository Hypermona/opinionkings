import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Users from "../../Store/users";
import "./postHead.css";
import { Snackbar } from "@material-ui/core";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import token from "../../../Store/token";

// import { USERS } from "../../data";

function PostHead({ user, dateAndTime,postId }) {
  const { getUser } = token.useContainer();
  const currentUser = getUser()
  // React.useEffect(() => {
  //   setUsers(USERS);
  // }, [setUsers]);
  // const user = users.filter((u) => u.userName === userId)[0];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minuite: "numeric",
  };

  const _dateAndTime = new Date(Number(dateAndTime)).toLocaleDateString(undefined, options);

  function onCopyProfile(){
    navigator.clipboard.writeText("http://localhost:3000/" + user.id);
    setShowToast(true);
    handleClose()
  }
  function onEditPost() {
    history.push("/edit/"+postId)
    handleClose();
  }
  function handleCloseToast() {
    setShowToast(false);
  }
  return (
    <>
      {user && (
        <div className="header-container">
          <Avatar src={user.image} alt={user.userName} />
          <div className="head-main">
            <div className="head-about">
              <p className="name">
                {user.name}
                <Tooltip title="verified" placement="right-start">
                  <CheckCircleIcon className="check-badge" style={{ color: "#289bd7" }} />
                </Tooltip>
              </p>
              <p className="user-name">@{user.userName}</p>
            </div>
            <p className="date-time">{_dateAndTime}</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {currentUser?.id===user.id &&<MenuItem onClick={onEditPost}>Edit Post</MenuItem>}
              <MenuItem onClick={onCopyProfile}>Copy Profile</MenuItem>
            </Menu>
            <Snackbar
              open={showToast}
              autoHideDuration={3000}
              onClose={handleCloseToast}
              message="Link Copied"
              // action={action}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PostHead;
