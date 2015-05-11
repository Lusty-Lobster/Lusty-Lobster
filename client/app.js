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
      // <div className="">
      //   <h1>Rabbit Hole</h1>
        <Child/>
      // </div>
    );
  }
});


var Login = React.createClass({
  render: function () {
    return (
      <div className="masthead clearfix">
        <div className="inner">
          <h3 className="masthead-brand">Project Rabbit Hole</h3>
          <nav>
            <ul className="nav masthead-nav">
              <li><a href='#researcher'>Login as Researcher</a></li>
              <li><a href='#crunch'>Login as Cruncher</a></li>
            </ul>
          </nav>
        </div>

        <div className="inner cover">
          <h1 className="cover-heading">Project Rabbit Hole</h1>
          <p className="lead">Insert Rabbit Hole Stuff</p>
        </div>

        <div className="mastfoot">
          <div className="inner">
            <p>Project Rabbit Hole brought to you by Lusty Lobster</p>
          </div>
        </div>
      </div>
    );
  }
});


function render() {
  var route = window.location.hash;
  React.render(<App route={route} />, document.getElementById('main-content'));
}

window.addEventListener('hashchange', render);
render();






