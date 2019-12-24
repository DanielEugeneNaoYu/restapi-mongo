# restapi-mongo

REST API interacted with MongDB for Lexiverse [flashcard](https://github.com/DanielEugeneNaoYu/flashcard) and game.

## API List
### Get all cards in the deck
`GET /`

### Get card by jlpt level and type in the deck 
`GET /:jlpt/:type`

### Get card by id
`GET /:id`

### Add new card
`POST /`

### Edit card by id
`PATCH /:id`

### remove card by id
`DELETE /:id`



## Installing Dependencies and Startup

To install dependencies:

    yarn install

To run the app:

    yarn start