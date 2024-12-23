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
query($id:ID){
    user(id:$id){
        id
        image
        name
        bio
        userName
        followers
        following
        verified
        saved
        posts{
            id
            title
            image
            shortDescription
            saves
            createdAt
            author{
                id
                userName
                name
                verified
                image
            }
            opinions {
                label
                value
                selectedBy
            } 
        }
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

const UPDATE_USER = `
mutation($image:String,$name:String,$bio:String){
    updateUser(image:$image,name:$name,bio:$bio){
        user{
            id
            image
            name
            bio
            email
            userName
            followers
            following
            verified
            saved
        }
        token
    }
}
`;

export { CHECK_USER, GET_USERS, GET_USER, SAVE_POST, LOGOUT, UPDATE_FOLLOW, UPDATE_USER };
