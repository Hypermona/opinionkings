import Button from "@material-ui/core/Button";
import React, { useMemo, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
// import ImagePreview from "../../Common/ImagePreview";
import TextField from "@material-ui/core/TextField";
import FinalTheme from "../../Store/finalTheme";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "./postForm.css";
import PostImageModal from "../Common/PostImageModal";
import { useMutation } from "urql";
import { ADD_POST, GET_POSTS } from "../../Queries/Post";
import { useHistory } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { postSchema } from "../../Functions/Validator";
import { IconButton, Typography } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import  postsStore from "../../Store/posts";
import useOnceQuery from "../../hooks/useOnceQuery";

const handleTags = (tags) => {
  if (!tags) {
    return [];
  }
  let tagArray = tags
    .split(",")
    .map((e) => e.trim())
    .filter((i) => i);

  return tagArray;
};

function PostForm() {
  const [previewImg, setPreviewImg] = React.useState(null);
  const [post,setPost] = React.useState({})
  const {id} = useParams()
  const [result] = useOnceQuery({ query: GET_POSTS,variables:{ids:[id]},pause:!id || id==="new" });
  const postData = result?.data?.posts?.[0] 

  const { finalTheme } = FinalTheme.useContainer();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(postSchema),
    defaultValues: {
      opinions: [({ label: "Yes" }, { label: "No" })],
    },
  });
  React.useEffect(() => {
    if(postData){
      reset({
      title: postData?.title ,
      shortDescription: postData?.shortDescription,
      description: postData?.description ,
      tags: postData?.tags ,
      opinions: postData?.opinions ,
    },{keepTouched:true});
    setPreviewImg(setPost?.image);
    }
  }, [postData]);
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "opinions", // unique name for your Field Array
  });
  const [addPostResult, addPost] = useMutation(ADD_POST);
  const { replace } = useHistory();

  function generateValue(label = "") {
    return label
      .split(" ")
      .map((s) => s.toLocaleLowerCase())
      .join("_")
      .concat("_" + Math.round(Math.random() * 100));
  }

  const onSubmit = async (formData) => {
    const tags = formData.tags;
    const opinions = formData.opinions;
    opinions.forEach((opinion) => {
      opinion.value = generateValue(opinion.label);
      opinion.selectedBy = [];
    });
    const separatedTags = handleTags(tags);
    const variables = { ...formData, tags: separatedTags, opinions, image: previewImg };
    const { data, error } = await addPost(variables);
    if (data.addPost) {
      replace("/");
    }
    if (error) {
      //
    }
   
  };

  return (
    <div className="edit-post">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-post">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                className="text-field"
                variant="outlined"
                color={finalTheme ? "secondary" : "primary"}
                multiline
                rowsMax={2}
                label="Title"
                error={errors.title}
                helperText={errors.title ? errors.title.message : ""}
              />
            )}
          />

          <div style={{ alignSelf: "flex-start", margin: 20 }}>
            <PostImageModal
              setPreviewImg={setPreviewImg}
              image={AddPhotoAlternateIcon}
              cropShape="square"
              previewImg={previewImg}
            />
          </div>
          <Controller
            name="shortDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                className="text-field"
                rowsMax={4}
                multiline
                color={finalTheme ? "secondary" : "primary"}
                label="short description"
                type="text"
                error={errors.shortDescription}
                helperText={errors.shortDescription ? errors.shortDescription.message : ""}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                className="text-field"
                variant="outlined"
                multiline
                color={finalTheme ? "secondary" : "primary"}
                label="description"
                error={errors.description}
                helperText={errors.description ? errors.description.message : ""}
              />
            )}
          />

          <div style={{ width: "100%", padding: "10px 20px" }}>
            <Typography color="textSecondary">Provide Opinion Options</Typography>
            {fields.map((item, index) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      style={{ width: "80%", margin: "10px 0" }}
                      variant="outlined"
                      multiline
                      color={finalTheme ? "secondary" : "primary"}
                      label="Label"
                      error={errors.o}
                      helperText={
                        errors?.opinions?.[index]?.label
                          ? errors?.opinions[index]?.label?.message
                          : ""
                      }
                    />
                  )}
                  name={`opinions.${index}.label`}
                  control={control}
                />
                <IconButton type="button" onClick={() => remove(index)}>
                  <DeleteRounded />
                </IconButton>
              </div>
            ))}
            <Button
              style={{ marginTop: 10 }}
              variant="outlined"
              size="medium"
              type="button"
              onClick={() => append({ label: "" })}
            >
              append
            </Button>
          </div>

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                className="text-field"
                variant="outlined"
                rowsMax={4}
                multiline
                color={finalTheme ? "secondary" : "primary"}
                label="tags"
                error={errors.tags}
                helperText={errors.tags ? errors.tags.message : "Use , (comma) to separate tags"}
              />
            )}
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
