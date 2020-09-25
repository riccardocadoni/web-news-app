import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  signUserIn,
  deleteErrorMessage,
  selectErrorMessage,
  selectIsLoading,
} from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { SECONDARY_COLOR, PRIMARY_COLOR } from "../constants/Colors";
import { RED_HAT_FONT } from "../constants/Font";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
const Title = styled.p`
  font-size: 50px;
  font-family: ${RED_HAT_FONT};
  font-weight: bold;
  color: ${PRIMARY_COLOR};
`;

const EmailInput = styled.input`
  align-items: "center";
  border-radius: 10px;
  border: 2px solid ${PRIMARY_COLOR};
  padding: 15px;
  width: 250px;
  margin-bottom: 30px;
`;
const PswInput = styled.input`
  align-items: "center";
  border-radius: 10px;
  border: 2px solid ${PRIMARY_COLOR};
  padding: 15px;
  width: 250px;
  margin-bottom: 30px;
`;
const SignInButton = styled.button`
  align-items: "center";
  background-color: ${(props) => (props.disabled ? "grey" : SECONDARY_COLOR)};
  border-radius: 10px;
  border: none;
  width: 250px;
  margin-bottom: 30px;
`;
const SignInButtonText = styled.p`
  font-family: ${RED_HAT_FONT};
  font-weight: bold;
  color: ${PRIMARY_COLOR};
`;
const SwapMethodText = styled(Link)`
  font-size: 15px;
  font-family: ${RED_HAT_FONT};
  margin: 30px;
`;

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
    <Container>
      <Title>Sign In</Title>
      <EmailInput
        value={email}
        placeholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PswInput
        type="password"
        name="psw"
        onChange={(e) => setPsw(e.target.value)}
        placeholder={"Password"}
        value={psw}
      />
      <SignInButton disabled={isSignInButtonDisabled} onClick={handleLogin}>
        <SignInButtonText>Sign In</SignInButtonText>
      </SignInButton>
      <SwapMethodText to={"/signup"}>
        Don't have an Account? SIGN UP
      </SwapMethodText>
      {/* <button
        onClick={() => {
          errorMessage && dispatch(deleteErrorMessage());
        }}
      >
        <p>Don't have an Account? SIGN UP</p>
      </button> */}
    </Container>
  );
};

export default SignIn;

/* const TextInput = styled.input.attrs({
  type: "submit",
  value: "Submit",
})`
  background: #00aec9;
  color: #fff;
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  width: 100%;
  border-radius: 5px;
  height: 35px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
  &:active {
    background-color: #f1ac15;
  }
`; */
