var socket = io("http://localhost:3000");

var app = new Vue({
    el: '#app1',
    data: {
        name: '',
        isLogin: true
    },
    methods: {
        sub: function () {
            var self = this;
            socket.emit("location-identify-enroll",{
                name: self.name,
            }, function (confirmation) {
                if (confirmation == true){
                    self.isLogin = false;
                }
            });
            
        }
    }
})
