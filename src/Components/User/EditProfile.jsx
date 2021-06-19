import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useMutation } from "urql";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import FinalTheme from "../../Store/finalTheme";
import { setToken, getToken } from "../../Store/token";
import PostImageModal from "../../Common/PostImageModal";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { SIGNUP } from "../../Queries/Auth";
import "./editProfile.css";

function EditProfile() {
  const token = getToken();
  const { finalTheme } = FinalTheme.useContainer();
  const [previewImg, setPreviewImg] = useState(null);
  const [signUpResult, signUp] = useMutation(SIGNUP);
  const { state } = useLocation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: state.name,
      email: state.email,
    },
  });

  const { replace } = useHistory();
  console.log(useLocation());
  const onSubmit = async (signUpData) => {
    const variables = {
      ...signUpData,
      password: state.password,
      image: previewImg,
      new: state.new,
    };
    console.log("variables", variables);
    if (state.new) {
      try {
        const { data, error } = await signUp(variables);
        console.log(data, error);
        if (data.addUser !== null) {
          console.log(data.addUser.token);
          setToken(data.addUser.token);
          replace("/");
        } else if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
          defaultValue={state.name}
          color={finalTheme ? "secondary" : "primary"}
          {...register("name")}
        />
        <TextField
          className="input"
          label="Bio"
          variant="outlined"
          color={finalTheme ? "secondary" : "primary"}
          // {...register("bio")}
        />
        <TextField
          className="input"
          label="Username"
          variant="outlined"
          color={finalTheme ? "secondary" : "primary"}
          {...register("userName")}
        />
        <TextField
          className="input"
          label="Email"
          variant="outlined"
          disabled
          defaultValue={state.email}
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
              // {...register("termsAndPrivacy")}
            />
          }
          label="Accepted terms and condithons and privacy police"
        />

        <div className="buttons">
          {/* <Button className="button" color={finalTheme?"secondary":"primary"} >Back</Button> */}
          <Button className="button" color={finalTheme ? "secondary" : "primary"}>
            Skip
          </Button>
          <Button
            type="submit"
            className="button"
            disabled={token | signUpResult.fetching}
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
