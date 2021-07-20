const express = require('express');
const dotenv = require('dotenv')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const fs = require('fs');
const port = process.env.PORT || 8040

// Setup envirnment
dotenv.config({path : './config.env'});
// Defining middlewares
app.use(express.json())
app.use(express.urlencoded());
app.use(cors())

// Database Setup
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
    .once('open', () => {
        console.log("Connection is successfully esteblished to the database")
    })
    .on('error', (error) => {
        console.log(`Conneciton error is ${error}`)
    })

const StateDistrictNameSchema = new mongoose.Schema(
    {
        state_id: Number,
        state_district: [
            {
                district_id: Number,
                district_name: String
            }
        ]
    }
)
const StateDistrictName = mongoose.model('statedistrictname', StateDistrictNameSchema)

// Routing
app.use(express.static(path.join(__dirname, './client/build')))
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
app.listen(port, () => {
    console.log(`Succeddfully connected on port ${port}`)
}
)
app.post('/', async (req, res) => {
    try {

        console.log(req.body, req.body.mainData);
        const state_distData = await {
            state_id: req.body.mainData.state_id,
            state_district: req.body.mainData.state_district
        }

        await StateDistrictName.create(state_distData, (err, done) => {
            if (!err) {
                res.status(200).send(JSON.stringify({ status: 'Sucessfully added on database' }))
                console.log(done);
            }
            else {
                res.send(JSON.stringify({ status: 'Error occured' }))
            }
        })
    }
    catch {
        console.log(err)
    }

})
app.post('/state_district', (req, res) => {
    const state_id = req.body.state_id;
    console.log(req.body);
    StateDistrictName.find({ state_id: state_id }, (err, result) => {
        if (!err) {
            res.status(200).send(result)
        }
        else {
            res.send(JSON.parse(err))
            console.log(err);
        }
    })
})