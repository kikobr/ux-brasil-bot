const express = require('express')
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
require('dotenv').config();

var botToken = process.env.BOT_TOKEN;

function getUrl(action){
    return `https://api.telegram.org/bot${botToken}/${action}`;
}

app.post(`/${botToken}`, cors(), function(req, res){
    if(req.body && req.body.message){

        if(req.body.message.new_chat_members){

            var data = {};
            data['chat_id'] = req.body.message.chat.id;
            data['text'] = `Bem-vindo `;

            req.body.message.new_chat_members.forEach(function(user, i){
                data['text'] += '@'+user.username;
                if(i != 0) {
                    data['text'] = data['text'].replace('Bem-vindo', 'Bem-vindos');
                    data['text'] += ", ";
                    if(i == req.body.message.new_chat_members.length - 1){
                        data['text'] += " e ";
                    }
                }
            });
            data['text'] += '!';


            request.post({
                url: getUrl('sendPhoto'),
                form: {
                    'chat_id': data['chat_id'],
                    'caption': data['text'],
                    'reply_to_message_id': req.body.message.message_id,
                    'photo': 'https://gdurl.com/8Ps2/'
                }, function(err, res, body){
                    if(err) console.error(err);
                    else console.log(body);
                }
            })

            // request.post({
            //     url: getUrl('sendMessage'),
            //     form: data,
            //     }, function(err, res, body){
            //         if(err) console.error(err);
            //         else console.log(body);
            //     }
            // );
        }
    }
    return res.status(200).send('ok!');
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(5000, () => console.log('Example app listening on port 5000!'));


return;

/*
// added dodo
{
    "ok": true,
    "result": {
        "message_id": 40,
        "from": {
            "id": 591270817,
            "is_bot": true,
            "first_name": "ux-bot",
            "username": "ux_brasil_bot"
        },
        "chat": {
            "id": 99274240,
            "first_name": "Kiko",
            "last_name": "Herrschaft",
            "username": "kikoherrschaft",
            "type": "private"
        },
        "date": 1520998095,
        "text": "Respondendo na maldade!"
    }
}

// removed dodo
{
    "ok": true,
    "result": {
        "message_id": 42,
        "from": {
            "id": 591270817,
            "is_bot": true,
            "first_name": "ux-bot",
            "username": "ux_brasil_bot"
        },
        "chat": {
            "id": 99274240,
            "first_name": "Kiko",
            "last_name": "Herrschaft",
            "username": "kikoherrschaft",
            "type": "private"
        },
        "date": 1520998111,
        "text": "Respondendo na maldade!"
    }
}
*/
