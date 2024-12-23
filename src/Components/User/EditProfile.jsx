import React, { useState, useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "urql";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useForm, useWatch, Controller } from "react-hook-form";
import FinalTheme from "../../Store/finalTheme";
import Token from "../../Store/token";
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
import { CHECK_USER, UPDATE_USER } from "../../Queries/User";
import "./editProfile.css";
import { useHistory } from "react-router-dom";
import useOnceQuery from "../../hooks/useOnceQuery";

const CheckUsername = ({
  userName,
  word,
  setError,
  useMemo,
  clearErrors,
  errorUerName,
  isEdit,
}) => {
  const { fetching, data } = userName;
  useMemo(() => {
    if (data && data.checkUser.user && !isEdit) {
      setError("userName", {
        type: "userName",
        message: "username " + word + " exists already",
      });
    } else {
      clearErrors(["userName"]);
    }
  }, [data, setError, word, clearErrors]);
  if (word && !isEdit) {
    return (
      <InputAdornment>
        {fetching ? (
          <CircularProgress size={20} color="inherit" />
        ) : !data.checkUser.user && !!!errorUerName ? (
          <CheckCircleIcon style={{ color: green[400] }} />
        ) : (
          <CancelIcon style={{ color: red[400] }} />
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
  const { setToken, getToken, getUser, setUser } = Token.useContainer();
  const user = getUser();
  const history = useHistory();
  const token = getToken();
  const { finalTheme } = FinalTheme.useContainer();
  const [previewImg, setPreviewImg] = useState(user?.image || null);
  const [signUpResult, signUp] = useMutation(SIGNUP);
  const [updateUserdata, updateUser] = useMutation(UPDATE_USER);

  const { state } = useLocation();
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(
      () => ({
        name: user?.id ? user?.name : state?.name,
        email: user?.id ? user?.email : state?.email,
        bio: user?.id ? user?.bio : "",
        userName: user?.id ? user?.userName : "",
      }),
      [state, user]
    ),
    resolver: joiResolver(authScheme),
  });
  console.log("erro", errors);

  async function onUpdate(data) {
    console.log("data", data);
    const { data: _data, error } = await updateUser({
      name: data.name,
      bio: data.bio,
      image: previewImg,
    });
    if (_data.updateUser !== null) {
      setUser(_data.updateUser.user);
      history.push("/user/" + user?.id);
    } else if (error) {
      const message = error.graphQLErrors[0].message;
      const type = message.split(" ")[0];
      setError(type, { type: type, message: message });
    }
  }

  const onSubmit = async (signUpData) => {
    console.log("goooo", user.id);
    if (user.id) {
      return await onUpdate(signUpData);
    }
    const variables = {
      ...signUpData,
      password: state.password,
      image: previewImg,
      new: state.new,
    };
    // console.log("variables", variables);
    if (state.new) {
      try {
        const { data, error } = await signUp(variables);
        // console.log(data, error);
        if (data.addUser !== null) {
          // console.log(data.addUser.token);
          setToken(data.addUser.token, data.addUser.user);
          history.push("/");
        } else if (error) {
          const message = error.graphQLErrors[0].message;
          const type = message.split(" ")[0];
          setError(type, { type: type, message: message });
        }
      } catch (error) {
        // console.log(error);
      }
    }
  };
  const formWatch = useWatch({
    control,
    name: ["userName", "bio"],
  });

  const [userNameResult] = useOnceQuery({
    query: CHECK_USER,
    variables: { userName: formWatch[0] },
    pause: user?.id,
  });
  // useEffect(() => {
  //   if (userNameResult.data && userNameResult.data.checkUser.user) {
  //     setError("userName", {
  //       type: "userName",
  //       message: "username " + formWatch[0] + " exists already",
  //     });
  //   } else {
  //     clearErrors(["userName"]);
  //   }
  // }, [userNameResult.data, formWatch, setError, clearErrors]);
  // console.log(formWatch);
  function goToProfile() {
    history.push("/user/" + user?.id);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="edit-profile">
        <PostImageModal
          setPreviewImg={setPreviewImg}
          image={AccountCircleIcon}
          cropShape="round"
          previewImg={previewImg || user?.image}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="input"
              label="Full Name"
              variant="outlined"
              error={errors.name}
              color={finalTheme ? "secondary" : "primary"}
              helperText={errors.name ? errors.name.message : ""}
            />
          )}
        />

        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="input"
              label="Bio"
              variant="outlined"
              error={!!errors.bio}
              color={finalTheme ? "secondary" : "primary"}
              helperText={errors.bio ? errors.bio.message : ""}
              InputProps={{
                endAdornment: <ShowCharCount word={formWatch[1]} />,
              }}
            />
          )}
          rules={{ required: false }}
        />

        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="input"
              label="Username"
              disabled={user?.id}
              variant="outlined"
              color={finalTheme ? "secondary" : "primary"}
              InputProps={{
                endAdornment: (
                  <CheckUsername
                    userName={userNameResult}
                    word={formWatch[0]}
                    setError={setError}
                    useMemo={useMemo}
                    clearErrors={clearErrors}
                    errorUerName={errors.userName}
                    isEdit={user?.id}
                  />
                ),
              }}
              rules={{ required: true }}
              error={errors.userName}
              helperText={errors.userName ? errors.userName.message : ""}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="input"
              label="Email"
              variant="outlined"
              disabled={user?.id}
              color={finalTheme ? "secondary" : "primary"}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />

        {/* <Controller
          name="termsAndPrivacy"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              className="input"
              control={
                <Checkbox
                  // checked={checked}
                  // onChange={handleChange}
                  value="Hekko"
                  color={finalTheme ? "secondary" : "primary"}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Accepted terms and condithons and privacy police"
            />
          )}
        /> */}

        <div className="buttons">
          {/* <Button className="button" color={finalTheme?"secondary":"primary"} >Back</Button> */}
          {user.id ? (
            <Button
              type="button"
              onClick={goToProfile}
              className="button"
              color={finalTheme ? "secondary" : "primary"}
            >
              Back to Profile
            </Button>
          ) : (
            <Button type="submit" className="button" color={finalTheme ? "secondary" : "primary"}>
              Skip
            </Button>
          )}
          <Button
            type="submit"
            className="button"
            disabled={(token && !user?.id) || signUpResult.fetching || updateUserdata.fetching}
            size="large"
            color={finalTheme ? "secondary" : "primary"}
            variant="contained"
          >
            {user.id ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
