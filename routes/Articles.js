const { body, validationResult } = require("express-validator");
const fs = require("fs");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  fs.readFile("./article.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json(JSON.parse(data.toString()));
    }
  });
});

app.get("/:slug", (req, res) => {
  fs.readFile("./article.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const articles = JSON.parse(data.toString());
      const findedArticle = articles.find((article) => {
        return article.slug === req.params.slug;
      });
      res.json(findedArticle);
    }
  });
});

app.post("/", (req, res) => {
  const newArticle = { ...req.body };
  fs.readFile("./article.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const articles = JSON.parse(data.toString());
      articles.push(newArticle);
      fs.writeFile("./article.json", JSON.stringify(articles), (err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          res.json(newArticle);
        }
      });
    }
  });
});
module.exports = app;
