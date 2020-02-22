module.exports = function(express, app) {

    const user = require('./routes/user')
    const survey = require('./routes/survey')
    const image = require('./routes/image')


    const userRoutes = express.Router()
    const surveyRoutes = express.Router()
    const imageRoutes = express.Router()


    app.use('/user', userRoutes)
    app.use('/survey', surveyRoutes)
    app.use('/image', imageRoutes)



    user(userRoutes)
    survey(surveyRoutes)
    image(imageRoutes)



    
}