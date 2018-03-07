# Koa Todos API

Based on https://github.com/dbalas/koalerplate

# Launch dev project
    - node > 8
    - docker
    - ```sh
        docker pull mongo
        docker run --name koa-todos-db -d mongo
    ```
    - Paste the docker's IPAddress in your env.local . You can find this address by typing 
    ```sh
        docker inspect koa-todos-db
    ```

    - ```sh
        npm install
        npm run serve
    ```

## Requirements 
    -- unit tests
    -- swagger (https://www.npmjs.com/package/swagger-koa)
    -- front
    -- websocket || server push
    -- CI


## Doc
    - http://mongoosejs.com/docs/guide.html
    - https://docs.mongodb.com/manual/reference/sql-comparison/#examples
    - https://facebook.github.io/jest/docs/en/getting-started.html
    - https://github.com/howardabrams/node-mocks-http
    - https://hub.docker.com/_/mongo/
