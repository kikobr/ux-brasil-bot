'use strict';

const requestPromise = require('request-promise');
const callbackResponse = require('../utils/callback-response');
const getUrl = require('../utils/get-url');

require('dotenv').config();

var botToken = process.env.BOT_TOKEN;

function getRandom (array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = function(event, context, callback){
    var body = JSON.parse(event.body);

    var chatId = body.message.chat.id;
    var messageId = body.message.message_id;
    var user = body.message.new_chat_members[0];
    var userName = user.username ? `@${user.username}` : user.first_name;
    var photo = "https://gdurl.com/8Ps2/";

    if(!userName) userName = '';

    var greetings = [
        `Oi #{userName}, tudo bem?`,
        `Outro designer incrível entrando no grupo! Bem-vindo(a) #{userName}`,
        `E nós achando que o grupo não poderia ficar melhor. Chega mais, #{userName}!`,
        `O grupo não pára de crescer! Bem-vindo(a) #{userName}! :D`,
        `E aí #{userName}, tudo bom? Você encontrou o grupo certo!`,
        `Fala #{userName}, como você está?`,
        `Seja muito bem-vindo(a) #{userName}!`,
        `Finalmente você chegou, #{userName}! Agora o grupo está completo :)`,
        `Olha essa fera que acabou de chegar aí meu! Bem-vindo(a) #{userName} :D`,
        `Pessoal, olha quem chegou! Seja bem-vindo(a) #{userName}`,
        `Estávamos esperando por você, #{userName}! Bem-vindo(a)!`,
        `Outro designer fera no grupo! Bem-vindo(a) #{userName}!`,
        `Agora que #{userName} entrou o grupo vai voar! Seja bem-vindo(a) :)`,
    ]

    var introductions = [
        `Apresente-se pra gente`,
        `Diz aí com o que você trabalha, o que gosta de estudar`,
        `Fala um pouco sobre você`,
        `Explica pra gente qual sua relação com UX Design hoje`,
        `Nos fala um pouco sobre a sua experiência`,
        `Conta um pouco mais sobre você pra gente`,
        `Diz pra gente o que você mais gosta em UX Design`,
    ];

    var challenges = [
        `quando tiver tempo participa desse nosso ritualzinho de iniciação (ou não, desculpa aí)`,
        `participe desse nosso desafio de entrada, é bem divertido!`,
        `bora participar do nosso desafio de entrada (eu sei que você curte WordArt)!`,
        `estamos no aguardo do WordArt que você vai inventar pro desafio!`,
        `quero ver o que você vai criar pro nosso desafio de iniciação.`,
        `estamos esperando sua contribuição pro nosso desafio de entrada!`,
        `não esqueça de participar do nosso ritual de entrada fazendo seu WordArt`,
    ];

    var greeting = getRandom(greetings).replace('#{userName}', userName);
    var introduction = getRandom(introductions);
    var challenge = getRandom(challenges);

    var text = `${greeting}\n\n${introduction} e ${challenge}`;

    return requestPromise({
        method: "POST",
        uri: getUrl('sendPhoto'),
        form: {
            'chat_id': chatId,
            'caption': text,
            'reply_to_message_id': messageId,
            'photo': photo,
        }
    }).then(function(body){
        console.log("new-member action complete.");
        callbackResponse(event, context, callback, { body: body });
    }).catch(function(err){
        console.error("new-member action error", err);
        callbackResponse(event, context, callback, { body: err });
    });
}
