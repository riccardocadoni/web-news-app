import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  signUserUp,
  signUserIn,
  deleteErrorMessage,
  selectErrorMessage,
  selectIsLoading,
} from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { SECONDARY_COLOR, PRIMARY_COLOR } from "../constants/Colors";
import { RED_HAT_FONT } from "../constants/Font";
import { Link } from "react-router-dom";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [psw, setPsw] = useState<string>("");
  const [pswConfirm, setPswConfirm] = useState<string>("");
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState<boolean>(
    true
  );
  const [formError, setFormError] = useState<null | string>(null);
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);

  const handleSignUp = () => {
    dispatch(deleteErrorMessage());
    if (psw !== pswConfirm) setFormError("Passwords are different");
    else dispatch(signUserUp({ email, psw, firstName, lastName }));
  };

  useEffect(() => {
    formError && setFormError(null);

    if (firstName && lastName && email && psw && pswConfirm)
      setIsSignUpButtonDisabled(false);
    else setIsSignUpButtonDisabled(true);
  }, [firstName, lastName, email, pswConfirm, psw]);

  return (
    <Container>
      <Title>Sign Up</Title>
      <EmailInput
        value={firstName}
        placeholder={"First Name"}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <EmailInput
        value={lastName}
        placeholder={"Last Name"}
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <PswInput
        type="password"
        name="psw confirm"
        onChange={(e) => setPswConfirm(e.target.value)}
        placeholder={"Confirm Password"}
        value={pswConfirm}
      />
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {/* {isLoading && <ActivityIndicator></ActivityIndicator>} */}
      <SignUpButton disabled={isSignUpButtonDisabled} onClick={handleSignUp}>
        <SignUpButtonText>Sign In</SignUpButtonText>
      </SignUpButton>
      <SwapMethodText to={"/signin"}>
        Already have an Account? SIGN IN
      </SwapMethodText>
    </Container>
  );
};

export default SignUp;

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
const SignUpButton = styled.button`
  align-items: "center";
  background-color: ${(props) => (props.disabled ? "grey" : SECONDARY_COLOR)};
  border-radius: 10px;
  border: none;
  width: 250px;
  margin-bottom: 30px;
`;
const SignUpButtonText = styled.p`
  font-family: ${RED_HAT_FONT};
  font-weight: bold;
  color: ${PRIMARY_COLOR};
`;
const SwapMethodText = styled(Link)`
  font-size: 15px;
  font-family: ${RED_HAT_FONT};
  margin: 30px;
`;
const ErrorMessage = styled.p`
  font-size: 15px;
  font-family: ${RED_HAT_FONT};
  color: red;
  margin: 10px;
`;
