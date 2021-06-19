import React, { useState, useCallback } from "react";
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
import "./auth.css";

function Auth() {
  const token = getToken();
  const [loginResult, login] = useMutation(LOGIN);
  const { finalTheme } = FinalTheme.useContainer();
  const { register, handleSubmit } = useForm();
  const { signUp } = useParams();
  const history = useHistory();
  const _signUp = signUp === "true" ? true : false;
  const [visibility, setVisibility] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      if (_signUp) {
        history.push("/editProfile", { ...data, new: true });
      } else {
        login(data).then(({ data, error }) => {
          if (data.login) {
            setToken(data.login.token);
            history.replace("/");
          }
        });
        console.log(data);
      }
    },
    [history, _signUp, login]
  );
  console.log(token);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="signup">
        <p className="title">{_signUp ? "SignUP" : "LogIn"}</p>

        <TextField
          className="input"
          required={_signUp ? true : false}
          color={finalTheme ? "secondary" : "primary"}
          autoFocus
          {...register(_signUp ? "name" : "userName")}
          label={_signUp ? "Full Name" : "Username or email"}
          variant="outlined"
          helperText={_signUp ? "Enter your full name" : ""}
        />

        {_signUp && (
          <TextField
            className="input"
            {...register("email")}
            required={_signUp ? true : false}
            color={finalTheme ? "secondary" : "primary"}
            label="Email"
            variant="outlined"
          />
        )}
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
          helperText={_signUp ? "use numbers, letters and special charecters" : ""}
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

        {_signUp ? (
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
