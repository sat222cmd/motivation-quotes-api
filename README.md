# Motivation Quotes API

A Node.js and Express API that serves motivational quotes with an API key authentication and rate limiting system. Uses MongoDB for storing API keys and usage tracking.

## Features

- GET /api/motivation/random - Returns a random motivational quote in JSON format.
- User registration to generate unique API keys.
- API key validation middleware.
- Rate limiting per API key:
  - Free tier: 50 requests per day.
  - Pro tier: 10,000 requests per day.
- Usage tracking per API key.
- Modular code structure for easy maintenance.
- Ready to deploy on free hosting platforms like Render or Railway.

## Folder Structure

```
/api/motivation
/middleware/auth
/models
/utils
server.js
```

## Setup & Run

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file based on `.env.example` and provide your MongoDB URI.
4. Start the server: `node server.js`
5. Register a user to get an API key:
   ```
   POST /api/motivation/register
   ```
6. Use the API key to access:
   ```
   GET /api/motivation/random
   ```
   Include the API key in header `x-api-key` or query parameter `apiKey`.

## Dependencies

- express
- mongoose
- nanoid
- dotenv

## License

MIT License
