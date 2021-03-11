const router = require('express').Router();
const { client } = require('../db');

router.get('/genres', async(req, res, next) => {
  try {
    const genres = (await client.query( `SELECT * FROM genres`)).rows;
    res.send(genres);
  } catch(err) {
    next(err);
  }
})

module.exports = router;
