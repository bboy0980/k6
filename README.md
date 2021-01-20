### K6 load testing tool

## Does not run in NodeJS

JavaScript is not generally well suited for high performance. To achieve maximum performance, the tool itself is written in Go, embedding a JavaScript runtime allowing for easy test scripting.
So, no easy way to import npm modules or libraries using NodeJS APIs.

## Executing

`docker-compose run --rm search-api`