import React, { useState, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useParams, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import Counter from "../../Store/counter";
import FinalTheme from "../../Store/finalTheme";
import "./auth.css";

function Auth() {
  const counter = Counter.useContainer();
  const _finalTheme = FinalTheme.useContainer();
  const { finalTheme } = _finalTheme;
  const { count, setcount } = counter;
  console.log(count);
  const { register, handleSubmit } = useForm();
  const { signUp } = useParams();
  const _signUp = signUp === "true" ? true : false;
  const [visibility, setVisibility] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      console.log(data);
      setcount(5);
    },
    [setcount]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="signup">
        <p className="title">{_signUp ? "SignUP" : "LogIn"}</p>

        <TextField
          className="input"
          required={_signUp ? true : false}
          color={finalTheme ? "secondary" : "primary"}
          autoFocus
          {...register("userName")}
          label="Username"
          variant="outlined"
          helperText={_signUp ? "sholud only contain lowecase letters, numbers and underscore" : ""}
        />
        {!_signUp && <p>or</p>}
        <TextField
          className="input"
          {...register("email")}
          required={_signUp ? true : false}
          color={finalTheme ? "secondary" : "primary"}
          label="Email"
          variant="outlined"
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
          helperText={_signUp ? "use numbers, letters and special charecters" : ""}
        />
        <Button
          type="submit"
          variant="contained"
          color={finalTheme ? "secondary" : "primary"}
          size="large"
        >
          {_signUp ? "SignUp" : "LogIn"}
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
