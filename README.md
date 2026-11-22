# Express Error Kit — Interactive Web Demo

**A live full-stack demonstration of a published Express.js error-handling NPM package.**

**[Live Application](https://express-error-kit-web-demo.vercel.app/) · [NPM Package](https://www.npmjs.com/package/express-error-kit-siri) · [Package Source](https://github.com/maddikasirireddy/express-error-kit)**

## Overview

This project demonstrates how a reusable NPM package can be integrated into a real Express application.

It uses a simple user-lookup interface to demonstrate successful API responses, custom HTTP errors, and unexpected server failures.

The purpose is not to build a user database. It is to show how **Express Error Kit** simplifies backend error handling and provides consistent responses to a frontend application.

## Live Demo

**[Launch the Application](https://express-error-kit-web-demo.vercel.app/)**

The application provides a user ID input, a **Find User** button, and a **Test Server Error** button.

### Test Scenarios

| Action | HTTP status | Result |
|---|---|---|
| Search ID `1` | 200 | Returns Siri |
| Search ID `2` | 200 | Returns Alex |
| Search ID `99` | 404 | Returns `USER_NOT_FOUND` |
| Click Test Server Error | 500 | Returns `INTERNAL_ERROR` |

Only IDs `1` and `2` exist in the demo's sample dataset. Other IDs intentionally demonstrate the custom error-handling workflow.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| NPM dependency | `express-error-kit-siri` |
| HTTP requests | Browser Fetch API |
| Hosting | Vercel |
| Version control | Git and GitHub |

## How the Application Works

```text
User enters an ID
        |
        v
HTML / JavaScript frontend
        |
        | fetch("/users/:id")
        v
Express backend
        |
        +---- User exists ----> HTTP 200
        |
        +---- User missing
                  |
                  v
              AppError
                  |
                  v
             asyncHandler
                  |
                  v
             errorHandler
                  |
                  v
           HTTP 404 JSON response
                  |
                  v
             Browser UI
```

The frontend sends requests to Express. The backend imports the published NPM package and uses its utilities to handle errors.

The frontend then displays the returned HTTP status and JSON response.

## NPM Package Integration

This application installs **Express Error Kit** from the public NPM registry.

```bash
npm install express-error-kit-siri
```

The Express backend imports all three utilities:

```javascript
const {
  AppError,
  asyncHandler,
  errorHandler
} = require("express-error-kit-siri");
```

### Custom 404 error

```javascript
if (!user) {
  throw new AppError(
    "User not found",
    404,
    "USER_NOT_FOUND"
  );
}
```

### Handling asynchronous failures

```javascript
app.get("/server-error", asyncHandler(async () => {
  throw new Error("Demonstration server error");
}));
```

### Centralized error middleware

```javascript
app.use(errorHandler);
```

This middleware formats errors consistently rather than requiring separate response-handling logic in each route.

## Example Responses

### Successful request — HTTP 200

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Siri"
  }
}
```

### Missing user — HTTP 404

```json
{
  "success": false,
  "error": {
    "message": "User not found",
    "code": "USER_NOT_FOUND",
    "statusCode": 404
  }
}
```

### Server failure — HTTP 500

```json
{
  "success": false,
  "error": {
    "message": "Internal Server Error",
    "code": "INTERNAL_ERROR",
    "statusCode": 500
  }
}
```

The 500 example reflects production-mode error messaging.

## Project Structure

```text
express-error-kit-web-demo/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/maddikasirireddy/express-error-kit-web-demo.git
cd express-error-kit-web-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the application

```bash
npm start
```

### 4. Open the application

Visit:

http://localhost:3000

Try user IDs `1`, `2`, and `99`, then click **Test Server Error**.

## Deployment

The application is deployed on **Vercel** and connected to its GitHub repository.

The deployed application demonstrates that the published package can be installed and used in a hosted Express backend.

**Live URL:** https://express-error-kit-web-demo.vercel.app/

## What This Project Demonstrates

- Installing and integrating a published NPM package
- Building a simple frontend using HTML, CSS, and JavaScript
- Connecting the frontend to an Express API
- Creating custom HTTP errors
- Handling asynchronous failures
- Returning consistent JSON responses
- Deploying a Node.js application to Vercel

## Related Project

The underlying error-handling library was developed and published separately.

**Package repository:** https://github.com/maddikasirireddy/express-error-kit

**NPM registry:** https://www.npmjs.com/package/express-error-kit-siri

## Author

**Maddika Siri Reddy**

[GitHub](https://github.com/maddikasirireddy)
