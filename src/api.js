const express = require('express');
const app = express();
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');


// const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cookieParser());

app.use(cors());
app.options('*', cors());


const router = require("./router");


// app.get('/', verifyToken, (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/unique-visitors', verifyToken, async(req, res) => {
//     const response = {
//         website: CONSTANTS.PORTFOLIO_WEBSITE,
//         time: new Date(),
//         uniqueVisitors : 0
//     }
//     try{
//         const uniqueVisitors = await getUniqueVisitors() || 0;
//         response.uniqueVisitors = uniqueVisitors;
//     }catch(err){
//         console.log("Error Occured", err);
//     }

//     res.send(response);
// })

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);