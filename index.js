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

// https://api.themoviedb.org/3/search/movie?api_key=
app.post('/searchMovies', (req, res) => {        
    const { searchTerm } = req.body;        
    console.log(`${process.env.MOVIE_URL}search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${searchTerm}/`);
    axios.get(`${process.env.MOVIE_URL}search/movie?api_key=${process.env.API_KEY}&language=en-US&page=1&query=${searchTerm}/`)
        .then((response) => {
            console.log('----RESPONSE----');
            console.log(response.data);        
            const { data } = response;            
            res.json( {data} )
    })
    .catch(err => {
        console.log("-----ERROR-----");
        console.log(err);        

        res.send(err);
    });
});


app.get('/getMovies', (req, res) => {
    console.log(`${process.env.MOVIE_URL}movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1/`);
    axios.get(`${process.env.MOVIE_URL}movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1/`)
        .then((response) => {
            // console.log('----RESPONSE----');
            // console.log(response.data);        
            const { data } = response;            
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