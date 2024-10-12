## Zemetric SMS RateLimitter/Logger App

This webapp is a ratelimiter and logger for Zemetruc SMS API Assignment. It is built using React, Node.js, Express.js, Sequelize, Redis (Aiven Cloud Services). It has a public API for sending SMS which will be ratelimited and logged on basis of the user's IP address and the number of SMS sent to that Phone Number. This app also has a dashboard to view the logs and ratelimits.

## Features

- Rate Limiting on basis of the user's IP address and the number of SMS sent to that Phone Number
- Logging on basis of the user's IP address and the number of SMS sent to that Phone Number
- Dashboard to view the logs and ratelimits
- Authentication using JWT tokens

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
