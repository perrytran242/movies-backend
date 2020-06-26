/**
 * Required External Modules
 * 
 */
require('dotenv').config();
const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser")
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./queries');
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

// const { Client } = require('pg');

// const client = new Client({
//     user: "api_user",
//     password: "password",
//     port: 5432,
//     database: "api"
// });


// client.connect()
// .then(() => console.log('connected successfully'))
// .then(() => client.query("select * from"))
// .catch(e => console.log(e))
// .finally(() => client.end());
/**
 *  App Configuration
 */

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());


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

passport.use(new LocalStrategy(
    function(username, password, done) {        
        if(username === "admin" && password === "admin"){
            return done(null, username);
        } else {
            return done("unauthorized access", false);
        }
    }
)); 

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
  
passport.deserializeUser(function(id, done) {
    done(null, id);
});

/**
 * Routes Definitions
 */

app.get('/users', db.getUsers)

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
    res.status(200).json({"statusCode" : 200 ,"message" : "authorized!"});
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