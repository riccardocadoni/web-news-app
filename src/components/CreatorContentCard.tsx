import * as React from "react";
import { CreatorContentType } from "../redux/contentSlice";
import TimeAgo from "react-timeago";
import { BACKGROUND_COLOR, PRIMARY_COLOR } from "../constants/Colors";
import { RED_HAT_FONT } from "../constants/Font";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export interface CreatorContentCardProps extends CreatorContentType {}
const CreatorContentCard: React.FC<CreatorContentCardProps> = ({
  content,
  coverUrl,
  createdAt,
  editedAt,
  creatorId,
  creatorName,
  creatorPicUrl,
  contentId,
  title,
  type,
}) => {
  const pic = coverUrl || process.env.PUBLIC_URL + "/placeholder";
  const history = useHistory();
  return (
    <Container
      onClick={() => {
        history.push("/content/" + contentId);
      }}
    >
      <ImageContainer>
        <Image src={pic} />
      </ImageContainer>
      <DataContainer>
        <Title>{title}</Title>
        <Date>
          <TimeAgo date={JSON.parse(createdAt)}></TimeAgo>
        </Date>
      </DataContainer>
    </Container>
  );
};

export default CreatorContentCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  width: 280px;
  background-color: ${BACKGROUND_COLOR};
`;
const Date = styled.p`
  font-size: 15px;
  font-family: ${RED_HAT_FONT};
`;
const ImageContainer = styled.div`
  margin-bottom: 5px;
`;
const Image = styled.img`
  width: 280px;
  height: 200px;
  border-radius: 10px;
  @media (max-width: 500px) {
    height: 300px;
  }
`;
const DataContainer = styled.div`
  text-align: left;
`;
const Title = styled.p`
  font-size: 15px;
  font-family: ${RED_HAT_FONT};
  font-weight: bold;
  margin: 0px;
`;
