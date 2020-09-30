import React from "react";
import firebase from "../firebase";
//redux
import {
  getAllCreators,
  selectExplore,
  selectErrorMessage,
  selectIsLoading,
} from "../redux/exploreSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PRIMARY_COLOR } from "../constants/Colors";
import { RED_HAT_FONT } from "../constants/Font";
import CreatorCard from "../components/CreatorCard";

export interface ExploreProps {}

const Explore: React.FC<ExploreProps> = () => {
  const dispatch = useDispatch();
  const creators = useSelector(selectExplore);
  const user = firebase.auth().currentUser;
  const uid = user?.uid;
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);

  React.useEffect(() => {
    dispatch(getAllCreators({ uid }));
  }, []);

  if (isLoading) return <p>loafing</p>;

  return (
    <Container>
      <TitleContainer>
        <Title>Top Creators</Title>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </TitleContainer>
      <CardsContainer>
        {creators?.map((creator) => (
          <CardsItem key={creator.creatorId}>
            <CreatorCard {...creator}></CreatorCard>
          </CardsItem>
        ))}
      </CardsContainer>
    </Container>
  );
};

export default Explore;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media (max-width: 400px) {
    width: 200px;
  }
`;
const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const CardsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TitleContainer = styled.div`
  margin-left: 10px;
`;
const Title = styled.p`
  font-size: 20px;
  color: ${PRIMARY_COLOR};
  font-family: ${RED_HAT_FONT};
`;

const ErrorText = styled.p`
  font-size: 15px;
  color: red;
  font-family: ${RED_HAT_FONT};
  margin: 30px;
`;
