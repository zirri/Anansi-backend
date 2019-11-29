const express = require('express');
const cors = require('cors');
const swipe = require('./src/swipeApi');
const library = require('./src/libraryApi');
const bodyParser = require('body-parser')
const app = express();
const userFunctions = require('./src/userFunctions')

//Middleware
app.use(cors());
app.use(bodyParser());

app.use('user/:userId', (req, res, next) => {
    const userID = req.params.userId;
    userFunctions.validateUser(userID);
    next();
})

//Defining endpoints and returns
app.use('/swipe', swipe);
app.use('/library', library);

app.use('/', (req, res,next) =>{
    res.status(404).send("Page not found")
})

//Starting listening
const port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log('Listening to port: '+port)
})