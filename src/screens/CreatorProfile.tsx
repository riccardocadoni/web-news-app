import * as React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BACKGROUND_COLOR, PRIMARY_COLOR } from "../constants/Colors";
import { RED_HAT_FONT } from "../constants/Font";
//redux
import {
  getCreatorInfo,
  getCreatorContent,
  selectCreator,
  selectIsLoading,
  CreatorInfoType,
  CreatorContentType,
} from "../redux/contentSlice";
import {
  addNewFollow,
  deleteFollow,
  selectFollowingIds,
} from "../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import CreatorContentCard from "../components/CreatorContentCard";

export interface CreatorProfileProps {}

const CreatorProfile: React.FC<CreatorProfileProps> = () => {
  const { creatorId } = useParams<any>();
  const dispatch = useDispatch();
  const creator = useSelector(selectCreator);
  const isLoading = useSelector(selectIsLoading);
  const followingIds = useSelector(selectFollowingIds);
  const url: string =
    creator.info?.profilePic ||
    process.env.PUBLIC_URL + "/placeholder_avatar.jpg";

  React.useEffect(() => {
    if (!creator.info) dispatch(getCreatorInfo({ creatorId }));
    if (!creator.content) dispatch(getCreatorContent({ creatorId }));
    if (
      creator.info?.creatorId != null &&
      creator.info?.creatorId !== creatorId
    ) {
      dispatch(getCreatorInfo({ creatorId }));
      dispatch(getCreatorContent({ creatorId }));
    }
  }, []);

  if (isLoading) return <p>loading</p>;
  return (
    <Container>
      <ProfileInfoContainer>
        <ImageContainer>
          <ImageProfile src={url} />
        </ImageContainer>
        <TextInfoContainer>
          <TextInfo>{creator.info?.firstName}</TextInfo>
          <TextInfo>{creator.info?.lastName}</TextInfo>
          <FollowContainer>
            <FollowButton
              onClick={() => {
                followingIds.includes(creatorId)
                  ? dispatch(
                      deleteFollow({
                        creatorInfo: creator.info,
                        followingIds,
                      })
                    )
                  : dispatch(
                      addNewFollow({
                        creatorInfo: creator.info,
                        followingIds,
                      })
                    );
              }}
            >
              <TextInfo>
                {followingIds.includes(creatorId) ? "Unfollow" : "Follow"}
              </TextInfo>
            </FollowButton>
          </FollowContainer>
        </TextInfoContainer>
      </ProfileInfoContainer>
      <ContentContainer>
        {creator.content?.map((content) => {
          return <CreatorContentCard {...content}></CreatorContentCard>;
        })}
      </ContentContainer>
    </Container>
  );
};

export default CreatorProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 150px;
  margin-right: 150px;
  @media (max-width: 400px) {
    margin-left: 15px;
    margin-right: 15px;
  }
`;
const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  border-radius: 20px;
  padding: 20px;
  background-color: ${BACKGROUND_COLOR};
`;
const TextInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${BACKGROUND_COLOR};
`;
const TextInfo = styled.p`
  font-size: 20px;
  color: ${PRIMARY_COLOR};
  font-family: ${RED_HAT_FONT};
  margin: 5px;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
`;
const ImageProfile = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
`;
const FollowContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
`;
const FollowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
  border-width: 1px;
  border-color: ${PRIMARY_COLOR};
  border-radius: 5px;
  width: 150px;
  height: 30px;
`;
const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
  border-radius: 20px;
`;
