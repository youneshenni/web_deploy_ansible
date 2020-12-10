const crypto = require("crypto");
const http = require("http");
const ps = require("child_process");
const winston = require("winston");
const { createLogger } = require("winston");
const FRONT_SECRET = process.env.FRONT_SECRET;
const BACK_SECRET = process.env.BACK_SECRET;

const logger = createLogger({
  level: "info",
  format: winston.format.logstash(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "/var/log/webhook/log" }),
  ],
});
const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      const hash = req.headers["x-hub-signature"];
      const secret = req.url.slice(1) === "server" ? BACK_SECRET : FRONT_SECRET;
      const newHash =
        "sha1=" + crypto.createHmac("sha1", secret).update(body).digest("hex");
      // Verify if body is JSON
      JSON.parse(body);
      console.log(hash, newHash);
      console.log(
        crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(newHash))
      );
      console.log(BACK_SECRET, FRONT_SECRET);
      if (
        crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(newHash)) &&
        req.headers["content-type"] === "application/json"
      ) {
        ps.exec(`/bin/bash /web/www/post-receive/${req.url.slice(1)}.sh`);
        res.statusCode = 201;
        res.setHeader("Content-Type", "text/plain");
        res.end("Pulling...");
      } else {
        logger.log({
          level: "warn",
          message: "Unauthorized git pull attempt",
          ip: req.url,
          body,
          headers: req.headers,
        });
        res.statusCode = 401;
        res.setHeader("Content-Type", "text/plain");
        res.end("Unauthorized");
      }
    } catch {
      logger.log({
        level: "info",
        message: "Error",
        ip: req.url,
        body,
        headers: req.headers,
      });
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal server error");
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
