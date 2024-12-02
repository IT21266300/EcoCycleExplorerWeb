import express from 'express';

// import sign in routes
// import SignRouter from '../routes/signinRoutes/signin.js';

// import NTInfo routes
// import civilInfoRouter from '../routes/towerInfoRoutes/civilInfoRouter.js';

import DestinationRoute from '../routes/destinations/index.js'

const app = express.Router();


// make router paths

app.use('/destination', DestinationRoute);

export default app;
