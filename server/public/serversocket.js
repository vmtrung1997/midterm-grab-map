
var io = require("socket.io");

module.exports.listen = function(app) {
    io.socket.listen(app);
    io.on("connection", function(socket){
        console.log("Co nguoi ket noi "+socket.id);
        socket.on("disconnect", function(){
            console.log(socket.id + " ngat ket noi");
        });
    
        socket.on("location-identify-enroll", function(data, fn){
            console.log(socket.id + " identifier name: " + data.name);
            var temp = requestCtrl.get('/request');
            console.log(temp);
            fn(true);
        });
    })
}



