require("dotenv").config();
const PORT = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

const AylienNewsApi = require("aylien-news-api");
const defaultClient = AylienNewsApi.ApiClient.instance;
const app_id = defaultClient.authentications["app_id"];
app_id.apiKey = process.env["API_ID"];
const app_key = defaultClient.authentications["app_key"];
app_key.apiKey = process.env["API_KEY"];
const api = new AylienNewsApi.DefaultApi();
const opts = {
  title: "",
  sortBy: "social_shares_count.facebook",
  notLanguage: ["en"],
  publishedAtStart: "NOW-7DAYS",
  publishedAtEnd: "NOW",
};

const handleGetData = ({ body }, res) => {
  const { title } = body;
  if (!title) {
    return res.json({ error: "title is required" });
  }
  api.listStories({ ...opts, title }, (error, data) => {
    if (error) {
      res.json({ error });
    } else {
      res.json({ data: data.stories.map((s) => ({ title: s.title, source: s.source.name })) });
    }
  });
};

app.post("/api/get-data", handleGetData);
