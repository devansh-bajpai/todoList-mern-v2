const express = require('express')
const app = express()

const cors = require('cors');

const Person = require('./models/Person');


app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.post('/save/user', (req, res) => {
    // console.log("POST Request Received")
    console.log(req.body);
})



app.listen(5000, () => {
    console.log("App is Listening on PORT 5000");
})