import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeed,
  selectFeed,
  selectIsLoading,
  selectErrorMessage,
} from "../redux/feedSlice";
import FeedCard from "../components/FeedCard";
import { getFollowingData } from "../redux/profileSlice";
import Loading from "../components/Loading";
import { RED_HAT_FONT } from "../constants/Font";
import { PRIMARY_COLOR } from "../constants/Colors";

export interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  const feed = useSelector(selectFeed);
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!feed) {
      dispatch(getFeed({}));
      dispatch(getFollowingData({}));
    }
  }, []);

  if (isLoading) return <Loading></Loading>;

  if (!feed || feed.length === 0)
    return (
      <Container>
        <Text>There's nothing to see here.. try following someone in the explore section! Then refresh the page.</Text>
      </Container>
    );

  const items = feed.map((post) => {
    return <FeedCard {...post} key={post.contentId}></FeedCard>;
  });

  return (
    <Container>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={() => dispatch(getFeed({}))}
        hasMore={false}
        loader={<p>LOADING</p>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items}
      </InfiniteScroll>
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 400px) {
    width: 300px;
  }
`;

const Text = styled.p`
  font-size: 20px;
  font-family: ${RED_HAT_FONT};
  color:${PRIMARY_COLOR};
  font-weight: bold;
  margin: 50px;
`;
