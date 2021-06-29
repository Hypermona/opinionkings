const CHECK_USER = `
query($userName:String){
 checkUser(userName:$userName){
     user
 }
}`;

const GET_USERS = `
query{
    users{
        image
        name
        userName
    }
}
`;

export { CHECK_USER, GET_USERS };
