/**
 * Required External Modules
 * 
 */
require('dotenv').config();
const express = require("express");
const axios = require('axios');
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */



/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    

});


app.get('/getMovies', (req, res) => {

    axios.get(`${process.env.MOVIE_URL}?api_key=${process.env.API_KEY}`).then(res => {
        console.log('res:'. res);
    })        


});
/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);


 });