import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  // created outside of the component function because inside the reducer we wont need any data generated inside the Login component
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") }; // since its only a blur, the value/isValid field should point to the state snapshot
  }
  return { value: "", isValid: false }; // for any other action, this default state is returned.
};

const pwReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }; // since its only a blur, the value/isValid field should point to the state snapshot
  }
  return { value: "", isValid: false }; // for any other action, this default state is returned.
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [pwState, dispatchPw] = useReducer(pwReducer, {
    value: "",
    isValid: undefined,
  });

  const { isValid: emailIsValid } = emailState; // using object destructuring to pull out only the isValid key
  const { isValid: pwIsValid } = pwState; // : pwIsValid is an alias definition
  // pulling out these values ^ will optimize performance and avoid unnecessary execution of the useEffect
  // since it will execute only when this fields change and not their entire state.
  // useful for props too, when you only want to run useEffect when one specific prop changes.

  useEffect(() => {
    setFormIsValid(emailIsValid && pwIsValid);

    return () => {
      console.log("CLEANUP");
    };
  }, [emailIsValid, pwIsValid]);

  const authContext = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value }); // the action can be anything but usually is an object with a 'type' key and a caps string the main identifier
    // val is the payload, the main infomation of the dispatched action.

    setFormIsValid(event.target.value.includes("@") && pwState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPw({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPw({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, pwState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            pwState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
