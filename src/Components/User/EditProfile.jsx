import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import IconButton from "@material-ui/core/IconButton";
import { useParams, Link, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import FinalTheme from "../../Store/finalTheme";
import Token from "../../Store/token";
import PostImageModal from "../../Common/PostImageModal";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./editProfile.css";

function EditProfile() {
  const { finalTheme } = FinalTheme.useContainer();
  const [previewImg, setPreviewImg] = useState(null);

  const { register, handleSubmit } = useForm();
  const { state } = useLocation();
  console.log(useLocation());
  const onSubmit = (data) => {
    console.log(data);
    window.location = "/";
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="edit-profile">
        <PostImageModal
          setPreviewImg={setPreviewImg}
          image={AccountCircleIcon}
          cropShape="round"
          previewImg={previewImg}
        />
        <TextField
          className="input"
          label="Full Name"
          variant="outlined"
          color={finalTheme ? "secondary" : "primary"}
          {...register("name")}
        />
        <TextField
          className="input"
          label="Bio"
          variant="outlined"
          color={finalTheme ? "secondary" : "primary"}
          {...register("bio")}
        />
        <TextField
          className="input"
          label="Username"
          variant="outlined"
          disabled={state.new}
          value={state.userName}
          color={finalTheme ? "secondary" : "primary"}
          {...register("username")}
        />
        <TextField
          className="input"
          label="Email"
          variant="outlined"
          value={state.email}
          disabled={state.new}
          color={finalTheme ? "secondary" : "primary"}
          {...register("email")}
        />
        <FormControlLabel
          className="input"
          control={
            <Checkbox
              // checked={checked}
              // onChange={handleChange}
              value="Hekko"
              color={finalTheme ? "secondary" : "primary"}
              inputProps={{ "aria-label": "primary checkbox" }}
              {...register("termsAndPrivacy")}
            />
          }
          label="Accepted terms and condithons and privscy police"
        />

        <div className="buttons">
          {/* <Button className="button" color={finalTheme?"secondary":"primary"} >Back</Button> */}
          <Button className="button" color={finalTheme ? "secondary" : "primary"}>
            Skip
          </Button>
          <Button
            type="submit"
            className="button"
            size="large"
            color={finalTheme ? "secondary" : "primary"}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
