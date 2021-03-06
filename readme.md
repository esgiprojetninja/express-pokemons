# Express Pokemon API

[![Build Status](https://travis-ci.org/esgiprojetninja/express-pokemons.svg?branch=master)](https://travis-ci.org/esgiprojetninja/express-pokemons)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fd66d11196ca4ec8826ce52f32e6df4e)](https://app.codacy.com/app/dydyFos/express-pokemons?utm_source=github.com&utm_medium=referral&utm_content=esgiprojetninja/express-pokemons&utm_campaign=badger)


Based on http://expressjs.com

# Launch dev project
- node > 8
- docker
```sh
    docker pull mongo
    docker run --name express-pokemons-db -d mongo
```
- Paste the docker's IPAddress in your env.local . You can find this address by typing 
```sh
    docker inspect express-pokemons-db
```

```sh
    npm install
    npm run serve
```

- Make sure you create your .env.local following the .env.sample

## Requirements 
- unit tests
- swagger (https://www.npmjs.com/package/swagger-node-express)
- front (https://github.com/esgiprojetninja/ninjaPokedex/tree/master/public/js)
- websocket || server push
- CI


## Doc
- http://mongoosejs.com/docs/guide.html
- https://docs.mongodb.com/manual/reference/sql-comparison/#examples
- https://facebook.github.io/jest/docs/en/getting-started.html
- https://hub.docker.com/_/mongo/
