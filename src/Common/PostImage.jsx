import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import getCroppedImage from "../Functions/cropImage";
import "./postImage.css";
import { Button } from "@material-ui/core";

function PostImage({ closeModal, image, setPreviewImg }) {
  const [imgUrl, setImgUrl] = useState("");
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const onDone = useCallback(async () => {
    closeModal();
    try {
      const croppedImage = await getCroppedImage(image, croppedAreaPixels, rotation);
      console.log("donee", { croppedImage });
      setPreviewImg(croppedImage);
      setImgUrl(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, closeModal, image, setPreviewImg]);

  return (
    <div className="crop-container">
      <div className="cropper" onDoubleClick={() => setZoom(zoom >= 2 ? 1 : 2)}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="controls">
        <div className="zoom">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{ root: "slider" }}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div className="rotate">
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            classes={{ root: "slider" }}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
      </div>
      <div className="done">
        <Button color="secondary" variant="contained" onClick={() => onDone()}>
          Done
        </Button>
      </div>
      <pre>{imgUrl}</pre>
    </div>
  );
}

export default PostImage;
