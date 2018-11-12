var socket = io("http://localhost:3000");

var app = new Vue({
    el: '#app3',
    data: {
        name: '',
        isLogin: true,
        requests: []
    },
    methods: {
        getRequest: function () {
            var self = this;
            socket.emit("get requests", function (confirmation) {
                console.log(confirmation);
            });
        }
    },
    beforeMount(){
        this.getRequest();
    },
    mounted(){
        var self = this;
        socket.on("return request", function(data){
            if (data){
                
                self.requests = data;
                console.log(self.requests);
            }
        });
    }
})
