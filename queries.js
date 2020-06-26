const { Pool } = require('pg');


const pool = new Pool({
    user: 'api_user',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'movies_db',
})


const getUsers = (req, res) => {
    pool.query('SELECT * FROM users;', (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results.rows);
        res.status(200).json(results.rows);
    });
}

module.exports = {
    getUsers,
}




