const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const api = require('./api')
const path = require('path')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/media", express.static(path.join(__dirname, 'media')));
app.listen(8080, () => {
    console.log('Server started on port')
})

api(express, app)