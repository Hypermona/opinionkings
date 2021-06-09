import React from "react";

function ImagePreview({ previewImg }) {
  return <div>{previewImg ? <img src={previewImg} alt="preview" /> : null}</div>;
}

export default ImagePreview;
