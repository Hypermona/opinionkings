const CATEGORIES = `{
  categories{
    id
    name
  }
}`;

const CATEGORY = `
query($id:String){
    category(id:$id){
        id
        name
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
}`;
export { CATEGORIES, CATEGORY };
