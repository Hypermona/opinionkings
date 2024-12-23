const LOGIN = `
mutation($email:String,$userName:String,$password:String){
    login(email:$email,userName:$userName,password:$password){
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
        token
    }
}
`;
const SIGNUP = `
mutation($email:String,$userName:String,$password:String,$new:Boolean,$image:String,$name:String,$bio:String){
    addUser(email:$email,userName:$userName,password:$password,new:$new,image:$image,name:$name,bio:$bio){
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

const REFRESHTOKEN = `
mutation{
    refreshToken{
        user{
            id
            image
            name
            email
            bio
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
export { LOGIN, SIGNUP, REFRESHTOKEN };
