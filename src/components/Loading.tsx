import * as React from "react";
import styled, { keyframes } from "styled-components";
import { PRIMARY_COLOR } from "../constants/Colors";
export interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Container>
      <Spinner></Spinner>
    </Container>
  );
};

export default Loading;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  margin-top: 200px;
  justify-content: center;
  align-content: center;
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid ${PRIMARY_COLOR};
  border-right: 2px solid ${PRIMARY_COLOR};
  border-bottom: 2px solid ${PRIMARY_COLOR};
  border-left: 4px solid ${PRIMARY_COLOR};
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
