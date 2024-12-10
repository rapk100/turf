const port = process.env.PORT || 8005;
const express = require('express');
const cors = require('cors');

const connect = require('./connection');
const credadminroute = require('./routes/admincredrouting');
const creduserroute = require('./routes/usercredrouting');
const turfinforoute = require('./routes/turfinforouting');
const turfschroute = require('./routes/turfschedulingrouting');
const userprofileroute = require('./routes/userprofilerouting');
const bookturfroute = require('./routes/bookrouting');
const fetchdtlsroute = require('./routes/fetchturfdtlsrouting');
const userhistoryrouting = require('./routes/userhistoryrouting');

const app = express(); // middleware

// Database connection
connect(); 

// Middleware
app.use(cors());   
app.use(express.json());

// Routes
app.use('/adminlogin', credadminroute);
app.use('/userlogin', creduserroute);
app.use('/turfinfo', turfinforoute);
app.use('/turfschedule', turfschroute);
app.use('/userprofile', userprofileroute);
app.use('/bookturf', bookturfroute);
app.use('/turfhistory', fetchdtlsroute);
app.use('/userhistory', userhistoryrouting);

// Scheduler
const crontask = require('./scheduler/turfstatusupdate');

// Start the server with error handling
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Application running on port ${port}`);
    }
});
