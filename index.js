const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = 5000;
const categoriesRoutes = require("./routes/categories");
const articlesRoutes = require("./routes/articles");

app.use(cors("*"));
app.use(morgan("tiny"));
app.use(express.json());

app.use("/articles", articlesRoutes);
app.use("/categories", categoriesRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${5000}`);
});
