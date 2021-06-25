import React from "react";

function ImagePreview({ previewImg }) {
  return <div>{previewImg ? <img src={previewImg} alt="preview" height="100px" /> : null}</div>;
}

export default ImagePreview;
