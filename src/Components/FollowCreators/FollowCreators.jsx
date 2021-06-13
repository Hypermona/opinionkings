import React from "react";
import "./followCreators.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { USERS } from "../../data";
import Users from "../../Store/users";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "auto",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function FollowCreators() {
  const classes = useStyles();
  const { users, setUsers } = Users.useContainer();
  React.useEffect(() => {
    setUsers(USERS);
  }, [setUsers]);
  return (
    <div>
      <div className="follow-creator">
        <Typography color="secondary" style={{ fontSize: "1.3rem", fontWeight: 600 }}>
          Follow Creators
        </Typography>
      </div>
      <List className={classes.root} component="nav">
        {users &&
          users.map((u) => (
            <div>
              <ListItem key={u.userName} button>
                <ListItemIcon>
                  <Avatar src={u.profilePic} alt={u.name} />
                </ListItemIcon>
                <ListItemText primary={u.name} secondary={u.userName} />
                <Button
                  size="small"
                  variant="outlined"
                  style={{ color: "#289bd7", borderColor: "#289bd7", borderRadius: 18 }}
                >
                  Follow
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))}
      </List>
    </div>
  );
}

export default FollowCreators;
