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
  loadTaskFromServer: function(repeat) {
    console.log('in loadTaskFromServer');
    $.ajax({
      url: '/api/crunch',
      method: 'GET',
      dataType: 'json',
      success: function(task) {
        var context = this;

        // check to see if web workers are supported by the browser
        if (!!window.Worker) {
          // save the stringified algorithm retrieved from the server
          var alg = task.result.alg;
          // save the data set retrieved from the server 
          var data = task.result.data;

          // initialize new web worker
          var myWorker = new Worker('worker.js');

          // send the algorithm and data to the webworker
          myWorker.postMessage([alg, data]);

          // change to screensaver page once web worker gets data
          window.location.hash = '#screensaver';

          myWorker.onmessage = function (e) {
            console.log('Web worker donezo: ', e.data);

            // add ajax post request call here
            console.log(context);
            context.sendResultToServer();
            // terminate webworker on completion of its job
            myWorker.terminate();

            // check to see if we want to repeat get request forever
            if (repeat) {
              context.loadTaskFromServer(true);
            } else {
              // switch back to crunch page on completion of web worker
              window.location.hash = '#crunch';
            }
          };
          
        }

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

  sendResultToServer: function (result) {
    $.ajax({
      url: '/api/crunch',
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(result),
      success: function(res) {
        console.log('Result POSTed to server: ', res);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/crunch', status, err.toString());
      }.bind(this)
    });
  },


  render: function() {
    return (
      <div>
        <button onClick={this.loadTaskFromServer.bind(this, false)}>Crunch Once</button>
        <button onClick={this.loadTaskFromServer.bind(this, true)}>Crunch Forever</button>
      </div>
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






