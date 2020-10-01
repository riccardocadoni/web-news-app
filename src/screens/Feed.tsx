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
  if (!feed) {
    return <p>loafing</p>;
  }

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
