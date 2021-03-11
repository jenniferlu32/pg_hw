const pg = require('pg');

const client = new pg.Client('postgres://localhost/pg_hw_db');

const syncAndSeed = async() => {
  const SQL =  `
  DROP TABLE IF EXISTS genres CASCADE;
  DROP TABLE IF EXISTS artists CASCADE;
  DROP TABLE IF EXISTS albums CASCADE;

  CREATE TABLE genres(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );

  CREATE TABLE artists(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    genre_id INTEGER REFERENCES genres(id)
  );

  CREATE TABLE albums(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    artist_id INTEGER REFERENCES artists(id)
  );

  INSERT INTO genres(name) VALUES('Hip Hop');
  INSERT INTO genres(name) VALUES('RnB');
  INSERT INTO genres(name) VALUES('Soul');

  INSERT INTO artists(name, genre_id) VALUES('Kendrick Lamar', 1);
  INSERT INTO artists(name, genre_id) VALUES('Kanye West', 1);
  INSERT INTO artists(name, genre_id) VALUES('Frank Ocean', 2);
  INSERT INTO artists(name, genre_id) VALUES('Stevie Wonder', 3);

  INSERT INTO albums(name, artist_id) VALUES('My Beautiful Dark Twisted Fantasy', 2);
  INSERT INTO albums(name, artist_id) VALUES('Heartbreak 808', 2);
  INSERT INTO albums(name, artist_id) VALUES('To Pimp a Butterfly', 1);
  INSERT INTO albums(name, artist_id) VALUES('DAMN', 1);
  INSERT INTO albums(name, artist_id) VALUES('Blonde', 3);
  INSERT INTO albums(name, artist_id) VALUES('Channel Orange', 3);
  INSERT INTO albums(name, artist_id) VALUES('Talking Book', 4);
  INSERT INTO albums(name, artist_id) VALUES('Signed, Sealed, Delivered', 4);
  `;
  await client.query(SQL);
}

module.exports = {
  client, syncAndSeed
}
