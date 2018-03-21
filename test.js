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
describe("Request for forecast to Open Weather API",function(){
  let apiKey = "c033c7d88ddd656c159ed45f9a39923e";
  let city = "London";
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  it("Returns a 200 status code",function(done){
    request(url)
    .get('/')
    .expect(200,done);
  });
});
