# Backend REST api built for Gekko

## What is Gekko?
Gekko is an online polling/QNA community where you can post Polls/QNAs to a wide range of audiences! (Created for the Congressional App Challenge)

## Setup server
``` bash
# Install the dependencies
npm install
# Run nodemon server - runs on port 3030
npm run dev
# Run node server
npm start
```
## Backend Routes
GET / -> returns welcome message

POST /auth/register 
 * body: { username, password, bio } -> creates user

POST /auth/login 
 * body: { username, password } -> user login, returns JWT auth token


