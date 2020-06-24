/**
 * Required External Modules
 * 
 */
require('dotenv').config();
const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser")
const cors = require("cors");
const  passport  =  require('passport');
const  LocalStrategy  =  require('passport-local').Strategy;
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";


const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}


const auth = () => {
    return (req, res, next) => {
        passport.authenticate('local', (error, user, info) => {
            if(error) res.status(400).json({"statusCode" : 200 ,"message" : error});
            req.login(user, function(error) {
                if (error) return next(error);
                next();
            });
        })(req, res, next);
    }
}
/**
 *  App Configuration
 */

app.use(bodyParser.json());
app.use(cors())

app.use(passport.initialize());
app.use(passport.session());

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


app.post('/authenticate', auth() , (req, res) => {
    res.status(200).json({"statusCode" : 200 ,"message" : "hello"});
});

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
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