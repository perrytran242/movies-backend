/**
 * Required External Modules
 * 
 */
require('dotenv').config();
const express = require("express");
const axios = require('axios');
const path = require("path");
const bodyParser = require("body-parser")


/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */

app.use(bodyParser.json());

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
});


app.post('/getMovies', (req, res) => {  
    console.log(req.body)      
    const { searchTerm } = req.body;
    console.log('----SEARCH TERM----');
    console.log(searchTerm);
    // const parsedBody = JSON.parse(req.body.searchTerm);
    // console.log(parsedBody);
    axios.get(`${process.env.MOVIE_URL}${process.env.API_KEY}&language=en-US&page=1&query=${searchTerm}/`)
        .then((response) => {
            console.log('----RESPONSE----');
            console.log(response.data);        
            const { data } = response;
            // let stringify = JSON.stringify(response)
            // res.send(JSON.stringify({data: response}));
            res.json({data})
    })
    .catch(err => {
        console.log("-----ERROR-----");
        console.log(err);        

        res.send(err);
    });
    
});
/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);


 });