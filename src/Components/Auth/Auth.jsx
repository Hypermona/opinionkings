import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useParams, Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import FinalTheme from "../../Store/finalTheme";
import { LOGIN } from "../../Queries/Auth";
import { useMutation } from "urql";
import { getToken, setToken } from "../../Store/token";
import { authScheme } from "../../Functions/Validator";
import { joiResolver } from "@hookform/resolvers/joi";
import "./auth.css";

function Auth({ modal }) {
  const token = getToken();
  const [loginResult, login] = useMutation(LOGIN);
  const { finalTheme } = FinalTheme.useContainer();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(authScheme),
  });
  const { signUp } = useParams();
  const history = useHistory();
  const _signUp = signUp === "true" ? true : false;
  const [visibility, setVisibility] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    if (_signUp) {
      history.push("/editProfile", { ...data, new: true });
    } else {
      login(data).then(({ data, error }) => {
        if (data.login) {
          setToken(data.login.token, data.login.id);
          window.location.replace("/");
        }
        if (error) {
          console.log(error);
        }
      });
      console.log(data);
    }
  };

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="signup">
        <p className="title">{_signUp ? "SignUP" : "LogIn"}</p>

        {_signUp && (
          <TextField
            className="input"
            type="text"
            required={_signUp ? true : false}
            color={finalTheme ? "secondary" : "primary"}
            {...register(_signUp ? "name" : "userName")}
            label={_signUp ? "Full Name" : "Username or email"}
            variant="outlined"
            error={errors.name || errors.userName}
            helperText={
              errors.userName
                ? errors.userName.message
                : errors.name
                ? errors.name.message
                : "Enter your full name"
            }
          />
        )}
        <TextField
          className="input"
          {...register("email")}
          required={_signUp ? true : false}
          color={finalTheme ? "secondary" : "primary"}
          label={_signUp ? "Email" : "Username or email"}
          variant="outlined"
          error={errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />

        <TextField
          className="input"
          {...register("password")}
          required={_signUp ? true : false}
          color={finalTheme ? "secondary" : "primary"}
          type={visibility ? "text" : "password"}
          label="Password"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setVisibility(!visibility)}>
                  {visibility ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={errors.password}
          helperText={
            errors.password
              ? errors.password.message
              : _signUp
              ? "use numbers, letters and special charecters"
              : ""
          }
        />

        <Button
          type="submit"
          // disabled={token ? true : false}
          variant="contained"
          color={finalTheme ? "secondary" : "primary"}
          size="large"
          disabled={loginResult.fetching}
        >
          {_signUp ? "Sign Up" : "LogIn"}
        </Button>

        {modal ? null : _signUp ? (
          <p>
            Already have account ? please <Link to="/auth/false">login</Link>
          </p>
        ) : (
          <p>
            Don't have an account <Link to="/auth/true">create account</Link>
          </p>
        )}
      </div>
    </form>
  );
}

export default Auth;
