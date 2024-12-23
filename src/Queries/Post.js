const ADD_POST = `
mutation($title:String,$image:String,$shortDescription:String,$description:String,$tags:[String],$authorId:ID,$opinions: [OpinionsInput]){
    addPost(title:$title,image:$image,shortDescription:$shortDescription,description:$description,tags:$tags,authorId:$authorId,opinions: $opinions){
        id
    }
}
`;

const UPDATE_OPINION = `
mutation($postId:ID,$optionValue:String){
    updateOpinion(postId:$postId,optionValue:$optionValue){
      opinions{
        value,
        label,
        selectedBy
      }
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
        opinions {
            label
            value
            selectedBy
        } 
    }
}
`;
const GET_POSTS = `
query ($ids:[ID]){
    posts(ids:$ids){
        id
        title
        image
        shortDescription
        description
        likes
        dislikes
        shares
        saves
        tags
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
`;
export { ADD_POST, GET_POST, GET_POSTS, UPDATE_OPINION };
