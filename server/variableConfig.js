require('dotenv').config({ path: './.env' })



// setting up enviroment variables for use in multiple folders
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT,
    DB_USER: process.env.DB_USER, 
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_COUNTY_COLLECTION: process.env.DB_COUNTY_COLLECTION,
}
