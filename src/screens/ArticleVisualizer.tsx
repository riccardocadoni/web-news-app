import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Editor, EditorState, convertFromRaw } from "draft-js";
//types
import { CreatorContentType } from "../redux/contentSlice";
import { selectFeed } from "../redux/feedSlice";
import styled from "styled-components";
import { RED_HAT_FONT } from "../constants/Font";

export interface ArticleVisualizerProps {}

const ArticleVisualizer: React.FC<ArticleVisualizerProps> = () => {
  const { contentId } = useParams<any>();
  const [article, setArticle] = useState<CreatorContentType | null | undefined>(
    null
  );

  const dispatch = useDispatch();
  const feed = useSelector(selectFeed);

  useEffect(() => {
    setArticle(feed?.find((object) => object.contentId === contentId));
  }, []);

  if (article === null) return <p>LOading</p>;
  if (article === undefined) return <p>Article not found</p>;
  if (!contentId)
    return (
      <Container>
        <p>Article not found</p>
      </Container>
    );
  const editorState = EditorState.createWithContent(
    convertFromRaw(JSON.parse(article.content))
  );
  return (
    <Container>
      <Title>{article.title}</Title>
      <Editor
        editorState={editorState}
        readOnly={true}
        onChange={() => {}}
      ></Editor>
    </Container>
  );
};

export default ArticleVisualizer;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 250px;
  margin-right: 250px;
  margin-top: 20px;

  @media (max-width: 700px) {
    margin-left: 15px;
    margin-right: 15px;
  }
`;

const Title = styled.p`
  font-size: 30px;
  font-family: ${RED_HAT_FONT};
  font-weight: bold;
  margin: 0px;
  margin-bottom: 30px;
`;
