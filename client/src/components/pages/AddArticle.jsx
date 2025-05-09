import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AddArticle.css";
import { post } from "../../utilities";
import NavBark from "../modules/NavBark";
import { ThemeContext, UserContext } from "../App";

const AddArticle = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);
  const [showAddOptions, setShowAddOptions] = useState(false);

  const handleAddBlock = (content_type) => {
    setContentBlocks([...contentBlocks, { content_type, content_text: "", content_link: "" }]);
    setShowAddOptions(false);
  };

  const handleBlockChange = (index, field, val) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index][field] = val;
    setContentBlocks(newBlocks);
  };

  const handlePost = () => {
    const article_id = Date.now().toString(); // Or use UUID
    const newArticle = {
      creator_name: user.name,
      creator_googleid: user.googleid,
      article_name: title,
      article_id,
      article_description: "", // Optional: Add description field if needed
      article_image: image,
      article_content: contentBlocks,
    };
    post("/api/article", newArticle).then(() => navigate(`/Article/${article_id}`));
  };

  return (
    <>
      <NavBark dimmed={false} />
      <div className={`AddArticle-container ${theme}`}>
        <input
          className="AddArticle-title"
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="AddArticle-image"
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <div className="AddArticle-blocks">
          {contentBlocks.map((block, i) => (
            <div key={i} className="AddArticle-blockWrapper">
              {block.content_type === "Header" ? (
                <input
                  type="text"
                  className="AddArticle-headerInput"
                  placeholder="Header text"
                  value={block.value}
                  onChange={(e) => handleBlockChange(i, "content_text", e.target.value)}
                />
              ) : block.content_type === "Paragraph" ? (
                <textarea
                  className="AddArticle-textarea"
                  placeholder="Paragraph text"
                  value={block.value}
                  onChange={(e) => handleBlockChange(i, "content_text", e.target.value)}
                />
              ) : (
                <div className="AddArticle-doubleInput">
                  <input
                    type="text"
                    placeholder="Link URL"
                    value={block.value}
                    onChange={(e) => handleBlockChange(i, "content_link", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Alt Text"
                    value={block.alt}
                    onChange={(e) => handleBlockChange(i, "content_text", e.target.value)}
                  />
                </div>
              )}
              <button
                className="AddArticle-removeButton"
                onClick={() => {
                  const newBlocks = [...contentBlocks];
                  newBlocks.splice(i, 1);
                  setContentBlocks(newBlocks);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="AddArticle-plusContainer">
          <button
            className="AddArticle-AddButton"
            onClick={() => setShowAddOptions(!showAddOptions)}
            title="Add content block"
          >
            +
          </button>
          {showAddOptions && (
            <div className="AddArticle-popup">
              <button onClick={() => handleAddBlock("Header")}>Header</button>
              <button onClick={() => handleAddBlock("Paragraph")}>Paragraph</button>
              <button onClick={() => handleAddBlock("Image")}>Image</button>
              <button onClick={() => handleAddBlock("Source")}>Source</button>
            </div>
          )}
        </div>

        <button className="AddArticle-post" onClick={handlePost}>
          Post Article
        </button>
      </div>
    </>
  );
};

export default AddArticle;
