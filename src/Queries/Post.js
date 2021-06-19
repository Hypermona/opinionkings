const ADD_POST = `
mutation($title:String,$image:String,$shortDescription:String,$description:String,$tags:[String],$authorId:ID){
    addPost(title:$title,image:$image,shortDescription:$shortDescrition,description:$description,tags:$tags,authorId:$authorId){
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
        like
        dislike
        shares
        saves
        createdAt
        author{
            id
            username
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
        like
        dislike
        shares
        saves
        createdAt
        author{
            id
            username
            name
            verified
            image
        }
    }
}
`;
export { ADD_POST, GET_POST, GET_POSTS };
