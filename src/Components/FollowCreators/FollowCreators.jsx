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
import { useTheme } from "@material-ui/core/styles";
import Error from "../Errors/Error";
import Typography from "@material-ui/core/Typography";
import Users from "../../Store/users";
import { useMutation } from "urql";
import { GET_USERS, UPDATE_FOLLOW } from "../../Queries/User";
import token from "../../Store/token";
import useOnceQuery from "../../hooks/useOnceQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "auto",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function FollowCreators() {
  const theme = useTheme();
  const [usersResult] = useOnceQuery({ query: GET_USERS });
  const classes = useStyles();
  const { users, setUsers } = Users.useContainer();
  const { getUser, updateFollowing } = token.useContainer();
  const [_, follow] = useMutation(UPDATE_FOLLOW);
  const currentUser = getUser();
  React.useEffect(() => {
    setUsers(usersResult);
  }, [setUsers, usersResult]);


  async function onFollow(id) {
    const user = await follow({ followerId: id });
    updateFollowing(user.data?.updateFollowers?.following);
  }
  return (
    <div>
      <div className="follow-creator" style={{ background: theme.palette.primary.main }}>
        <Typography color="secondary" style={{ fontSize: "1.3rem", fontWeight: 600 }}>
          Follow Creators
        </Typography>
      </div>
      <List className={classes.root} component="nav">
        {users.fetching ? (
          <div>Loading...</div>
        ) : users.data ? (
          users.data.users.map(
            (u) =>
              u.id !== currentUser.id && (
                <div key={u.userName}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar src={u.image} alt={u.name} />
                    </ListItemIcon>
                    <ListItemText primary={u.name} secondary={"@" + u.userName} style={{whiteSpace:"nowrap"}} />
                    <Button
                      onClick={()=>onFollow(u.id)}
                      size="small"
                      variant="outlined"
                      style={{ color: "#289bd7", borderColor: "#289bd7", borderRadius: 18,minWidth:100 }}
                    >
                      {currentUser?.following?.includes(u.id)?"Unfollow": "Follow"}
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              )
          )
        ) : (
          <Error />
        )}
      </List>
    </div>
  );
}

export default React.memo(FollowCreators);
