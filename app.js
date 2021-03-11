const { client, syncAndSeed } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

//mount on API routes
app.use('/api', require('./api/routes'));

//html page
//app.get('/', async(req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/', async(req, res, next) => {
  try {
    const genres = (await client.query( `SELECT * FROM genres`)).rows;
    res.send(`
    <html>
      <head>
      </head>
      <body>
        <h1>Genres</h1>
        <ul>
          ${
            genres.map(genre => `
            <li>
              <a href='/genre/${genre.id}'>
              ${ genre.name }
            </li>
            `).join('')
          }
        </ul>
      </body>
    </html>
    `);
  } catch(err) {
    next(err);
  }
});

app.get('/genre/:id', async(req, res, next) => {
  try {
    const artists = (await client.query('SELECT * FROM artists WHERE genre_id=$1', [req.params.id])).rows;
    res.send(`
    <html>
      <head>
      </head>
      <body>
        <h1>Artists</h1>
        <ul>
          ${artists.map(artist => `
          <li>
            <a href='/genre/${artist.genre_id}/${artist.id}'>
            ${artist.name}
          </li>
          `).join('')}
        </ul>
      </body>
    </html>
    `)
  } catch(err) {
    next(err);
  }
});

app.get('/genre/:genreId/:artistId', async(req, res, next) => {
  try {
    const albums = (await client.query('SELECT * FROM albums WHERE artist_id=$1', [req.params.artistId])).rows;
    res.send(`
    <html>
      <head>
        <link rel='stylesheet' href='/public/styles.css'/>
      </head>
      <body>
        <h1>Albums</h1>
        <ul>
          ${albums.map(album => `
          <li>
            ${album.name}
          </li>
          `).join('')}
        </ul>
      </body>
    </html>
    `)
  } catch(err) {
    next(err)
  }
})

const init = async() => {
  try {
    await client.connect();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`))
  } catch(err) {
    console.log(err);
  }
}

init();
