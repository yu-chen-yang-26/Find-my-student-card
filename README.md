# Find My Student Card

This is the final project of the National Taiwan University Programming User Interface course in the second semester of 2022.

## How to run this project

1. download this source code from GitHub. You can do that via `git clone` or download with zip file.
2. open 2 command line tools / terminals, both changed directory to this project directory, one for frontend and the other for backend.

### frontend

1. choose one of the command line, and change directory to `frontend/`
2. use `yarn install` to download necessary packages. (Yarn is a package manager. You can refer to [yarn's offical website](https://classic.yarnpkg.com/lang/en/docs/install) to install it.)
3. `yarn start` to start execution

This is all the command you need

```sh
cd frontend
yarn install
yarn start
```

### backend

1. choose the other command line, and change directory to `backend/`
2. we use mongo DB as our database, so you will need to either [download a local mongo database](https://www.mongodb.com/docs/manual/administration/install-community/) or [register Mongo DB Atlas online service](https://www.mongodb.com/docs/atlas/). You will need to create a new database called `lost_found`.
3. create a file called `.env`, designate the link to database with `MONGO_URL` and server port with `PORT` in the file.
   Example `.env` file

```
# if you uses local mongo database
MONGO_URL=mongodb://localhost:27017/lost_found
PORT=4000
# if you uses mongo db Atlas
MONGO_URL=mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/lost_found?retryWrites=true&w=majority
PORT=4000
```

4. install packages and run with npm (npm is the package manager for NodeJS, please refer to [NodeJS offical websit](https://nodejs.org/en/download) to install Node and npm)

This is all the command you need. Please note that it will execute correctly only if it has a `.env` file and a valid mongo database connection url in the file.

```sh
cd backend
npm install
npm run start
```
