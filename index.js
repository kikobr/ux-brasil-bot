'use strict';

// const request = require('request');
const requestPromise = require('request-promise');
const bodyParser = require('body-parser');
require('dotenv').config();

var botToken = process.env.BOT_TOKEN;

function getUrl(action){
    return `https://api.telegram.org/bot${botToken}/${action}`;
}

exports.handler = function(event, context, callback) {

    var responseBody = {
        message: "Ok",
        // input: event
    };

    if(event.httpMethod == "POST"){

        var body = JSON.parse(event.body);

        if(body && body.message){

            if(body.message.new_chat_members){

                var data = {};
                data['chat_id'] = body.message.chat.id;
                data['text'] = `Bem-vindo `;

                body.message.new_chat_members.forEach(function(user, i){
                    data['text'] += (user.username ? `@${user.username}` : user.first_name);
                    if(i != 0) {
                        data['text'] = data['text'].replace('Bem-vindo', 'Bem-vindos');
                        data['text'] += ", ";
                        if(i == body.message.new_chat_members.length - 1){
                            data['text'] += " e ";
                        }
                    }
                });
                data['text'] += '!';

                return requestPromise({
                    method: "POST",
                    uri: getUrl('sendPhoto'),
                    form: {
                        'chat_id': data['chat_id'],
                        'caption': data['text'],
                        'reply_to_message_id': body.message.message_id,
                        'photo': 'https://gdurl.com/8Ps2/'
                    }
                }).then(function(body){
                    console.log(body);
                    var response = {
                        statusCode: 200,
                        body: "Ma oeeee" + JSON.stringify(responseBody)
                    };
                    console.log("response: " + JSON.stringify(response))
                    callback(null, response);
                }).catch(function(err){
                    console.error(err);
                    var response = {
                        statusCode: 200,
                        body: err
                    };
                    callback(null, response);
                });

                // request.post({
                //     url: getUrl('sendPhoto'),
                //     form: {
                //         'chat_id': data['chat_id'],
                //         'caption': data['text'],
                //         'reply_to_message_id': body.message.message_id,
                //         'photo': 'https://gdurl.com/8Ps2/'
                //     }, function(err, res, body){
                //         if(err) console.error(err);
                //         else console.log(body);
                //
                //         var response = {
                //             statusCode: 200,
                //             body: JSON.stringify(responseBody)
                //         };
                //         console.log("response: " + JSON.stringify(response))
                //         callback(null, response);
                //     }
                // })

            } else {
                var response = {
                    statusCode: 200,
                    body: JSON.stringify(responseBody)
                };
                console.log("response: " + JSON.stringify(response))
                callback(null, response);
            }
        }
    } else {
        var response = {
            statusCode: 200,
            body: JSON.stringify(responseBody)
        };
        console.log("response: " + JSON.stringify(response))
        callback(null, response);
    }
};
