class Page extends React.Component{
  render(){
    return(
      <div className="intro">Hello World!</div>
    );
  }
}

jQuery(function(){
  ReactDOM.render(
    <Page />,
    document.getElementById('page')
  );

});
