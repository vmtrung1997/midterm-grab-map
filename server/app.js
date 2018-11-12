var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');
    
var app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());


var requestCtrl = require('./public/apiControllers/requestController');
const RequestGrab = require('./public/models/requestGrab');
var loadRequest = require('./public/fn/db-request')

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection", function(socket){
    console.log("Co nguoi ket noi "+socket.id);

    socket.on("disconnect", function(){
        console.log(socket.id + " ngat ket noi");
    });

    socket.on("client-send-data", function(data, fn){
        try {
            let i_request = new RequestGrab({
                name: data.name,
                phone: data.phone,
                address: data.address,
                note: data.note,
                date: new Date(),
                idDriver: "",
                state: "not_locate"
            })
            i_request.save((err,result) => {
                if (err) return console.log(err);
                console.log(result.name + " add to db");
                loadRequest.getRequests().then(result => {
                    io.sockets.in("request-information").emit("return request", result);
                    fn(true);
                })
                
            })
        } catch (err) {
            console.log(err);
        }
    
    });

    socket.on("location-identify-enroll", function(data, fn){
        socket.join("location-identifier");

        fn(true);
    });

    socket.on("get requests", function(data, fn){
        socket.join("request-information");
        loadRequest.getRequests()
        .then(result => {
            console.log(result);
            socket.emit("return request",result);
        });
    });
})
app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
    })
});


app.use('/api/request/', requestCtrl);
