import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Article.css";
import { get, post } from "../../utilities";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

// import HoverImg from "../modules/HoverImg";
import NavBark from "../modules/NavBark";

const Article = (props) => {
  const [article, setArticle] = useState([]);
  const [articleContent, setArticleContent] = useState([]);

  const navigate = useNavigate();
  let article_id = useParams().article_id;

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = "Article Page";

    get("/api/article", { article_id: article_id }).then((articleObj) => {
      setArticle(articleObj);
      setArticleContent(articleObj.article_content);
    });
  }, []);

  if (!article || !articleContent) {
    return <div className="Article-loading">Loading...</div>;
  }

  return (
    <>
      <NavBark dimmed={false} />
      <div className={`Article-container ${theme}`}>
        <h1 className="Article-title">{article.article_name}</h1>
        <div className="Article-meta">
          <span>By {article.creator_name}</span> |{" "}
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        {article.article_image && (
          <div className="Article-header-image">
            <img src={article.article_image} alt="Article header" />
          </div>
        )}
        <div className="Article-content">
          {articleContent.map((content, index) => {
            if (content.content_type === "Header") {
              return (
                <h2 key={index} className="Article-content-header">
                  {content.content_text}
                </h2>
              );
            } else if (content.content_type === "Paragraph") {
              return (
                <p key={index} className="Article-content-paragraph">
                  {content.content_text}
                </p>
              );
            } else if (content.content_type === "Image") {
              return (
                <div key={index} className="Article-content-image">
                  <img src={content.content_link} alt={content.content_text} />
                </div>
              );
            } else if (content.content_type === "Source") {
              return (
                <div key={index} className="Article-content-source">
                  <Link to={content.content_link}>{content.content_text}</Link>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="Article-updated">
          Last updated: {new Date(article.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </>
  );
};

export default Article;
