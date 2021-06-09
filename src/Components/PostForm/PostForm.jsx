import { Button } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import ImagePreview from "../../Common/ImagePreview";
import "./postForm.css";
import PostImageModal from "./PostImageModal";

function PostForm() {
  const [previewImg, setPreviewImg] = React.useState(null);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("form data", data);

    // const reader = new FileReader();
    // reader.readAsDataURL(data.image[0]);
    // reader.onloadend = () => {
    //   setPreview(reader.result);
    // };
  };
  // console.log(preview);

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Title" {...register("title")} />
        <PostImageModal setPreviewImg={setPreviewImg} />
        <input type="text" placeholder="shor description" {...register("shorDescription")} />
        <input type="text" placeholder="description" {...register("description")} />
        <input type="text" placeholder="tags" {...register("tags")} />
        <Button color="secondary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <ImagePreview previewImg={previewImg} />
    </div>
  );
}

export default PostForm;
