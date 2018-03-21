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
