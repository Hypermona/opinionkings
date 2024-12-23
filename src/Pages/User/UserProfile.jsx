import { Avatar, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useOnceQuery from '../../hooks/useOnceQuery';
import { GET_USER } from '../../Queries/User';
import { useParams } from 'react-router-dom';
import Post from '../../Components/Common/Post/Post';
import "./userProfile.css"
import Tabs from '../../Components/Tabs/Tabs';
import { GET_POSTS } from '../../Queries/Post';
import users from '../../Store/users';

import { Settings } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import token from '../../Store/token';


const stats = [
  {
    label: "Opinions",
    value: "opinions",
  },
  {
    label: "Followers",
    value: "followers",
  },
  {
    label: "Following",
    value: "following",
  },
];

const tabs = [
  { label: "Opinions", value: "opinions" },
  { label: "Saved", value: "saved" },
];

function UserProfile() {
    const { id } = useParams();
    const [currentTab,setCurrentTab] = useState(tabs[0].value)
    const [savedPosts,setSavedPosts] = useState([])
    const {getUser} = token.useContainer()
    const history = useHistory()
    const [res] = useOnceQuery({
      query: GET_USER,
      variables: { id },
      pause:!id
    },id);
    const {user,setUser} = users.useContainer()
    const [postsRes, callPosts] = useOnceQuery({
      query: GET_POSTS,
      variables: { ids: user.saved || [] },
      pause: true,
    });
    useEffect(()=>{
        if(res?.data?.user){
            setUser(res.data?.user);
        }
    },[res.data?.user])

    useEffect(() => {
      if (currentTab === "saved" && !savedPosts.length) {
        callPosts();
        setSavedPosts(postsRes.data?.posts);
      }
    }, [postsRes.data?.posts, currentTab]);

    
    const statsData = {
      opinions: user.posts?.length,
      followers: user.followers?.length,
      following: user.following?.length,
    };

    function onTabChange(tab){
        setCurrentTab(tab)
    }

    function gotoEdit(){
      history.push("/editProfile")
    }
  if(user){
    return (
      <div style={{ width: "100vw" }}>
        <div
          style={{
            margin: "20px auto",
            width: "fit-content",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar style={{ width: 64, height: 64 }} src={user.image} />
            <div style={{ margin: "20px" }}>
              <Typography variant="h5">
                {user.name}
                {id === getUser().id && (
                  <IconButton size="small" onClick={gotoEdit}>
                    <Settings />
                  </IconButton>
                )}
              </Typography>

              <Typography variant="body1">@{user.userName}</Typography>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            {stats.map((stat) => (
              <div key={stat.value}>
                <Typography variant="body1">{stat.label}</Typography>
                <Typography variant="h5">{statsData[stat.value]}</Typography>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px" }} className="user__bio">
            <Typography variant="body2">{user.bio}</Typography>
          </div>
        </div>

        <div className="user__posts">
          <div>
            <Tabs items={tabs} selected={currentTab} onChange={onTabChange} />
          </div>
          {currentTab === tabs[0].value && user?.posts?.map((post, i) => <Post post={post} />)}
          {currentTab === tabs[1].value && savedPosts?.map((post, i) => <Post post={post} />)}
        </div>
      </div>
    );
  }else{
    return <p>Loading...</p>
  }
}

export default UserProfile