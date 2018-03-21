class Page extends React.Component{
  constructor(){
    super();
    this.state = {
      weatherData: []
    };
  }
  componentDidMount(){
    this._weatherApiCall();
  }
  render(){
    return(
      <div>
        <h1 className="intro">Weather of... !</h1>
        <div>Pick a new city here!</div>
        <form>
          <input placeholder="City Name" />
        </form>
        <List />
      </div>
    );
  }
  _weatherApiCall(){
    let apiKey = "c033c7d88ddd656c159ed45f9a39923e";
    let city = "Rosemead";
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(url)
    .then(response => {
      response.json()
      .then( myJson => {
        console.log(myJson);
        let weather = {};
        for(var i = 4; i < myJson.list.length; i +=8){
          let jsonData = myJson.list[i];
          console.log(jsonData);
          console.log(i);
          weather.temp = jsonData.main.temp;
          weather.humid = jsonData.main.humidity;
          weather.id = this.state.weatherData.length+1;s
          weather.weather = jsonData.weather[0].main;
          this.setState({weatherData: this.state.weatherData.concat([weather])});
          console.log(this.state.weatherData);
        }
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
              weather: "cloudy"},
              {day:"Tuesday",
              temp: 35,
              humid: 95,
              id: 2,
              weather: "rain"}]
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
        <ul className="weather-panel">
          {this._weather()}
          <div className="weather-day">{this.props.day}</div>
            <div className="weather-temp">
              <div>{this.props.temp} &#8451;</div>
              <div>Humidity: {this.props.humid}%</div>
            </div>
        </ul>
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
