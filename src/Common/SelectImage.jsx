import React, { useState } from "react";
import PostImage from "./PostImage";

function SelectImage(props) {
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
    var pattern =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    if (pattern.test(url)) {
      setImage(url);
    } else {
      setError("Url is invalid!");
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
      <div>
        <div className="local-image">
          <label htmlFor="local-image"></label>
          <input id="local-image" type="file" onChange={onFileChange} accept="image/*" />
        </div>
        <div className="url-image">
          <label htmlFor="url-image"></label>
          <input id="url-image" type="text" onChange={onUrlChange} />
          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}

export default SelectImage;
