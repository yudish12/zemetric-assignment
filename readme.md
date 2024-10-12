## Zemetric SMS RateLimitter/Logger App

This webapp is a ratelimiter and logger for Zemetruc SMS API Assignment. It is built using React, Node.js, Express.js, Sequelize, Redis (Aiven Cloud Services). It has a public API for sending SMS which will be ratelimited and logged on basis of the user's IP address and the number of SMS sent to that Phone Number. This app also has a dashboard to view the logs and ratelimits.

## Features

- Rate Limiting on basis of the user's IP address and the number of SMS sent to that Phone Number
- Logging on basis of the user's IP address and the number of SMS sent to that Phone Number
- Dashboard to view the logs and ratelimits
- Authentication using JWT tokens

## Approah

- For ratelimiting, I have used redis to store the ratelimits. For logging, I have used a PostgreSQL database to store the logs. The frontend uses React and the backend uses Node.js and Express.js. The frontend is built using Tailwind CSS and Context API.

- In my redis cache I create two keys using ip address and phone number. One is for minute ratelimit and the other is for day ratelimit.
  The keys values are the number of SMS sent to that phone number from the given IP address in that minute/day. If it exceeds the ratelimit, the request is rejected with a 429 status code and setting the Retry-After header to the time at which the ratelimit will be reset.

- In my PostgreSQL database, I create a table called Sms which stores the logs of the SMS sent to that phone number from that IP address. That table is synced with the redis cache in the ratelimiter middleware.

- These persistent data stores are used to store the logs and ratelimits. The react dashboard at /dashboard uses the data from the postgres database to display the logs and ratelimits.

## Frontend Technologies

- React
- React Router
- Tailwind CSS
- Context API

## Backend Technologies

- Node.js
- Express.js
- Sequelize
- Redis (Aiven Cloud Services)

## Clone Repository

```bash
git clone https://github.com/yudish12/vashfoods-assignmen.git
```

## Backend Setup

```bash
# Change directory to the backend project
cd vashfoods-assignmen/backend

# Install dependencies
npm install

# Create a .env file in the backend directory and add the following variables:
# I have given my variables to ensure you don't have to go through the hassle of creating accounts
PROD_DB_USERNAME=avnadmin
PROD_DB_PASSWORD=AVNS_iOA9UXSFABs1uJb7Xcm
PROD_DB_NAME=sms-logger
PROD_DB_HOST=pg-1ba9e0c1-yudishchakrawarty3042-56f0.e.aivencloud.com
PROD_DB_PORT=13036
REDIS_SERVICE_URI=redis://default:AVNS_4NKIV5aKLv4I2UKJH-0@redis-1d57d2dd-yudishchakrawarty3042-56f0.a.aivencloud.com:13036
JWT_SECRET=secret
ENV=production
JWT_EXPIRE=48h


# Start the development server
node app.js
```

## Frontend Setup

```bash
# Change directory to the frontend project
cd vashfoods-assignmen/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Go to http://localhost:5173 to view the app**
