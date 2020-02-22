module.exports = function(imageRoutes) {
    const { thumbnail } = require('../controllers/image')
    const { handleToken, asyncMiddleware, checkParamsPOST, checkParamsGET } = require('../../utils/middleware')

    imageRoutes.get('/thumbnail', [checkParamsGET(["url"]) ,asyncMiddleware(thumbnail)]);
}