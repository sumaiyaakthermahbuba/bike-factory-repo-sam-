const express= require("express");
const app= express();
const cors = require('cors');
app.use(express.static('public'));
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
module.exports= app;