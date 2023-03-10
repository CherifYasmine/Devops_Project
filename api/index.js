const express = require('express');
var cors = require("cors");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var cardRouter = require("./routes/Card")
var columnRouter = require("./routes/Column")
const uuid = require('uuid');
const rateLimit = require('express-rate-limit')

const client = require('prom-client');
const {requestCounter} = require('./metrics')
const app = express();


dotenv.config();
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
    skip: (req) => {
        const { path } = req;
        const skipPaths = ['/metrics'];
        return skipPaths.includes(path);
    }
})

app.use(limiter)

app.use((req, res, next) => {
    req.requestId = uuid.v4();
    next();
});


app.get('/api', (req, res) => {
    try{
        requestCounter.inc({'route': '/', 'status_code': 200, 'requestType':'get'})
        res.send('Welcome to Kanban Project!');
    }catch(err){
        requestCounter.inc({'route': '/', 'status_code': 400, 'requestType':'get'})
    }
})

app.get('/metrics', async (req, res) => {
    try{
        return res.status(200).send(await client.register.metrics())
    }
    catch(err){

    }
})

app.use("/api/card", cardRouter);
app.use("/api/column", columnRouter);


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Connected to database and running on port ${PORT}`)))
    .catch((error) => console.log(error));
module.exports = app;