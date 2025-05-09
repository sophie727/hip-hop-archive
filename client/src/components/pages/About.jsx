import React, { useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import NavBark from "../modules/NavBark";
import "./About.css";

const About = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.title = "About Page";
  }, []);

  return (
    <>
      <NavBark dimmed={false} />
      <div className={`about-container ${theme === "dark" ? "dark-mode" : ""}`}>
        <section className="about-hero u-flex u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
          <h1>About Us</h1>
          <p className="about-text">
            This website was created by students in{" "}
            <em>Topics in Performance Technique: Hip-Hop</em>, taught by McKersin Previlus at MIT in
            Spring 2025. Knowing this would be the final offering of the course, we set out to
            create an archive of what we’ve learned and to contribute to the broader landscape of
            accurate, accessible Hip-Hop resources.
          </p>
        </section>

        <section className="about-section">
          <h2>Why We Built This</h2>
          <p>
            Our hope is that this knowledge continues to grow—expanded by others in the
            community—and serves as a lasting resource for anyone interested in Hip-Hop, especially
            those at MIT and in the Greater Boston Area who will no longer have access to this
            class.
          </p>
        </section>

        <section className="about-section">
          <h2>Carrying the Torch</h2>
          <p>
            With knowledge recognized as one of the Five Pillars of Hip-Hop, we are committed to
            keeping this site alive and evolving. As our class ends, we plan to pass stewardship of
            the website to others in the Hip-Hop community so this collective archive can continue
            to thrive.
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
