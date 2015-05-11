var App = React.createClass({
  render: function() {
    var Child;
    switch (this.props.route) {
      case '#crunch': Child = Crunch; break;
      case '#screensaver': Child = ScreenSaver; break;
      case '#researcher': Child = ResearcherHome; break;
      default: Child = Login;
    }

    return (
      <div>
        <h1>Rabbit Hole</h1>
        <Child/>
      </div>
    );
  }
});


var Login = React.createClass({
  render: function () {
    return (
      <nav>
        <ul>
          <li><a href='#researcher'>Login as Researcher</a></li>
          <li><a href='#crunch'>Login as Cruncher</a></li>
        </ul>
      </nav>
    );
  }
});


function render() {
  var route = window.location.hash;
  React.render(<App route={route} />, document.getElementById('main-content'));
}

window.addEventListener('hashchange', render);
render();






