import React from "react";
import firebase from "../firebase";
import { RED_HAT_FONT } from "../constants/Font";
import { PRIMARY_COLOR, BACKGROUND_COLOR } from "../constants/Colors";
import Following from "../components/Following";
//redux
import { useDispatch } from "react-redux";
import { logUserOut } from "../redux/authSlice";
import { reset as resetContent } from "../redux/contentSlice";
import { reset as resetFeed } from "../redux/feedSlice";
import { reset as resetExplore } from "../redux/exploreSlice";
import { reset as resetProfile } from "../redux/profileSlice";
import styled from "styled-components";

export interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const dispatch = useDispatch();
  const user = firebase.auth().currentUser;
  //const url: string | undefined = user?.photoURL ? user.photoURL : undefined;
  const pic =
    user?.photoURL || process.env.PUBLIC_URL + "/placeholder_avatar.jpg";
  return (
    <Container>
      <ProfileInfoContainer>
        <ImageContainer>
          <ImageProfile src={pic} />
        </ImageContainer>
        <TextInfoContainer>
          <TextInfo>{user?.displayName}</TextInfo>
          <TextInfo>{user?.email}</TextInfo>
        </TextInfoContainer>
      </ProfileInfoContainer>
      <SettingsContainer>
        <SettingsButton
          onClick={() => {
            dispatch(logUserOut());
            dispatch(resetContent());
            dispatch(resetFeed());
            dispatch(resetExplore());
            dispatch(resetProfile());
          }}
        >
          <p>LogOut</p>
        </SettingsButton>
      </SettingsContainer>
      <FollowingContainer>
        <Following></Following>
      </FollowingContainer>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 400px) {
    width: 300px;
  }
`;
const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
`;
const TextInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
`;
const ImageProfile = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  margin: 10px;
`;

const FollowingContainer = styled.div`
  display: flex;
  justify-content: start;
  margin: 20px;
`;

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;
const SettingsButton = styled.button`
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
