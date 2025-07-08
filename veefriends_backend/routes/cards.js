const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Static card data source (from veefriends_cards_metadata.json)
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'veefriends_cards_metadata.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading card data:', err);
      return res.status(500).json({ error: 'Failed to load card data' });
    }
    const cards = JSON.parse(data);
    res.json(cards);
  });
});

module.exports = router;
