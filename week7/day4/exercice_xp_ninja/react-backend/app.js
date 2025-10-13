const express = require('express');
const app = express();

// Users route
app.get('/users', (req, res) => {
  res.json(
    [
      { id: 1, username: "omar_zouglah" },
      { id: 2, username: "john_doe" },
      { id: 3, username: "sara_smith" },
      { id: 4, username: "ahmed_khalil" },
      { id: 5, username: "maria_gomez" },
      { id: 6, username: "youssef_dev" },
      { id: 7, username: "emma_jones" },
      { id: 8, username: "adam_coder" },
      { id: 9, username: "lina_design" },
      { id: 10, username: "mohamed_ben" },
      { id: 11, username: "simon_lee" },
      { id: 12, username: "nora_data" },
      { id: 13, username: "paul_admin" },
      { id: 14, username: "fatima_tech" },
      { id: 15, username: "jack_dev" },
      { id: 16, username: "chloe_art" },
      { id: 17, username: "khalid_js" },
      { id: 18, username: "amelia_ai" },
      { id: 19, username: "lucas_test" },
      { id: 20, username: "hana_ml" }
    ]
    
);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
