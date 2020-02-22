const imageThumbnail = require('image-thumbnail');
const { SUCCESS, ERROR } = require("../../utils/helper");
const fs = require('fs');
const request = require('request').defaults({ encoding: null })
const path = require('path')

module.exports.thumbnail = async function(req, res) {
    try {
        const options = { width: 50, height: 50, responseType: 'base64' }
        const ext = req.query.url.split(".")[req.query.url.split(".").length-1]
        const filename = (new Date()/1000).toString() + "." + ext
        const serverUrl = req.protocol + '://' + req.get('host');

        request.get(req.query.url, async(error, response, body) => {
            if (!error && response.statusCode == 200) {
                data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                try{
                    const thumbnail = await imageThumbnail(new Buffer(body).toString('base64'), options);
                    fs.writeFile("media/"+filename, thumbnail, 'base64', function(err) {
                        console.log(err);
                        if(err)
                            return ERROR(res, err.message, 500);
                      });
                    return SUCCESS(res, { link: path.join(serverUrl, 'media' ,filename)  });
                }
                catch(err) {
                    console.error(err);
                    return ERROR(res, err.message, 500);
                }
            }
            else{
                return ERROR(res, error.message, 500);

            }
        });
    } catch (err) {
        console.error(err);
        return ERROR(res, err.message, 500);
    }
};
