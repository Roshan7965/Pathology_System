const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

// Apply Middlewares
app.use(cors());
app.use(bodyParser.json());

// Database connection
require('./connection.js');

// Import routes
const TestRoute = require('./Routes/testRoutes.js');
const PatientRoute = require('./Routes/patientRoutes.js');

// Use routes
app.use('/test', TestRoute);
app.use('/patient', PatientRoute);

// Start the server
app.listen(PORT)
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
    } else {
      console.error(`Server error: ${err.message}`);
    }
  })
  .on('listening', () => {
    console.log(`Server is running on port ${PORT}`);
  });
