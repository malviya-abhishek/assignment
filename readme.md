# Backend Assignment | FamPay

[![Demo Video](https://drive.google.com/file/d/1wsJBaioltuC32UriyWAhcE4qworImtuR/view?usp=sharing)](https://drive.google.com/file/d/1wsJBaioltuC32UriyWAhcE4qworImtuR/view?usp=sharing)

Product requirement

1. Fetch videos from youtube async on schedule
2. Serve the above videos
3. Search from those videos
4. A basic dashboard as frontend

#

How to run the project

1. Clone the project.
2. Get Youtube API key.
3. Start a mongo instantance.
4. Create a .env file same as .env.default
5. Put youtube api keys, seprated by commas for example

```
NODE_ENV = dev
PORT = 5000
YOUTUBE_APIKEY = AIzaSyDFG58q0o6r_9Zt1thX4e,ASpvwmIJJzTY8fFMm9dWymbH-s,wahdiuhdiukwodija
MONGODB_URI = mongodb://localhost:27017/assignment
```

6. Run to install dependecy

```
    npm install
```

7. Run to start the project

```
    npm run start
```

8. Run to start development env

```
    npm run dev
```

9. Frontend will be served on `localhost:5000`

## To run with docker

1. Create a .env file
2. Run to build docker image

```
    docker compose build
```

3. Run to serve docker image

```
    docker compose up
```

4. Application will be served on `localhost:5000`

## API Reference

#### health-check

```http
  GET /health-check
```

#### Get videos

```http
  GET /videos/
```

| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `page`     | `number` | **Optional**. get the page      |
| `pageSize` | `number` | **Optional**. page size         |
| `search`   | `string` | **Optional**. match some string |

# Frontend

Application uses a react frontend

```
https://github.com/malviya-abhishek/frontend-assignment
```
