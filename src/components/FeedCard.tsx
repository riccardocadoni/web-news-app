import * as React from "react";
import { CreatorContentType } from "../types";
import styled from "styled-components";
import TimeAgo from "react-timeago";
import { RED_HAT_FONT } from "../constants/Font";
import { BACKGROUND_COLOR } from "../constants/Colors";

export type FeedCardProps = CreatorContentType;

const FeedCard: React.FC<FeedCardProps> = ({
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
  const pic = coverUrl || process.env.PUBLIC_URL + "/placeholder.jpg";
  const creatorPic =
    creatorPicUrl || process.env.PUBLIC_URL + "/placeholder.jpg"; //TODO placeolder

  return (
    <Container>
      <InfoCardContainer>
        <InfoCreatorContainer>
          <ImageCreator src={creatorPic}></ImageCreator>
          <NameCreator>{creatorName}</NameCreator>
        </InfoCreatorContainer>
        <Date>
          <TimeAgo date={JSON.parse(createdAt)}></TimeAgo>
        </Date>
      </InfoCardContainer>
      <ImageContainer>
        <Image src={pic}></Image>
      </ImageContainer>
      <DataContainer>
        <Title>{title}</Title>
      </DataContainer>
    </Container>
  );
};

export default FeedCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 10px;
  border-radius: 10px;
  width: 500px;
  background-color: ${BACKGROUND_COLOR};

  @media (max-width: 500px) {
    width: 300px;
  }
`;
const InfoCreatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;
const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ImageCreator = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 10px;
`;
const NameCreator = styled.p`
  font-size: 15px;
  font-family: ${RED_HAT_FONT};
`;
const Date = styled.p`
  font-size: 15px;
  font-family: ${RED_HAT_FONT};
`;
const ImageContainer = styled.div`
  margin-bottom: 5px;
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
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
