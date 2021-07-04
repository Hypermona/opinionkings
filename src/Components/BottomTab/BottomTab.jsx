import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EmailIcon from "@material-ui/icons/Email";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import AddCommentIcon from "@material-ui/icons/AddComment";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import CreatePost from "../CreatePosts/CreatePost";
import { Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const CreatePostIcon = () => {
  return (
    <CreatePost>
      <AddCommentIcon />
    </CreatePost>
  );
};

const HomeIcon = () => (
  <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
    <HomeRoundedIcon />
  </Link>
);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    bottom: 0,
    position: "sticky",
  },
});

export default function BottomTab() {
  const mobile = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root} style={{ display: mobile ? "inherit" : "none" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<HomeIcon />} />
        <Tab icon={<FlashOnIcon />} />
        <Tab icon={<CreatePostIcon />} />
        <Tab icon={<EmailIcon />} />
      </Tabs>
    </Paper>
  );
}
