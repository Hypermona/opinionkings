import React, { useState, useEffect, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useMutation, useQuery } from "urql";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useForm, useWatch } from "react-hook-form";
import FinalTheme from "../../Store/finalTheme";
import { setToken, getToken } from "../../Store/token";
import PostImageModal from "../Common/PostImageModal";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { SIGNUP } from "../../Queries/Auth";
import { joiResolver } from "@hookform/resolvers/joi";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelIcon from "@material-ui/icons/Cancel";
import { authScheme } from "../../Functions/Validator";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import { CHECK_USER } from "../../Queries/User";
import "./editProfile.css";

const CheckUsername = ({ userName, word }) => {
  if (word) {
    const { fetching, data } = userName;
    console.log("UserName", userName);
    return (
      <InputAdornment>
        {fetching ? (
          <CircularProgress size={20} color="inherit" />
        ) : data.checkUser.user ? (
          <CancelIcon style={{ color: red[400] }} />
        ) : (
          <CheckCircleIcon style={{ color: green[400] }} />
        )}
      </InputAdornment>
    );
  } else {
    return null;
  }
};
const ShowCharCount = ({ word }) => {
  if (word) {
    const count = word.length;
    return <InputAdornment>{count}/300</InputAdornment>;
  } else {
    return null;
  }
};
function EditProfile() {
  const token = getToken();
  const { finalTheme } = FinalTheme.useContainer();
  const [previewImg, setPreviewImg] = useState(null);
  const [signUpResult, signUp] = useMutation(SIGNUP);

  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(
      () => ({
        name: state.name,
        email: state.email,
      }),
      [state]
    ),
    resolver: joiResolver(authScheme),
  });
  console.log(errors);
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
          setToken(data.addUser.token, data.addUser.id);
          window.location.replace("/");
        } else if (error) {
          setError("email", { type: "email", message: "email exists already" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const formWatch = useWatch({
    control,
    name: ["userName", "bio"],
    defaultValue: "",
  });

  const [userNameResult, queryUserName] = useQuery({
    query: CHECK_USER,
    variables: { userName: formWatch[0] },
  });
  useEffect(() => {
    if (userNameResult.data && userNameResult.data.checkUser.user) {
      setError("userName", {
        type: "userName",
        message: "username " + formWatch[0] + " exists already",
      });
    }
  }, [userNameResult.data, formWatch, setError]);
  console.log(formWatch);
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
          error={!!errors.name}
          key="name"
          color={finalTheme ? "secondary" : "primary"}
          helperText={errors.name ? errors.name.message : ""}
          {...register("name")}
        />
        <TextField
          className="input"
          label="Bio"
          variant="outlined"
          error={!!errors.bio}
          color={finalTheme ? "secondary" : "primary"}
          {...register("bio")}
          helperText={errors.bio ? errors.bio.message : ""}
          InputProps={{
            endAdornment: <ShowCharCount word={formWatch[1]} />,
          }}
        />
        <TextField
          className="input"
          label="Username"
          focused
          variant="outlined"
          color={finalTheme ? "secondary" : "primary"}
          {...register("userName")}
          InputProps={{
            endAdornment: <CheckUsername userName={userNameResult} word={formWatch[0]} />,
          }}
          error={errors.userName}
          helperText={errors.userName ? errors.userName.message : ""}
        />
        <TextField
          className="input"
          label="Email"
          variant="outlined"
          key="email"
          color={finalTheme ? "secondary" : "primary"}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
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
            disabled={token && true | signUpResult.fetching}
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
