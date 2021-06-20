const LOGIN = `
mutation($email:String,$userName:String,$password:String){
    login(email:$email,userName:$userName,password:$password){
        id
        token
    }
}
`;
const SIGNUP = `
mutation($email:String,$userName:String,$password:String,$new:Boolean,$image:String,$name:String){
    addUser(email:$email,userName:$userName,password:$password,new:$new,image:$image,name:$name){
        id
        token
    }
}
`;
export { LOGIN, SIGNUP };
