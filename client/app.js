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
  loadTaskFromServer: function() {
    console.log('in loadTaskFromServer');
    $.ajax({
      url: '/api/crunch',
      method: 'GET',
      dataType: 'json',
      success: function(task) {
        // console.log(task.result);
        // var alg = task.result.alg;
        // var data = task.result.data;
        // window.location.hash = '#screensaver';
        // var result = eval(alg)(data);
        // console.log('result:', result);
        // window.location.hash = '#crunch';

        // this.setState({task: data.result});

        /* 

        Using Web Workers
        - Client: Crunch component makes GET request to signal server 
        - Server: Server writes new task to file 'worker.js' (see example file)
          - Updates algorithm (if needed) and data
          - Send back task ID
        - Client: On success, 
            var worker = new Worker('worker.js'); (which does get request for worker.js)
            worker.onmessage = function(e) {
              var result = e.data;
              // post results to server
            };
        - Server: receive POST and write results to whatever is storing results
        
        */


      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/crunch', status, err.toString());
      }.bind(this)
    });


    
  },
  render: function() {
    return (
      <button onClick={this.loadTaskFromServer}>Crunch!</button>
      // <li><a href='#screensaver'>Crunch!</a></li>
    );
  }
});

var ScreenSaver = React.createClass({
  render: function() {
    return (
      <iframe width={window.innerWidth} height={window.innerHeight} src='./screensaver/sprites.html'></iframe>
    );
  }
});




function render() {
  var route = window.location.hash;
  React.render(<App route={route} />, document.getElementById('main-content'));
}

window.addEventListener('hashchange', render);
render();






