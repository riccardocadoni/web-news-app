import React, { useState, useEffect } from "react";

import {
  signUserIn,
  deleteErrorMessage,
  selectErrorMessage,
  selectIsLoading,
} from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [psw, setPsw] = useState<string>("");
  const [isSignInButtonDisabled, setIsSignInButtonDisabled] = useState<boolean>(
    true
  );
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (email && psw) setIsSignInButtonDisabled(false);
    else setIsSignInButtonDisabled(true);
  }, [email, psw]);

  const handleLogin = () => {
    dispatch(deleteErrorMessage());
    dispatch(signUserIn({ email, psw }));
  };

  return (
    <div>
      <p>Sign In</p>
      <div>
        <input
          type="text"
          name="nome"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Your Email"}
          value={email}
        />
        <input
          type="text"
          name="psw"
          onChange={(e) => setPsw(e.target.value)}
          placeholder={"Password"}
          value={psw}
        />
      </div>
      <button disabled={isSignInButtonDisabled} onClick={handleLogin}>
        <p>Sign In</p>
      </button>
      <button
        onClick={() => {
          errorMessage && dispatch(deleteErrorMessage());
        }}
      >
        <p>Don't have an Account? SIGN UP</p>
      </button>
    </div>
  );
};

export default SignIn;

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: BOLD_FONT,
    color: PRIMARY_COLOR,
  },
  textInputContainer: {
    marginVertical: 50,
  },
  textInput: {
    flexDirection: "row",
    height: 60,
    width: 250,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  signInButton: {
    alignItems: "center",
    backgroundColor: SECONDARY_COLOR,
    padding: 15,
    borderRadius: 10,
    width: 250,
    marginBottom: 30,
  },
  signInText: {
    fontSize: 15,
    fontFamily: BOLD_FONT,
    color: PRIMARY_COLOR,
  },
  swapMethodText: {
    fontSize: 15,
    fontFamily: REGULAR_FONT,
    color: PRIMARY_COLOR,
  },
  errorText: {
    fontSize: 15,
    color: "red",
    margin: 30,
  },
}); */
