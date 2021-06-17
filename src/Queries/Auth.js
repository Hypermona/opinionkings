const LOGIN = `
mutation($email:String,$userName:String,$password:String){
    login(email:$email,userName:$userName,password:$password){
        id
        token
    }
}
`;
const SIGNUP = `
mutation($email:String,$userName:String,$password:String,$new:Boolean){
    addUser(email:$email,userName:$userName,password:$password,new:$new){
        id
        token
    }
}
`;
export { LOGIN, SIGNUP };
