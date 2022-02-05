const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
var bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/getCity', function (req, res) {
    const city = req.body.city
    const uppercase = city.charAt(0).toUpperCase() + city.slice(1)

    axios.get(`https://www.haberturk.com/dynamics/rdsget230/Weather:TR:${uppercase}`).then(function (response) {
        data = JSON.stringify(response.data.weekly)
        parse = JSON.parse(data)

        res.render('data', parse);
    }).catch(function (err) {
        res.send(err, "There is no data")
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})