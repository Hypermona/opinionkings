const CHECK_USER = `
query($userName:String){
 checkUser(userName:$userName){
     user
 }
}`;

const GET_USERS = `
query{
    users{
        id
        image
        name
        userName
        followers
        following
        verified
        saved
    }
}
`;

const GET_USER = `
query{
    user{
        id
        image
        name
        userName
        followers
        following
        verified
        saved
    }
}
`;

const SAVE_POST = `
mutation($postId:ID){
    savePost(postId:$postId){
      id
      saved
    }
}
`;

const UPDATE_FOLLOW = `
mutation($followerId:ID){
    updateFollowers(followerId:$followerId){
      id
      followers
      following
    }
}
`;

const LOGOUT = `
mutation{
    logout{
      success
    }
}
`;

export { CHECK_USER, GET_USERS, GET_USER, SAVE_POST, LOGOUT, UPDATE_FOLLOW };
