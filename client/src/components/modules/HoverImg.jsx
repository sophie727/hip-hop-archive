import React, { createContext, useEffect, useState } from "react";
import { get, post } from "../../utilities";
import tree_art_map from "./tree_art_map";

/**
 * HoverImg is a component that renders in like a lot of things.
 *
 * Proptypes
 * @param {String} imgSrc is the image source (uhh e.g. for /assets/sakura.png it's actually just "sakura")
 * @param {String} class is the className of the img
 * @param {String} title is the String that appears when you hover over smth
 * @param {JSON Object} style is styling
 */

const HoverImg = (props) => {
  const [hoverMode, setHoverMode] = useState(false);

  return (
    <>
      <div onMouseEnter={() => setHoverMode(true)} onMouseLeave={() => setHoverMode(false)}>
        {hoverMode ? (
          <>
            {" "}
            <img
              style={props.style}
              className={props.class}
              src={tree_art_map(`${props.imgSrc}_hover`)}
              title={props.title}
            />{" "}
          </>
        ) : (
          <>
            <img style={props.style} className={props.class} src={tree_art_map(props.imgSrc)} />{" "}
          </>
        )}
        {/* TODO: add more title and alt texts to various images and buttons and stuff */}
      </div>
    </>
  );
};

export default HoverImg;
