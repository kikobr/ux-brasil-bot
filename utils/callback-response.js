module.exports = function(event, context, callback, obj){
    var status = 200,
        body = "Ok";

    if(event) body = event.body ? event.body : body;
    if(obj){
        status = obj.status ? obj.status : status;
        body = obj.body ? obj.body : body;
    }

    var response = {
        statusCode: status,
        body: body
    };
    console.log("response: " + JSON.stringify(response))
    callback(null, response);
}
