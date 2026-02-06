import express from "express";
const app = express();

const items = Array.from({ length: 95 }, (_, i) => `Item-${i + 1}`); // array containing 95 items like [Item-1, Item-2,....]

app.get("/items", (req, res) => {
  let page = parseInt(req.query.page) || 1;         // converting string to integer
  let limit = parseInt(req.query.limit) || 10;

  const start = (page - 1) * limit;     // page start from 1 but index start from 0, hence page - 1 is used.
  const end = start + limit;

  const paginatedItems = items.slice(start, end); // only contains items to an already calculated limit.

  const totalPages = Math.ceil(items.length / limit);

  res.json({
    metadata: {
      totalItems: items.length,
      totalPages,
      currentPage: page,
      limit
    },
    data: paginatedItems
  });
});

app.listen(3000);
