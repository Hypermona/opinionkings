import React from "react";
import { useForm } from "react-hook-form";
import "./postForm.css";

function PostForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Title" {...register("title")} />
        <input type="text" placeholder="shor description" {...register("shorDescription")} />
        <input type="file" placeholder="description" {...register("description")} />
        <input type="text" placeholder="tags" {...register("tags")} />
        <input type="submit" placeholder="submit" />
      </form>
    </div>
  );
}

export default PostForm;
