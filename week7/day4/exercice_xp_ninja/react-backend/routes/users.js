const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, username: "somebody" },
    { id: 2, username: "somebody_else" },
    { id: 3, username: "john_doe" },
  ]);
});

module.exports = router;
