# Boilerplate for Node-Express with sequelize ORM

A boilerplate for any enterprise rest api or service with Node.js, Express and Sequelize ORM for mysql, postgresql or others.

By running this project you will get a production ready environment with all necessary supports for validation, unit testing, socket, redis and many more.

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/aoyan107/node-express-mysql-boilerplate
cd node-express-mysql-boilerplate
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```


Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
#Server environment
NODE_ENV=development
#Port number
PORT=5000

#Db configuration
DB_HOST=db-host
DB_USER=db-user
DB_PASS=db-pass
DB_NAME=db-name


# JWT secret key
JWT_SECRET=your-jwt-secret-key
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=5
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30


```

## License

[MIT](LICENSE)
