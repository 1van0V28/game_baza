
CREATE TABLE developers (
	id SERIAL NOT NULL, 
	name VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (name)
)

;


CREATE TABLE genres (
	id SERIAL NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (name)
)

;


CREATE TABLE platforms (
	id SERIAL NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (name)
)

;


CREATE TABLE publishers (
	id SERIAL NOT NULL, 
	name VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (name)
)

;


CREATE TABLE stores (
	id SERIAL NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	url VARCHAR(500), 
	PRIMARY KEY (id), 
	UNIQUE (name)
)

;


CREATE TABLE games (
	id SERIAL NOT NULL, 
	title VARCHAR(500) NOT NULL, 
	description TEXT, 
	release_date DATE, 
	image_url VARCHAR(1000), 
	developer_id INTEGER, 
	publisher_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(developer_id) REFERENCES developers (id) ON DELETE SET NULL, 
	FOREIGN KEY(publisher_id) REFERENCES publishers (id) ON DELETE SET NULL
)

;


CREATE TABLE genres_games (
	genre_id INTEGER NOT NULL, 
	game_id INTEGER NOT NULL, 
	PRIMARY KEY (genre_id, game_id), 
	FOREIGN KEY(genre_id) REFERENCES genres (id) ON DELETE CASCADE, 
	FOREIGN KEY(game_id) REFERENCES games (id) ON DELETE CASCADE
)

;


CREATE TABLE offers (
	id SERIAL NOT NULL, 
	game_id INTEGER NOT NULL, 
	store_id INTEGER NOT NULL, 
	platform_id INTEGER, 
	store_game_link VARCHAR(1000), 
	price_original NUMERIC(10, 2), 
	price_discount NUMERIC(10, 2), 
	discount_percent INTEGER, 
	is_free BOOLEAN NOT NULL, 
	reviews_count INTEGER, 
	positive_percent INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(game_id) REFERENCES games (id) ON DELETE CASCADE, 
	FOREIGN KEY(store_id) REFERENCES stores (id) ON DELETE CASCADE, 
	FOREIGN KEY(platform_id) REFERENCES platforms (id) ON DELETE SET NULL
)

;


CREATE TABLE platforms_games (
	platform_id INTEGER NOT NULL, 
	game_id INTEGER NOT NULL, 
	PRIMARY KEY (platform_id, game_id), 
	FOREIGN KEY(platform_id) REFERENCES platforms (id) ON DELETE CASCADE, 
	FOREIGN KEY(game_id) REFERENCES games (id) ON DELETE CASCADE
)

;

