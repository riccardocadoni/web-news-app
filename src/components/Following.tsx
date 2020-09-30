import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFollowing,
  getFollowingData,
  selectIsLoading,
  selectErrorMessage,
} from "../redux/profileSlice";
import { View, Text, StyleSheet } from "react-native";
import CreatorCard from "./CreatorCard";
import { RED_HAT_FONT } from "../constants/Font";
import { PRIMARY_COLOR } from "../constants/Colors";
import styled from "styled-components";

export interface FollowingProps {}

const Following: React.FC<FollowingProps> = () => {
  const dispatch = useDispatch();
  const following = useSelector(selectFollowing);
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectErrorMessage);

  React.useEffect(() => {
    if (!following) dispatch(getFollowingData({}));
  }, []);

  if (isLoading) return <p>loadinf</p>;

  return (
    <Container>
      {following ? (
        <>
          <TitleText>Your Following: {following?.length}</TitleText>
          <CardsContainer>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            {following?.map((creator) => (
              <CreatorCard
                key={creator.creatorId}
                firstName={creator.firstName}
                lastName={creator.lastName}
                creatorId={creator.creatorId}
                profilePic={creator.profilePic}
              ></CreatorCard>
            ))}
          </CardsContainer>
        </>
      ) : (
        <TitleText>
          You have no following, take a look at the explore section!
        </TitleText>
      )}
    </Container>
  );
};

export default Following;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const TitleText = styled.p`
  font-size: 20px;
  color: ${PRIMARY_COLOR};
  font-family: ${RED_HAT_FONT};
  font-weight: bold;
  margin: 15px;
`;
const ErrorText = styled.p`
  font-size: 15px;
  color: red;
  font-family: ${RED_HAT_FONT};
  margin: 30px;
`;
