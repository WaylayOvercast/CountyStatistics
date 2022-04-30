const { NODE_ENV, PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_COUNTY_COLLECTION } = require('./variableConfig');
const NodeCouchDB = require('node-couchdb');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');

const corsOptions = {
    origin: '*',
}

const couch = new NodeCouchDB({
    auth: {
        user:`${DB_USER}`,
       password:`${DB_PASSWORD}`
    }
});

couch.listDatabases()
.then((list) => {
    console.log(list)
})
.catch((err) => {
    console.error(err)
});

const server = express();
server.use(express.json(), cors(corsOptions));

server.get('/map', async (req, res) => {
    try {
        const countyObj = await couch.get(DB_NAME, `/${DB_COUNTY_COLLECTION}/counties.json` )

        res.status(200).json(countyObj.data)
    } catch (err) {
        console.error(err)
    }
});

server.get('/map/education', async (req, res) => {
    try {
        const countyEdu = await couch.get(DB_NAME, `/${DB_COUNTY_COLLECTION}/county_education.json` )

        res.status(200).json(countyEdu.data)
    } catch (err) {
        console.error(err)
    }
})

server.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}, env: ${NODE_ENV}`)
})