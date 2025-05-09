import React, { useState, useEffect, useContext } from "react";
import NavBark from "../modules/NavBark";
import { Link } from "react-router-dom";
import { get } from "../../utilities";
import "./Articles.css";
// import FilterPopup from "../modules/FilterPopup";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [dimMode, setDimMode] = useState(false);

  const { user } = useContext(UserContext);

  const changeDimMode = () => {
    setDimMode(!dimMode);
  };

  useEffect(
    () => {
      document.title = "Articles";

      /*
      let articles = [
        {
          article_name: "ARTICLEW 1",
          article_image: "/assets/sakura.png",
          article_id: "some_article_id",
        },
        {
          article_name: "five pillars",
          article_image: "/assets/sakura.png",
          article_id: "some_article_id2",
        },
      ];
      setArticles(articles);
      setFilteredArticles(articles);*/

      get("/api/articles", {}).then((articleObjs) => {
        let reversedArticleObjs = articleObjs.reverse();
        setArticles(reversedArticleObjs); // Set all articles
        setFilteredArticles(reversedArticleObjs); // Set filtered trees to all articles initially
      });
    },
    [
      /*user.googleid*/
    ]
  );

  useEffect(() => {
    // Apply search filter whenever trees or searchQuery changes
    const filtered = articles.filter((article) =>
      article.article_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [articles, searchQuery]); // Run this effect whenever `trees` or `searchQuery` changes

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // This will trigger the above useEffect and update filteredTrees
  };
  /*
  const changeAddMode = () => {
    setAddMode(!addMode);
  };

  const handleAddProject = (newTree) => {
    // first, add the project to the project list
    setTrees((trees) => [newTree, ...trees]);

    // then, change add mode
    changeAddMode();

    // then, navigate to that project
    navigate("/Project/" + newTree.tree_id);
  };

  const handleClose = () => {
    changeAddMode();
  };*/

  const handleAdd = () => {
    navigate("/AddArticle");
  };

  let articlesList = null;
  const hasArticles = filteredArticles.length !== 0;
  if (hasArticles) {
    articlesList = filteredArticles.map((articleObj) => (
      <Link
        to={`/Article/${articleObj.article_id}`}
        className="Articles-SingleProjectContainer u-flex"
        key={articleObj.article_id}
      >
        <img
          className="Articles-image"
          src={articleObj.article_image}
          alt={`${articleObj.article_name}`}
        />
        <div>
          <p className="Articles-SingleProjectName">{articleObj.article_name}</p>
        </div>
      </Link>
    ));
  } else {
    articlesList = <div>No articles found!</div>;
  }

  return (
    <div className={dimMode ? "Articles-dimmode" : "Articles-viewmode"}>
      <NavBark dimmed={dimMode} />
      <div className="Articles-Container">
        <div className="Articles-Title">
          <h1 className="Articles-Titletext">All Articles</h1>
        </div>

        <div className="Articles-SearchAndAdd">
          {user?.name === "MIT's Hip-Hop class" && (
            <button className="Articles-AddButton" onClick={handleAdd} aria-label="Add New Article">
              +
            </button>
          )}
          <input
            type="text"
            className="Articles-SearchBar"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {/* dimMode && (
          <AddTreePopup
            className="Articles-filterpopup"
            handleAddProject={handleAddProject}
            closePopup={handleClose}
          />
        ) */}
        <div className="Articles-ArticleList">{articlesList}</div>
      </div>
    </div>
  );
};

export default Articles;
