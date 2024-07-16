const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../API/swagger.json');
const { MONGO_DB_CONFIG } = require('../API/config/app.config.js');
const {errorHandler} = require('./middleware/errors.js');
const categoryRoutes = require('./routes/app.routes.js');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
})
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((error) => {
        console.log("Could not connect to MongoDB... " + error);
    });

// Middleware to parse JSON requests
app.use(express.json());

// Static file serving
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api',categoryRoutes);

// Error handling middleware
app.use(errorHandler);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
