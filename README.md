# cityPopulation

This service provides a simple RESTful API for querying and updating the population of cities within states.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Built With](#built-with)
- [Database Credentials](#database-credentials)

## Getting Started

Follow these instructions to get a copy of the service up and running on your local machine.

### Prerequisites

- Node.js v18
- npm

### Installation

1. Clone the repository:

git clone [https://github.com/dhightnm/cityPopulation]

2. Navigate to the project directory:

cd cityPopulation

3. Install dependencies:

npm install

4. Start the service:

npm start

The service should be running on `http://127.0.0.1:5555/`.

## Connecting to the Database

Our application uses PostgreSQL as the primary data storage. Here's how you can connect to the database using the setup you've implemented:

### Prerequisites:

1. **PostgreSQL**: Ensure you have PostgreSQL installed on your machine. If not, you can download and install it from [here](https://www.postgresql.org/download/).

2. **Database Credentials**: The application assumes the following default credentials for connecting to the local PostgreSQL instance:
   - **User**: `example`
   - **Host**: `localhost`
   - **Database**: `example`
   - **Password**: `example`
   - **Port**: `5432`

## Usage

1. **Get Population of a City in a State**

   `GET http://127.0.0.1:5555/api/population/state/:state/city/:city`

   Example: `GET http://127.0.0.1:5555/api/population/state/Florida/city/Orlando`

2. **Update or Add Population for a City in a State**

   `PUT http://127.0.0.1:5555/api/population/state/:state/city/:city`

   Example: `PUT http://127.0.0.1:5555/api/population/state/Florida/city/Orlando`

   Body: Plain text containing the population number. e.g. `250000`.

## Built With

- [Fastify](https://www.fastify.io/) - Web framework
- [pg](https://node-postgres.com/) - PostgreSQL client for Node.js