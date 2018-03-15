'use strict';

const requestPromise = require('request-promise');
const callbackResponse = require('./utils/callback-response');

require('dotenv').config();

var botToken = process.env.BOT_TOKEN;

exports.handler = function(event, context, callback) {

    if(event.httpMethod == "POST"){

        var body = JSON.parse(event.body);

        if(body && body.message && body.message.new_chat_members){

            /**
            * New member
            **/
            return require('./actions/new-member')(event, context, callback);

        } else callbackResponse(event, context, callback);
    }
    else callbackResponse(event, context, callback);
};
