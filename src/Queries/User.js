const CHECK_USER = `
query($userName:String){
 checkUser(userName:$userName){
     user
 }
}`;

export { CHECK_USER };
