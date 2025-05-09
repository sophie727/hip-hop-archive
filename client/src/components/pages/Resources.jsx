import React, { useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import NavBark from "../modules/NavBark";
import "./Resources.css";

const Resources = (props) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = "Resources";
  }, []);

  return (
    <>
      <NavBark dimmed={false} />
      <div className={`resources-container ${theme === "dark" ? "dark-mode" : ""}`}>
        <header className="resources-header u-textCenter">
          <h1>Resources</h1>
          <p className="resources-subtitle">Resources for Boston and Cambridge locals</p>
        </header>

        <section className="resources-section">
          <h2>Local to MIT</h2>
          <ul>
            <li>
              <strong>Dance groups:</strong> Immobilaire
            </li>
            <li>
              <strong>Classes & Other:</strong> (See local Boston/Cambridge listings below)
            </li>
          </ul>
        </section>

        <section className="resources-section">
          <h2>Local to Cambridge/Boston</h2>

          <h3>Dance Communities</h3>
          <ul>
            <li>Stiggity Stackz</li>
            <li>A Trike Called Funk</li>
            <li>McKersin</li>
            <li>The Flavour Continues</li>
            <li>Tiny Village</li>
          </ul>

          <h3>Classes</h3>
          <ul>
            <li>
              <strong>House:</strong> Caleaf Sellers, Sean Bjerke, Steven Garcia (Rhythm), Sammy
            </li>
            <li>
              <strong>Hip-Hop Freestyle:</strong> Stiggity Stackz, McKersin, Zach Say (Tiny
              Village), Joony Ly
            </li>
            <li>
              <strong>Breaking:</strong> Brian Pistols, Floor Lords Studio
            </li>
            <li>
              <strong>Krump:</strong> Xav, Big Rip
            </li>
            <li>
              <strong>Popping:</strong> Megatron
            </li>
            <li>
              <strong>Other:</strong> Beats Rhymes and Life, Boston
            </li>
          </ul>
        </section>

        <section className="resources-section">
          <h2>Online Resources</h2>
          <ul>
            <li>
              <strong>Genius</strong> — the lyric/song analysis site McKersin showed us
            </li>
            <li>
              <strong>Hip-Hop Dictionary video</strong> — a YouTube video shown in class
            </li>
            <li>
              <strong>Other reputable sources</strong> — links coming soon
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Resources;
