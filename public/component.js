class Page extends React.Component{
  constructor(){
    super();
    this._handleCode = this._handleCode.bind(this);
    this.state ={city: "Rosemead", errMsg: ""};
  }
  render(){
    return(
      <div>
        <h1 className="intro">Weather of {this.state.city}!</h1>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <h2>{this.state.errMsg}</h2>
        <div className = "form-box">
          <div>Pick a new city here!</div>
            <input placeholder="City Name" ref={city => this._city = city}/>
        </div>
        </form>
        <List
          city={this.state.city}
          codeChange={this._handleCode.bind(this)}/>
        <img className="screen" src="assets/back.png" />
      </div>
    );
  }
  /**
  * handles submit event (changing cities)
  * @param {SyntheticEvent} event
  */
  _handleSubmit(event){
    event.preventDefault();
    this.setState({city: this._city.value});
  }
  /**
  * This is passed to the child List component that will update
  * an error message if a 404 is returned because the user tried
  * to fetch the weather forecast of a non-existant city
  * @param {String} cod This is the status code of the API fetch
  */
  _handleCode(cod){
    if(cod == "404"){this.setState({errMsg: "Thats not a real place, LOL"});}
    else{this.setState({errMsg: ""});}
  }
}
class List extends React.Component{
  constructor(){
    super();
    this.state = {panels:[]};
  }
  render(){
    const panels = this._getPanel();
    return(
      <div className="weather-wrapper">
        {panels}
      </div>
    );
  }
  /**
  * This makes the initial forecast based on the default city.
  * componentDidMount is a React Lifecycle method that gets called once
  * the component is mounted.
  */
  componentDidMount(){
    this._weatherApiCall(this.props.city);
  }
  /**
  * This makes a forecast when the city value of the parent changes.
  * componentWillReceiveProps is a React Lifecycle method that gets called
  * when a props has changed. Note that if the if statement that compares
  * props is not called within
  * this Lifecycle method, it will cause a bubbling event where it will continuously
  * fetch the weather. (Memory Leak issue)
  * @param {Object} nextProps This is the new changed props.
  */
  componentWillReceiveProps(nextProps){
    if(this.props.city !== nextProps.city){
      this._weatherApiCall(nextProps.city);
    }
  }
  /**
  * This maps out array of React child object and passes props down
  * Each panel represents a particular day with thier weather forecast
  */
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
  /**
  * This is is the function that fetches the weather forecast
  * and basically builds each panel (or at least the data of the panel)
  * @param {String} name This is the name of the city being fetched from OpenWeatherMap
  */
  _weatherApiCall(name){
    let apiKey = "c033c7d88ddd656c159ed45f9a39923e";
    let city = name || "Rosemead";
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(url)
    .then(response => {
      response.json()
      .then( myJson => {
        this.props.codeChange(myJson.cod);
        if(myJson.cod == 404){
          return;
        }
        else{
          this.state.panels.length = 0;
          for(var i = 4; i < myJson.list.length; i +=8){
            let weather = {};
            let jsonData = myJson.list[i];
            weather.temp = jsonData.main.temp;
            weather.humid = jsonData.main.humidity;
            weather.id = this.state.panels.length+1;
            weather.weather = jsonData.weather[0].main;
            var day = new Date(jsonData.dt*1000).getDay();
            switch(day){
              case 0:weather.day = "Sunday";break;
              case 1:weather.day = "Monday";break;
              case 2:weather.day = "Tuesday";break;
              case 3:weather.day = "Wednesday";break;
              case 4:weather.day = "Thursday";break;
              case 5:weather.day = "Friday";break;
              case 6:weather.day = "Saturday";break;
              default:return;
            }
            this.setState({panels: this.state.panels.concat([weather])});
        }
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
              <div>{this.props.temp} &#176; F</div>
              <div>Humidity: {this.props.humid}%</div>
            </div>
        </ul>
    );
  }
  /**
  * This will pass an appropriate image icon based on the Weather
  */
  _weather(){
    switch (this.props.weather){
      case "Clear":
      case "Sunny":
        return (<img className="weather-icon" src="assets/sunny.png"/>);break;
      case "Rain":
        return (<img className="weather-icon" src="assets/rain.png"/>);break;
      case "Clouds":
        return (<img className="weather-icon" src="assets/cloudy.png"/>);break;
      default:return;
    }
  }
}

ReactDOM.render(<Page />,document.getElementById('page'));
