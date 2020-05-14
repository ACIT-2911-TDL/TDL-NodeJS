// Import the dependencies for testing
var chai     = require('chai')
var chaiHttp = require('chai-http');
var app      = require('../app.js');

// Configure chai.
chai.use(chaiHttp);
chai.should();

describe("TDL", () => {
    describe("New Task", () => {         
        it("Tests POST new task and receipt of 'errorMessage' from API.", 
             async () => {
             chai.request(app)
                 .post(`/newTask`)
                 .send({
                    "name": "test task",
                    "deadline": "2020-06-20T19:12:00.000Z",
                    "description": "test",
                    "username":"test user"
                })
                 .end((err, res) => {
                     console.log("Showing output.")
                     console.log(JSON.stringify(res.body));
                     let errorMessage = res.body.errorMessage;
                     errorMessage.should.equal('')
                  });
         });
    });
});
