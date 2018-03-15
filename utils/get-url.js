require('dotenv').config();
var botToken = process.env.BOT_TOKEN;

module.exports = function getUrl(action){
    return `https://api.telegram.org/bot${botToken}/${action}`;
}
