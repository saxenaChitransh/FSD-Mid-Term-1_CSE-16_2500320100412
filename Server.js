
const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to Express Application");
});

// Server configuration
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
