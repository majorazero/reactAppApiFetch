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
  constructor(){
    super();
    this.state = {
      panels:[{day:"Monday",
              temp: 65,
              humid: 35,
              id: 1,
              weather: "cloudy"}]
    };
  }
  render(){
    const panels = this._getPanel();
    return(
      <div className="weather-wrapper">
        {panels}
      </div>
    );
  }
  _getPanel(){
    return this.state.panels.map((panel) => {
      return <Panel
              key={panel.id}
              id={panel.id}
              day={panel.day}
              temp={panel.temp}
              humid={panel.humid}
              weather={panel.weather}/>
    });
  }
}
class Panel extends React.Component{
  render(){
    return(
      <div>
        <ul className="weather-panel">
          <img className="weather-icon" src="assets/rain.png" />
          <div className="weather-day">Monday</div>
          <div className="weather-temp">
            <div>56 &#8451;</div>
            <div>Humidity: 34%</div>
          </div>
        </ul>
        <ul className="weather-panel">
          {this._weather()}
          <div className="weather-day">{this.props.day}</div>
            <div className="weather-temp">
              <div>{this.props.temp} &#8451;</div>
              <div>Humidity: {this.props.humid}%</div>
            </div>
        </ul>
      </div>
    );
  }
  _weather(){
    switch (this.props.weather){
      case "sunny":
        return (<img className="weather-icon" src="assets/sunny.png"/>);
        break;
      case "rain":
        return (<img className="weather-icon" src="assets/rain.png"/>);
        break;
      case "cloudy":
        return (<img className="weather-icon" src="assets/cloudy.png"/>);
        break;
      default:
        return;
    }
  }
}
$(function(){
  ReactDOM.render(
    <Page />,
    document.getElementById('page')
  );

});
