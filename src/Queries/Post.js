const ADD_POST = `
mutation($title:String,$image:String,$shortDescription:String,$description:String,$tags:[String],$authorId:ID){
    addPost(title:$title,image:$image,shortDescription:$shortDescription,description:$description,tags:$tags,authorId:$authorId){
        id
    }
}
`;

const GET_POST = `
query ($id:ID){
    post(id:$id){
       id
        title
        image
        shortDescription
        description
        likes
        dislikes
        shares
        saves
        createdAt
        author{
            id
            userName
            name
            verified
            image
        } 
    }
}
`;
const GET_POSTS = `
query {
    posts{
        id
        title
        image
        shortDescription
        description
        likes
        dislikes
        shares
        saves
        createdAt
        author{
            id
            userName
            name
            verified
            image
        }
    }
}
`;
export { ADD_POST, GET_POST, GET_POSTS };
