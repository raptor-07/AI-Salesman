import http from "http";
import dotenv from "dotenv";
dotenv.config();
import getData from "./scraper.js";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error(
    "API key is not set. Please set it as an environment variable."
  );
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const url = req.url;
  const asin = req.asin;

  if (url === "/get-product-data") {
    getData(asin).then((res) => {
      console.log(res);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(res));
    });
  } else if (url === "/get-conversation") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello world!" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log("-------------------------");
  console.log(`API key is ${apiKey}`);
  console.log(`Server is running on http://localhost:${port}`);
  console.log("-------------------------");
});
