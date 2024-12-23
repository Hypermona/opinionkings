import React, { useState } from "react";
import PostImage from "./PostImage";
import TextField from "@material-ui/core/TextField";
import FinalTheme from "../../Store/finalTheme";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import { primary, secondary } from "../../Custom/Customization";

import "./selectImage.css";
import { Input } from "@material-ui/core";

function SelectImage(props) {
  const { finalTheme } = FinalTheme.useContainer();

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const showLoading = () => <div>Loading...</div>;

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.onloadstart = (e) => showLoading();
      reader.readAsDataURL(file);
    });
  }
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImage(imageDataUrl);
    }
  };
  const onUrlChange = (e) => {
    let url = e.target.value;
    let pattern1 =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    let pattern2 =
      /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g;
    if (pattern1.test(url) | pattern2.test(url)) {
      setImage(url);
      setError(null);
    } else {
      setError("Url is invalid!");
    }
    if (url.length <= 0) {
      setError(null);
    }
  };
  if (image) {
    return (
      <div>
        <PostImage {...props} image={image} />
      </div>
    );
  } else {
    return (
      <Paper style={{textAlign:"center",padding:20}}>
        <div className="select-image">
          <div className="local-image" style={{ color: finalTheme ? secondary : primary.main }}>
            <label htmlFor="local-image-">
              <Fab size="large" component="span">
                <AddPhotoAlternateIcon />
              </Fab>
              <input id="local-image-" type="file" onChange={onFileChange} accept="image/*" />
            </label>
          </div>
          <div className="line">or</div>
          <div className="url-image">
            <TextField
              id="url-image"
              type="text"
              error={error}
              className="url-text-field"
              helperText={error}
              color={finalTheme ? "secondary" : "primary"}
              label="Add Image URL"
              onChange={onUrlChange}
            />
          </div>
        </div>
        <Input
          placeholder="Enter Cloudinary URL"
          onChange={(e) => props.setPreviewImg(e.target.value)}
        />
      </Paper>
    );
  }
}

export default SelectImage;
