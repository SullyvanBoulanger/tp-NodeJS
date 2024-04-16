# tp-NodeJS

- [tp-NodeJS](#tp-nodejs)
  - [Installation](#installation)
  - [Start the project](#start-the-project)
  - [Routes](#routes)
  - [FAQ](#faq)

## Installation

1. Install dependencies

```bash
npm i
```

2. Configure your `.env` file like follow

```js
// This app uses SQLITE, you can specify the path where you want to be your database file or use yours.
// Default value : db.sqlite
DATABASE_PATH=...
// Configure your port where the server will run
// Default value : 3000
PORT=...
```

## Start the project

1. Start the server

```bash
npm start
```

## Routes

Here is the differents routes that you can use :

```md
GET /game/play/rock
GET /game/play/paper
GET /game/play/scissors

GET /game/score
GET /game/scores

POST /game/restart

PUT /game/score/:win/:lose/:tie
```

## FAQ

> Why do I create a new score instance and get the last one instead of reset all values of the first ?

I wanted to keep a trace of all games played.
