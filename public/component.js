class Page extends React.Component{
  constructor(){
    super();
    this.state = {
    };
  }
  render(){
    return(
      <div>
        <h1 className="intro">Weather!</h1>
        <List />
      </div>
    );
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
class List extends React.Component{
  render(){
    return(
      <div className="weather-wrapper">
        <Panel />
      </div>
    );
  }
}
class Panel extends React.Component{
  render(){
    return(
      <div>
        <ul className="weather-panel">
          <img className="weather-icon" src="assets/rain.png" />
          <div>Monday</div>
        </ul>
        <ul className="weather-panel">
          <img className="weather-icon" src="assets/sunny.png"/>
          <div>Tueday</div>
        </ul>
      </div>
    );
  }
}
$(function(){
  ReactDOM.render(
    <Page />,
    document.getElementById('page')
  );

});
