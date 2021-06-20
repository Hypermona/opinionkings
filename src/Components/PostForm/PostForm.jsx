import Button from "@material-ui/core/Button";
import React from "react";
import { useForm } from "react-hook-form";
// import ImagePreview from "../../Common/ImagePreview";
import TextField from "@material-ui/core/TextField";
import FinalTheme from "../../Store/finalTheme";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "./postForm.css";
import PostImageModal from "../../Common/PostImageModal";
import { useMutation } from "urql";
import { ADD_POST } from "../../Queries/Post";
import { useHistory } from "react-router";

const handleTags = (tags) => {
  let tagArray = tags
    .split(",")
    .map((e) => e.trim())
    .filter((i) => i);

  return tagArray;
};

function PostForm() {
  const [previewImg, setPreviewImg] = React.useState(null);
  const { finalTheme } = FinalTheme.useContainer();
  const { register, handleSubmit } = useForm();
  const [addPostResult, addPost] = useMutation(ADD_POST);
  const { replace } = useHistory();
  const onSubmit = async (formData) => {
    const tags = formData.tags;
    const separatedTags = handleTags(tags);
    const variables = { ...formData, tags: separatedTags, image: previewImg };
    const { data, error } = await addPost(variables);
    if (data.addPost) {
      replace("/");
    }
    if (error) {
      console.log(error);
    }
    // console.log(data, error);
    // console.log("form data", variables);
  };

  console.log("form");
  return (
    <div className="edit-post">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-post">
          <TextField
            type="text"
            className="text-field"
            variant="outlined"
            color={finalTheme ? "secondary" : "primary"}
            multiline
            rowsMax={2}
            label="Title"
            {...register("title")}
          />
          <div style={{ alignSelf: "flex-start", margin: 20 }}>
            <PostImageModal
              setPreviewImg={setPreviewImg}
              image={AddPhotoAlternateIcon}
              cropShape="square"
              previewImg={previewImg}
            />
          </div>
          <TextField
            variant="outlined"
            className="text-field"
            rowsMax={4}
            multiline
            color={finalTheme ? "secondary" : "primary"}
            label="short description"
            {...register("shortDescription")}
            type="password"
          />
          <TextField
            type="text"
            className="text-field"
            variant="outlined"
            multiline
            color={finalTheme ? "secondary" : "primary"}
            label="description"
            {...register("description")}
          />
          <TextField
            type="text"
            className="text-field"
            variant="outlined"
            rowsMax={4}
            multiline
            color={finalTheme ? "secondary" : "primary"}
            label="tags"
            {...register("tags")}
            helperText="Use , (comma) to separate tags"
          />
          <Button
            color={finalTheme ? "secondary" : "primary"}
            variant="contained"
            type="submit"
            disabled={addPostResult.fetching}
          >
            Submit
          </Button>
        </div>
      </form>
      {/* <ImagePreview previewImg={previewImg} /> */}
    </div>
  );
}

export default PostForm;
