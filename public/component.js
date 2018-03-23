class Page extends React.Component{
  constructor(){
    super();
    this.state ={
      city: "Rosemead"
    };
  }
  render(){
    return(
      <div>
        <h1 className="intro">Weather of... {this.state.city}!</h1>
        <div>Pick a new city here!</div>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <input placeholder="City Name" ref={city => this._city = city}/>
        </form>
        <List city={this.state.city}/>
      </div>
    );
  }
  _handleSubmit(event){
    event.preventDefault();
    this.setState({city: this._city.value});
  }
}
class List extends React.Component{
  constructor(){
    super();
    this.state = {
      panels:[]
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
  componentDidMount(){
    this._weatherApiCall(this.props.city);
  }
  componentWillReceiveProps(nextProps){
    this.state.panels.length = 0;
    this._weatherApiCall(nextProps.city);
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
  _weatherApiCall(name){
    let apiKey = "c033c7d88ddd656c159ed45f9a39923e";
    let city = name || "Rosemead";
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(url)
    .then(response => {
      response.json()
      .then( myJson => {
        for(var i = 4; i < myJson.list.length; i +=8){
          let weather = {};
          let jsonData = myJson.list[i];
          weather.temp = jsonData.main.temp;
          weather.humid = jsonData.main.humidity;
          weather.id = this.state.panels.length+1;
          weather.weather = jsonData.weather[0].main;

          var day = new Date(jsonData.dt*1000);
          day = day.getDay();
          switch(day){
            case 0:
              weather.day = "Sunday";
              break;
            case 1:
              weather.day = "Monday";
              break;
            case 2:
              weather.day = "Tuesday";
              break;
            case 3:
              weather.day = "Wednesday";
              break;
            case 4:
              weather.day = "Thursday";
              break;
            case 5:
              weather.day = "Friday";
              break;
            case 6:
              weather.day = "Saturday";
              break;
            default:
              return;
          }
          this.setState({panels: this.state.panels.concat([weather])});
        }
      });
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
      case "Clear":
      case "Sunny":
        return (<img className="weather-icon" src="assets/sunny.png"/>);
        break;
      case "Rain":
        return (<img className="weather-icon" src="assets/rain.png"/>);
        break;
      case "Clouds":
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
