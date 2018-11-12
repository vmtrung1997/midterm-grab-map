var socket = io("http://localhost:3000");

var app = new Vue({
    el: '#app1',
    data: {
        name: '',
        phone: '',
        address: '',
        note: '',
        submiting: false,
        submited: false
    },
    methods: {
        sub: function () {
            var self = this;
            self.submiting = true;
            socket.emit("client-send-data",{
                name: self.name,
                phone: self.phone,
                address: self.address,
                note: self.note
            }, function (confirmation) {
                console.log(confirmation);
                if (confirmation){
                    self.submiting = false;
                    self.submited = true
                }
            });
            // axios.post('http://localhost:3000/api/request/create_request', {
            //     name: self.name,
            //     phone: self.phone,
            //     address: self.address,
            //     note: self.note
            // })
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }
    }
})
