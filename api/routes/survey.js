module.exports = function(serveyRoutes) {
    const { create, get, take, getByUsername, deleteSurvey } = require('../controllers/survey')
    const { handleToken, asyncMiddleware, checkParamsPOST, checkParamsGET } = require('../../utils/middleware')

    serveyRoutes.post('/create', [handleToken, checkParamsPOST(["name", "questions"]) ,asyncMiddleware(create)]);
    serveyRoutes.get('/get', [handleToken, checkParamsGET([]), asyncMiddleware(get)]);
    serveyRoutes.post('/take', [handleToken, checkParamsPOST(["answers", "survey_id"]), asyncMiddleware(take)]);
    serveyRoutes.get('/get_by_username', [handleToken, checkParamsGET(["username"]), asyncMiddleware(getByUsername)]);
    serveyRoutes.delete('/delete', [handleToken, checkParamsGET(["id"]), asyncMiddleware(deleteSurvey)]);
}