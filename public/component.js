class Page extends React.Component{
  constructor(){
    super();
    this.state = {

    };
  }
  render(){
    return(
      <div className="intro">Hello World!</div>
    );
  }
  componentDidMount(){
    console.log(2);
    //this._spotifyApiCallAuthorize();
  }
  _spotifyApiCallAuthorize(){
    let client_id = "13e2291fbf6f457a802925ffb8e13fa8";
    let client_secret = "0af4182b39ed4e16bee0ddaf61480667";
    let redirect = "localhost:8000";
    let url =
    `https://api.spotify.com/authorize/?client_id=${client_id}&response_type=code&redirect_uri=${redirect}`;
    console.log(url);
    fetch(url)
      .then(response => {
        console.log(response);
      }).then(myJson => {
        console.log(myJson);
      });
  }
  _weatherApiCall(){
    let apiKey = "c033c7d88ddd656c159ed45f9a39923e";
    let city = "London";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(url)
    .then(response => {
      response.json()
      .then( myJson => {
        console.log(myJson.name);
      });
    });
  }
}

$(function(){
  ReactDOM.render(
    <Page />,
    document.getElementById('page')
  );

});
