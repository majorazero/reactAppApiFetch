let request = require("supertest");
let app = require("./app");


//mocha code
describe("Requests to the root path",function(){
  it("Returns a 200 status code",function(done){
    request(app)
      .get("/")
      .expect(200,done);
  });
  it("Returns html element",function(done){
    request(app)
    .get("/")
    .expect("Content-type",/html/,done);
  });
});
