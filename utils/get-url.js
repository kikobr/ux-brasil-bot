module.exports = function getUrl(action){
    return `https://api.telegram.org/bot${botToken}/${action}`;
}
