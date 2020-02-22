let surveys = {}
let id = 0
const { SUCCESS, ERROR } = require("../../utils/helper");

module.exports.create = function(req, res) {
    let questions = req.body.questions.map((d,i) => { return {id: i, text: d} })
    surveys[id] = {
        // id: id,
        name: req.body.name,
        questions,
        createdBy: {
            username: req.user.username,
            password: req.user.password
        }
    }
    id++
    SUCCESS(res, surveys)
}

module.exports.take = function(req, res) {
    // survey_id: 1, answers: [{question_id, answer}]
    let responses = {
        username: req.user.username,
        answers: req.body.answers,
    }
    surveys[req.body.survey_id.toString()].responses = surveys[req.body.survey_id.toString()].responses || {}
    surveys[req.body.survey_id.toString()].responses[req.user.username] = responses
    SUCCESS(res, surveys)
}

module.exports.get = function(req, res) {
    if(req.query.id)
        SUCCESS(res, surveys[req.query.id.toString()])
    else
        SUCCESS(res, surveys)
}

module.exports.getByUsername = function(req, res) {
    let usersSurvey = []
    Object.keys(surveys).forEach(survey_id => {
        if(surveys[survey_id].responses[req.query.username]){
            let user = {...surveys[survey_id].responses[req.query.username], survey_id: survey_id}
            usersSurvey.push(user)
        }
    })
    SUCCESS(res, usersSurvey)
}

module.exports.deleteSurvey = function(req, res) {
    delete surveys[req.query.id.toString()]
    SUCCESS(res, 'Delete Success')
}