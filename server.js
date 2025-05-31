const express = require('express');
const app = express();
const port = 3000;

// Middleware hook to log incoming requests
function requestLoggerHook(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

// Hook to modify response headers
function headerModifierHook(req, res, next) {
  res.setHeader('X-Custom-Hook', 'Activated');
  next();
}

// Useless hook that just logs a random number
function randomNumberHook(req, res, next) {
  const randomNum = Math.floor(Math.random() * 100);
  console.log(`Random number generated: ${randomNum}`);
  next();
}

// Useless hook that delays response by 1 second
function delayResponseHook(req, res, next) {
  setTimeout(() => {
    console.log('Delayed by 1 second for no reason');
    next();
  }, 1000);
}

// Apply hooks as middleware
app.use(requestLoggerHook);
app.use(headerModifierHook);
app.use(randomNumberHook);
app.use(delayResponseHook);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the server with useless hooks!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
