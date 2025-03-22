const express = require('express')
const app = express()

const cors = require('cors');

const Person = require('./models/Person');

var bcrypt = require('bcryptjs');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());


app.post('/save/user', async (req, res) => {
    // console.log("POST Request Received")
    if (req.body.password != req.body.confirmpassword){
        res.json({message: "Passwords do not match"})
    }
    else {
        let userData = await Person.findOne({email: req.body.email});
        if (userData){
            res.json({message: "User already exists"})
        }
        else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);

            try{
                let personDetails = await Person.create({
                    fullname: req.body.name,
                    email: req.body.email,
                    password: hash
                })
                res.json({message: "User Created!"})
            }
            catch{
                res.json({message: "There was a problem."})
            }

            
        }
    }
})

app.post("/authenticate", async (req, res) => {
    let personData = await Person.findOne({email: req.body.email});
    if(!personData){
        res.json({message: "User does not exist"})
    }
    else{
        if (bcrypt.compareSync(req.body.password, personData.password)){
            res.json({message: "Logged in"})
        }
        else {
            res.json({message: "Incorrect email or password"})
        }
    }
})



app.listen(5000, () => {
    console.log("App is Listening on PORT 5000");
})