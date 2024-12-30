import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";

const app = express();
export const server = http.createServer(app);
export const allowedOrigins = [
  "http://localhost:5173",
  "https://tismas.github.io",
];

app.use(cors({ origin: allowedOrigins }));
app.use(morgan("[:date[web]] :method :url :status"));

app.get("/", (_, res) => {
  res.status(200).send("Trivia party - Ok!");
});
app.get("/status", (_, res) => {
  res.status(200).send("ok");
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
