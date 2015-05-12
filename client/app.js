var App = React.createClass({
  render: function() {
    var Child;

    // Front end router to change pages on the homepage
    switch (this.props.route) {
      case '#crunch': Child = Crunch; break;
      case '#screensaver': Child = ScreenSaver; break;
      case '#researcher': Child = ResearcherHome; break;
      default: Child = Login;
    }

    return (
      <Child/>
    );
  }
});

// REACT HOMEPAGE
var Login = React.createClass({
  render: function () {
    return (
      <div className="masthead clearfix">
        <div className="inner">
          <h3 className="masthead-brand"></h3>
          <nav>
            <ul className="nav masthead-nav">
              <li><a href='#researcher'>Login as Researcher</a></li>
              <li><a href='#crunch'>Login as Cruncher</a></li>
            </ul>
          </nav>
        </div>

        <div className="inner cover">
          <h1 className="cover-heading">Project Rabbit Hole</h1>
          <p className="lead">We provide a platform for outsourcing your data processing for faster results.</p>
          <p>Quote from our customer: "Why are you called Rabbit Hole..., but thank you so much for doing my data computing for me, now I have time to use my computer for other things!"</p>
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

// Listener to see when "#page" changes
window.addEventListener('hashchange', render);
render();






