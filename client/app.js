var App = React.createClass({
  render: function() {
    var Child;
    switch (this.props.route) {
      case '#crunch': Child = Crunch; break;
      case '#screensaver': Child = ScreenSaver; break;
      default: Child = Login;
    }

    return (
      <div>
        <h1>App</h1>
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
          <li><a href='#'>Login as Researcher</a></li>
          <li><a href='#crunch'>Login as Cruncher</a></li>
        </ul>
      </nav>
    );
  }
});

var Crunch = React.createClass({
  render: function() {
    return (
      <li><a href='#screensaver'>Crunch!</a></li>
    );
  }
});

var ScreenSaver = React.createClass({
  render: function() {
    return (
      <div>ScreenSaver!</div>
    );
  }
});

function render() {
  var route = window.location.hash;
  React.render(<App route={route} />, document.getElementById('main-content'));
}

window.addEventListener('hashchange', render);
render();


