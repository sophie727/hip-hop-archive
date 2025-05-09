/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Article = require("./models/article");
const Event = require("./models/event");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const ADMIN_EMAILS = ["sophie727.liu@gmail.com"];

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    console.log("under /whoami, not logged in");
    return res.send({});
  }
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

/*
const article = new Article({
  creator_name: "MIT's Hip-Hop class",
  creator_googleid: "mit-hip-hop-class",
  article_name: "The Origins of Hip-Hop in the South Bronx",
  article_description:
    "Exploring how overcrowding, redlining, and community resilience in the 1970s South Bronx gave rise to the cultural force of Hip-Hop.",
  article_id: "south-bronx-fire",
  article_content: [
    {
      content_type: "Header",
      content_text: "Overview",
      content_link: "",
    },
    {
      content_type: "Paragraph",
      content_text:
        "Hip-Hop’s emphasis on community dates back to its origins in the South Bronx, where residents created the art form in response to the difficulties they experienced before and during the 1970s. Black people were pushed to this area, particularly following Black soldiers’ return from the Vietnam War, due to the limitations of their use of the GI Bill...",
      content_link: "",
    },
    {
      content_type: "Header",
      content_text: "The Decade of Fire and Lack of Resources",
      content_link: "",
    },
    {
      content_type: "Paragraph",
      content_text:
        "Dr. Harold Wise, founder of the Martin Luther King Jr. Health Center, called the South Bronx a necropolis because, in his words, it was a “city of death”... Landlords did not earn enough from rent, either, to be motivated to take care of their buildings and residents...",
      content_link: "",
    },
    {
      content_type: "Paragraph",
      content_text:
        "A large cause of the Bronx’s lack of resources was its overcrowding, as Urban Renewal and gentrification in Manhattan displaced around 150 thousand people into the South Bronx...",
      content_link: "",
    },
    {
      content_type: "Paragraph",
      content_text:
        "The South Bronx needed long-term investments in its citizens and public services. When resources were provided to the South Bronx, they were provided as specific, short-term fixes...",
      content_link: "",
    },
    {
      content_type: "Header",
      content_text: "Redrawn District Lines and the Political Climate",
      content_link: "",
    },
    {
      content_type: "Paragraph",
      content_text:
        "Redrawn district lines added to the political tension in the South Bronx by further dividing the region’s population and making it harder for some (namely Puerto Ricans) to gain political power...",
      content_link: "",
    },
    {
      content_type: "Header",
      content_text: "Sources/Learn More",
      content_link: "",
    },
    {
      content_type: "Source",
      content_text:
        "Who Burned the Bronx? PBS Film “Decade of Fire” Investigates 1970s Fires That Displaced Thousands",
      content_link: "https://www.youtube.com/watch?v=x3Tyj0AQu0o",
    },
    {
      content_type: "Source",
      content_text:
        "Martin Tolchin, “South Bronx: A jungle Stalked by Fear, Seized by Rage” in the New York Times (1973)",
      content_link:
        "https://www.nytimes.com/1973/01/15/archives/south-bronx-a-jungle-stalked-by-fear-seized-by-rage-the-south-bronx.html",
    },
  ],
  article_image: "https://example.com/your-image-url.jpg",
});

article.save();
*/

router.get("/articles", (req, res) => {
  // req.query contains nothing; we're just getting all the articles
  // for the /Articles page.
  Article.find({}).then((articles) => {
    const formatted = articles.map((article) => ({
      ...article.toObject(),
      createdAt: article.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      updatedAt: article.updatedAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));
    res.send(formatted);
  });
});

router.get("/article", (req, res) => {
  // req.query contains article_id; we're just getting a specific article
  // for the /Article/:article_id page.
  Article.findOne({ article_id: req.query.article_id }).then((article) => {
    if (article) {
      const formatted = {
        ...article.toObject(),
        createdAt: article.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        updatedAt: article.updatedAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      res.send(formatted);
    } else {
      res.status(404).send({ error: "Article not found" });
    }
  });
});

router.post("/article", (req, res) => {
  /*
  how to use this: router.post("api/article") will be called when a new article is made, so
  req should contain all the fields (creator_name, creator_googleid, article_name, 
  article_description, article_id, article_content, article_image)

  Only admin should be able to post articles.
  */
  if (!req.user || !ADMIN_EMAILS.includes(req.user.email)) {
    return res.status(403).send({ error: "Forbidden" });
  }

  const newArticle = new Article({
    creator_name: req.body.creator_name,
    creator_googleid: req.body.creator_googleid,
    article_name: req.body.article_name,
    article_description: req.body.article_description,
    article_id: req.body.article_id,
    article_content: req.body.article_content,
    article_image: req.body.article_image,
  });

  newArticle
    .save()
    .then((article) => res.send(article))
    .catch((err) => res.status(400).send({ error: err.message }));
});

router.get("/events", (req, res) => {
  // req.query contains nothing; we're just getting all the events
  // for the /Events page.
  Event.find({}).then((events) => {
    res.send(events);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
