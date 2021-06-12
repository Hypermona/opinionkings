import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import State from "../../Store/state";
import "./postHead.css";
import { USERS } from "../../data";

function PostHead({ userId, dateAndTime }) {
  const state = State.useContainer();
  const { users, setUsers } = state.users;
  React.useEffect(() => {
    setUsers(USERS);
  }, [setUsers]);
  const user = users.filter((u) => u.userName === userId)[0];

  const [anchorEl, setAnchorEl] = React.useState(null);
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
  console.log(dateAndTime);
  const _dateAndTime = new Date(dateAndTime).toLocaleDateString(undefined, options);
  return (
    <>
      {user && (
        <div className="header-container">
          <Avatar src={user.profilePic} alt={user.userName} />
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
              <MenuItem onClick={handleClose}>Report</MenuItem>
              <MenuItem onClick={handleClose}>Not Intrested</MenuItem>
              <MenuItem onClick={handleClose}>Copy Profile</MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
}

export default PostHead;
