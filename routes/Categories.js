const { body, validationResult } = require("express-validator");
const fs = require("fs");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  fs.readFile("./categorie.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.json(JSON.parse(data.toString()));
    }
  });
});

app.get("/:slug", (req, res) => {
  fs.readFile("./categorie.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const categories = JSON.parse(data.toString());
      const findedCatergory = categories.find((category) => {
        return category.slug === req.params.slug;
      });
      res.json(findedCatergory);
    }
  });
});

app.post("/", (req, res) => {
  const newCategory = { ...req.body };
  fs.readFile("./categorie.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      const categories = JSON.parse(data.toString());
      categories.push(newCategory);
      fs.writeFile("./categorie.json", JSON.stringify(categories), (err) => {
        if (err) {
          console.log(err);
          return;
        } else {
          res.json(newCategory);
        }
      });
    }
  });
});
module.exports = app;
