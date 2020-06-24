/**
 * Required External Modules
 * 
 */
require('dotenv').config();
const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser")
const cors = require("cors");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.use(bodyParser.json());
app.use(cors())

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
});

// https://api.themoviedb.org/3/search/movie?api_key=
app.post('/searchMovies', (req, res) => {        
    const { searchTerm } = req.body;        

    axios.get(`${process.env.MOVIE_URL}search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${searchTerm}/`)
        .then(response => {
            console.log('----RESPONSE----');
            console.log(response.data);        
            const { data } = response;            
            res.json( { data } )
    })
    .catch(err => {
        console.log("-----ERROR-----");
        console.log(err);        

        res.send(err);
    });
});


app.get('/getMovies', (req, res) => {
    console.log("----REQUEST OBJECT----");
    // console.log(req.query);
    const { page } = req.query;     
    axios.get(`${process.env.MOVIE_URL}movie/popular?api_key=${process.env.API_KEY}&page=${parseInt(page)}&language=en-US/`)
        .then(response => {   
            const { data } = response;            
            console.log("----DATA----")
            console.log(data);
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