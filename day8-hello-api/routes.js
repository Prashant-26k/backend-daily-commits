import { parse } from "url";

export const handleRequest = (req, res) => {
  const { pathname, query } = parse(req.url, true);
  const { method } = req;

  if (method === "GET" && pathname === "/hello") {
    const message = query.name
      ? `Hello ${query.name}`
      : "Hello API";

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(JSON.stringify({ message }));
  }

  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({ error: "Not Found" }));
};
