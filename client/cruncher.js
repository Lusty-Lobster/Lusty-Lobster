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
            context.sendResultToServer({
              task: task.result.task,
              index: task.result.index,
              result: e.data
            });
            // terminate webworker on completion of its job
            myWorker.terminate();

            // check to see if we want to repeat get request forever
            if (repeat) {
              if (task.result.task === -1) {
                setTimeout(function () {context.loadTaskFromServer(true)}, 5000);
              } else {
                context.loadTaskFromServer(true);
              }
            } else {
              // switch back to crunch page on completion of web worker
              window.location.hash = '#crunch';
            }
          };
          
        }

      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/crunch', status, err.toString());
      }.bind(this)
    });    
  },

  // Post results retreived from webworker to the server
  sendResultToServer: function (result) {
    console.log('posting: ' + result);
    $.post( '/api/crunch', result )
    .done(function() {
      console.log( "success" );
    })
    .fail(function() {
      console.log( "error" );
    });
  },


  render: function() {
    return (
      <div>
        <a href='#'><button className ="btn btn-lg btn-default">Home</button></a>
        <button className ="btn btn-lg btn-default" onClick={this.loadTaskFromServer.bind(this, false)}>Crunch Once</button>
        <button className ="btn btn-lg btn-default" onClick={this.loadTaskFromServer.bind(this, true)}>Crunch Forever</button>
      </div>
    );
  }
});

// Screensaver page
var ScreenSaver = React.createClass({
  render: function() {
    return (
      <div>
        <a href='/#crunch'><button className="btn btn-lg btn-default">Cruncher Home</button></a>
        <iframe src='./screensaver/sprites.html'></iframe>
      </div>
    );
  }
});
