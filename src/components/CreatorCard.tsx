import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BACKGROUND_COLOR } from "../constants/Colors";
import { RED_HAT_FONT } from "../constants/Font";

export interface CreatorCardProps {
  firstName: string;
  lastName: string;
  fields?: string[];
  creatorId: string;
  profilePic?: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  firstName,
  lastName,
  profilePic,
  creatorId,
}) => {
  const history = useHistory();
  const pic = profilePic || process.env.PUBLIC_URL + "/placeholder_avatar.jpg";
  return (
    <Container
      onClick={() => {
        history.push("/creator/" + creatorId);
      }}
    >
      <ImageContainer>
        <ImageProfile src={pic} />
      </ImageContainer>
      <TextContainer>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${BACKGROUND_COLOR};
  margin: 5px;
  border-radius: 20px;
  padding: 10px;
`;
const ImageContainer = styled.div`
  align-items: center;
  justify-content: center;
`;
const ImageProfile = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin: 10px;
`;
const TextContainer = styled.div`
  align-items: "flex-start";
  justify-content: "center";
  text-align: center;
`;
const Text = styled.p`
  font-size: 15px;
  font-family: ${RED_HAT_FONT};
  margin: 5px;
`;

export default CreatorCard;
