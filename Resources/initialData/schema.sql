DROP TABLE bitcoin;
DROP TABLE litecoin;
DROP TABLE etherium;
DROP TABLE doge;
DROP TABLE federal_deficit;



CREATE TABLE bitcoin (
  bitcoin_id SERIAL PRIMARY KEY,
  trade_date DATE,
  open_price DECIMAL,
  close_price DECIMAL
);

CREATE TABLE litecoin (
  litecoin_id SERIAL PRIMARY KEY,
  trade_date DATE,
  open_price DECIMAL,
  close_price DECIMAL
);

CREATE TABLE etherium (
  etherium_id SERIAL PRIMARY KEY,
  trade_date DATE,
  open_price DECIMAL,
  close_price DECIMAL
);

CREATE TABLE doge (
  doge_id SERIAL PRIMARY KEY,
  trade_date DATE,
  open_price DECIMAL,
  close_price DECIMAL
);

CREATE TABLE federal_deficit (
  deficit_id SERIAL PRIMARY KEY,
  year SMALLINT,
  federal_deficit BIGINT
);